import Route from '@ember/routing/route';
import query from '@base-cms/id-me-manage/gql/queries/organization/applications';
import OrgRouteMixin from '@base-cms/id-me-manage/mixins/org-route';

export default Route.extend(OrgRouteMixin, {
  model() {
    return this.query({ query }, 'organizationApplications');
  },
});
