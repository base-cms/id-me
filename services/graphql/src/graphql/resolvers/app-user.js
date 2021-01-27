const { applicationService, exportService, localeService } = require('@identity-x/service-clients');
const { UserInputError } = require('apollo-server-express');
const newrelic = require('../../newrelic');
const connectionProjection = require('../utils/connection-projection');
const typeProjection = require('../utils/type-projection');

const { isArray } = Array;

module.exports = {
  AppContext: {
    application: (_, __, { app }) => applicationService.request('findById', { id: app.getId() }),
  },

  AppUser: {
    id: user => user._id,
    accessLevels: ({ accessLevelIds }) => {
      if (!isArray(accessLevelIds) || !accessLevelIds.length) return [];
      const query = { _id: { $in: accessLevelIds } };
      return applicationService.request('access-level.find', { query });
    },
    teams: ({ teamIds }) => {
      if (!isArray(teamIds) || !teamIds.length) return [];
      const query = { _id: { $in: teamIds } };
      return applicationService.request('team.find', { query });
    },
    country: ({ countryCode }) => {
      if (!countryCode) return null;
      return localeService.request('country.asObject', { code: countryCode });
    },
    region: ({ countryCode, regionCode }) => {
      if (!countryCode || !regionCode) return null;
      return localeService.request('region.asObject', { countryCode, regionCode });
    },
    name: ({ givenName, familyName }) => [givenName, familyName].filter(v => v).join(' '),

    regionalConsentAnswers: ({ regionalConsentAnswers }, _, { app }) => {
      const { regionalConsentPolicies } = app.org;
      const policyIds = regionalConsentPolicies.map(policy => policy._id);
      return regionalConsentAnswers.filter(answer => policyIds.includes(answer._id));
    },

    customSelectFieldAnswers: ({ customSelectFieldAnswers }, { input }, { app }) => {
      const {
        fieldIds,
        onlyAnswered,
        onlyActive,
        sort,
      } = input;
      return applicationService.request('field.userSelectAnswers', {
        applicationId: app.getId(),
        fieldIds,
        customSelectFieldAnswers,
        onlyAnswered,
        onlyActive,
        sort,
      });
    },
  },

  AppUserRegionalConsentAnswer: {
    id: answer => answer._id,
    policy: (answer, _, { app }) => {
      const { regionalConsentPolicies } = app.org;
      return regionalConsentPolicies.find(policy => policy._id === answer._id);
    },
  },

  Query: {
    /**
     *
     */
    activeAppContext: async (_, args, { user, app, req }) => {
      const applicationId = app.getId();
      const email = user.get('email');
      const { ip: ipAddress } = req;
      if (user.hasValidUser('AppUser') && applicationId !== user.getAppId()) {
        throw new UserInputError('The provided application context does not match the app for the user.');
      }
      const context = await applicationService.request('loadContext', { applicationId, email, ipAddress });
      // set last seen (do not await)
      if (context.user) applicationService.request('user.setLastSeen', { id: context.user._id });
      return context;
    },

    checkContentAccess: async (_, { input }, { user, app, req }) => {
      const applicationId = app.getId();
      const email = user.get('email');
      const { ip: ipAddress } = req;
      const { isEnabled, requiredAccessLevelIds } = input;
      if (user.hasValidUser('AppUser') && applicationId !== user.getAppId()) {
        throw new UserInputError('The provided application context does not match the app for the user.');
      }
      return applicationService.request('checkAccess', {
        applicationId,
        email,
        ipAddress,
        isEnabled,
        requiredAccessLevelIds,
      });
    },

    appUsers: (_, { input }, { app }, info) => {
      const id = app.getId();
      const { sort, pagination } = input;
      const fields = connectionProjection(info);
      return applicationService.request('user.listForApp', {
        id,
        sort,
        pagination,
        fields,
      });
    },
    /**
     *
     */
    activeAppUser: async (_, args, { user }) => {
      const email = user.get('email');
      const applicationId = user.getAppId();
      const userDoc = await applicationService.request('user.findByEmail', {
        applicationId,
        email,
      });
      applicationService.request('user.setLastSeen', { id: userDoc._id });
      return userDoc;
    },

    /**
     * @todo This should be secured, otherwise anyone could guess by email
     */
    appUser: (_, { input }, { app }, info) => {
      const applicationId = app.getId();
      const { email } = input;
      const fields = typeProjection(info);
      return applicationService.request('user.findByEmail', {
        applicationId,
        email,
        fields,
      });
    },
    matchAppUsers: (_, { input }, { app }, info) => {
      const applicationId = app.getId();

      const fields = connectionProjection(info);
      const {
        field,
        phrase,
        position,
        pagination,
        sort,
        excludeIds,
      } = input;

      return applicationService.request('user.matchForApp', {
        applicationId,
        field,
        phrase,
        position,
        fields,
        pagination,
        sort,
        excludeIds,
      });
    },
  },

  Mutation: {
    /**
     *
     */
    createAppUser: (_, { input }, { app }) => {
      const applicationId = app.getId();
      const {
        email,
        givenName,
        familyName,
        organization,
        organizationTitle,
        countryCode,
        regionCode,
        postalCode,
      } = input;
      const payload = {
        givenName,
        familyName,
        organization,
        organizationTitle,
        countryCode,
        regionCode,
        postalCode,
      };
      return applicationService.request('user.create', {
        applicationId,
        email,
        payload,
      });
    },

    /**
     *
     */
    exportAppUsers: (_, __, { app, user }) => {
      const applicationId = app.getId();
      const email = user.get('email');
      exportService.request('user.exportForApp', { applicationId, email })
        .catch(newrelic.noticeError.bind(newrelic));
      return 'ok';
    },

    manageCreateAppUser: (_, { input }, { app }) => {
      const applicationId = app.getId();
      const {
        email,
        givenName,
        familyName,
        accessLevelIds,
        teamIds,
        organization,
        organizationTitle,
        countryCode,
        regionCode,
        postalCode,
      } = input;
      const payload = {
        email,
        givenName,
        familyName,
        accessLevelIds,
        teamIds,
        organization,
        organizationTitle,
        countryCode,
        regionCode,
        postalCode,
      };
      return applicationService.request('user.manageCreate', {
        applicationId,
        payload,
      });
    },

    /**
     *
     */
    loginAppUser: (_, { input }, { req, app }) => {
      const applicationId = app.getId();
      const { token } = input;
      const ua = req.get('user-agent');
      return applicationService.request('user.login', {
        applicationId,
        token,
        ip: req.ip,
        ua,
      });
    },

    /**
     *
     */
    logoutAppUser: (_, { input }, { app }) => {
      const applicationId = app.getId();
      const { token } = input;
      return applicationService.request('user.logout', {
        applicationId,
        token,
      });
    },

    /**
     *
     */
    sendAppUserLoginLink: (_, { input }, { app }) => {
      const applicationId = app.getId();
      const {
        email,
        authUrl,
        redirectTo,
        appContextId,
      } = input;
      return applicationService.request('user.sendLoginLink', {
        applicationId,
        appContextId,
        authUrl,
        redirectTo,
        email,
      });
    },

    /**
     *
     */
    setAppUserBanned: (_, { input }, { app }) => {
      const applicationId = app.getId();
      const { id, value } = input;
      return applicationService.request('user.updateFieldWithApp', {
        applicationId,
        id,
        path: 'banned',
        value,
      });
    },

    /**
     *
     */
    setAppUserRegionalConsent: (_, { input }, { user }) => {
      const id = user.getId();
      const { answers } = input;
      return applicationService.request('user.regionalConsentAnswer.setMany', { id, answers });
    },

    /**
     *
     */
    updateAppUser: (_, { input }, { app }) => {
      const applicationId = app.getId();
      const { id, payload } = input;
      const {
        email,
        givenName,
        familyName,
        accessLevelIds,
        teamIds,
        organization,
        organizationTitle,
        countryCode,
        regionCode,
        postalCode,
      } = payload;

      return applicationService.request('user.updateOne', {
        id,
        applicationId,
        payload: {
          email,
          givenName,
          familyName,
          accessLevelIds,
          teamIds,
          organization,
          organizationTitle,
          countryCode,
          regionCode,
          postalCode,
        },
      });
    },

    /**
     *
     */
    updateAppUserCustomSelectAnswers: (_, { input }, { app }) => {
      const applicationId = app.getId();
      const { id, answers } = input;
      return applicationService.request('user.updateCustomSelectAnswers', {
        id,
        applicationId,
        answers,
      });
    },

    /**
     *
     */
    updateOwnAppUserCustomSelectAnswers: (_, { input }, { user }) => {
      const id = user.getId();
      const applicationId = user.getAppId();
      const { answers } = input;
      return applicationService.request('user.updateCustomSelectAnswers', {
        id,
        applicationId,
        answers,
      });
    },

    /**
     *
     */
    updateOwnAppUser: (_, { input }, { user }) => {
      const id = user.getId();
      const applicationId = user.getAppId();
      const {
        givenName,
        familyName,
        organization,
        organizationTitle,
        countryCode,
        regionCode,
        postalCode,
        receiveEmail,
      } = input;
      return applicationService.request('user.updateOne', {
        id,
        applicationId,
        payload: {
          givenName,
          familyName,
          organization,
          organizationTitle,
          countryCode,
          regionCode,
          postalCode,
          receiveEmail,
        },
      });
    },
  },
};
