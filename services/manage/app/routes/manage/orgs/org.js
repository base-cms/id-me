import Route from '@ember/routing/route';
import query from '@base-cms/id-me-manage/gql/queries/organization/organization';
import OrganizationContext from '@base-cms/id-me-manage/mixins/organization-context';

export default Route.extend(OrganizationContext, {

  model({ org_id: id }) {
    const variables = { input: { id } };
    return this.query(id, { query, variables }, 'organization');
  },

  afterModel(model) {
    this.controllerFor('application').set('organization', model);
  },

});