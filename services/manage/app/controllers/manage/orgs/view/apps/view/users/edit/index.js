import Controller from '@ember/controller';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';
import fragment from '@identity-x/manage/graphql/fragments/app-user-list';

const mutation = gql`
  mutation AppUserEdit($input: UpdateAppUserMutationInput!) {
    updateAppUser(input: $input) {
      ...AppUserListFragment
    }
  }
  ${fragment}
`;

export default Controller.extend(ActionMixin, AppQueryMixin, {
  errorNotifier: inject(),

  actions: {
    async update() {
      try {
        this.startAction();
        const {
          id,
          email,
          givenName,
          familyName,
          accessLevels,
          teams,
          organization,
          organizationTitle,
          countryCode,
          regionCode,
          postalCode,
        } = this.get('model');

        const payload = {
          email,
          givenName,
          familyName,
          accessLevelIds: accessLevels.map(level => level.id),
          teamIds: teams.map(team => team.id),
          organization,
          organizationTitle,
          countryCode,
          regionCode,
          postalCode,
        };
        const input = { id, payload };
        const variables = { input };
        await this.mutate({ mutation, variables }, 'updateAppUser');
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
