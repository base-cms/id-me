import Route from '@ember/routing/route';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import gql from 'graphql-tag';

const query = gql`
  query CommentEdit($input: CommentQueryInput!) {
    comment(input: $input) {
      id
      body
    }
  }
`;

export default Route.extend(AppQueryMixin, {
  model({ comment_id: id }) {
    const input = { id };
    const variables = { input };
    return this.query({ query, variables, fetchPolicy: 'network-only' }, 'comment');
  },
});
