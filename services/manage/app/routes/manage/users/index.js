import Route from '@ember/routing/route';
import query from '@base-cms/id-me-manage/gql/queries/organization/users';
import OrganizationContext from '@base-cms/id-me-manage/mixins/organization-context';

export default Route.extend(OrganizationContext, {

  model() {
    console.info('model');
    const org = this.modelFor('manage.organization');
    return this.query(org.id, { query }, 'organizationUsers');
  },

});
