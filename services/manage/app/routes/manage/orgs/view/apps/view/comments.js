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

  queryParams: {
    statuses: {
      refreshModel: true,
    },
    users: {
      refreshModel: true,
    },
    streams: {
      refreshModel: true,
    },
    starting: {
      refreshModel: true,
    },
    ending: {
      refreshModel: true,
    },
  },

  async model({
    statuses,
    users,
    streams,
    starting,
    ending,
  } = {}) {
    this.getController().set('resultKey', 'comments');
    try {
      const userIds = users.map(user => user.id);
      const streamIds = streams.map(stream => stream.id);
      const input = { statuses, userIds, streamIds };
      if (starting) input.starting = parseInt(starting, 10);
      if (ending) input.ending = parseInt(ending, 10);
      const variables = { input };
      const response = await this.query({ query: comments, variables, fetchPolicy: 'network-only' }, 'comments');
      this.getController().set('observable', this.getObservable(response));
      window.scrollTo(0, 0);
      return response;
    } catch (e) {
      this.errorNotifier.show(e);
    }
  },

  actions: {
    refresh() {
      this.refresh();
    },
  },
});
