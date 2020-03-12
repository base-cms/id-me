import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import RouteObservableMixin from '@identity-x/manage/mixins/route-observable';
import gql from 'graphql-tag';
import fragment from '@identity-x/manage/graphql/fragments/comment-list';

const comments = gql`
  query AppComments($input: CommentsQueryInput) {
    comments(input: $input) {
      edges {
        node {
          ...CommentListFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
  ${fragment}
`;

export default Route.extend(AppQueryMixin, RouteObservableMixin, {
  errorNotifier: inject(),

  async model() {
    this.getController().set('resultKey', 'comments');
    try {
      const response = await this.query({ query: comments, fetchPolicy: 'cache-and-network' }, 'comments');
      this.getController().set('observable', this.getObservable(response));
      return response;
    } catch (e) {
      this.errorNotifier.show(e);
    }
  },
});
