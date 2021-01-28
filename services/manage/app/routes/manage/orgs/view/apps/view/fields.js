import Route from '@ember/routing/route';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import ListRouteMixin from '@identity-x/manage/mixins/list-route';
import gql from 'graphql-tag';

const fields = gql`
  query AppFields($input: FieldsQueryInput!) {
    fields(input: $input) {
      edges {
        node {
          id
          name
          label
          required
          active
          ... on SelectField {
            options {
              id
              label
            }
            multiple
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

const matchFields = gql`
  query AppFieldsMatch($input: MatchFieldsQueryInput!) {
    matchFields(input: $input) {
      edges {
        node {
          id
          name
          label
          required
          active
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

export default Route.extend(AppQueryMixin, ListRouteMixin, {
  async model(params) {
    const apollo = this.query.bind(this);
    const query = { key: 'fields', op: fields };
    const search = { key: 'matchFields', op: matchFields };
    return this.getResults(apollo, { query, search, params });
  },
});
