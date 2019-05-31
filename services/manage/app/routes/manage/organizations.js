import Route from '@ember/routing/route';
import query from '@base-cms/id-me-manage/gql/queries/organization/organization';
import OrganizationContext from '@base-cms/id-me-manage/mixins/organization-context';

export default Route.extend(OrganizationContext, {

  model({ id }) {
    this.userOrganizations = this.modelFor('manage');
    const variables = { input: { id } };
    return this.query(id, { query, variables }, 'organization');
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('userOrganizations', this.userOrganizations);
  },

});
