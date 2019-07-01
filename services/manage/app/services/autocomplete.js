import Service, { inject } from '@ember/service';
import { ObjectQueryManager } from 'ember-apollo-client';
import gql from 'graphql-tag';

const matchAccessLevels = gql`
  query AutocompleteAccessLevels($input: MatchAccessLevelsQueryInput!) {
    matchAccessLevels(input: $input) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export default Service.extend(ObjectQueryManager, {
  errorNotifier: inject(),
  contextService: inject('context'),

  /**
   * Gets the query and result key for the provided type.
   *
   * @param {string} type
   */
  getQueryFor(type) {
    switch (type) {
      case 'AccessLevel':
        return { field: 'name', query: matchAccessLevels, resultKey: 'matchAccessLevels', scope: 'app' };
      default:
        throw new Error(`The autocomplete type '${type}' is not registered.`);
    }
  },

  /**
   * Runs an autocomplete query.
   *
   * @param {string} type The GraphQL type to query.
   * @param {string} phrase The search phrase.
   * @param {object} options Additional options.
   * @param {object} options.vars Additional input to apply to the query
   */
  async query(type, phrase, { vars } = {}) {
    const { field, query, resultKey, scope } = this.getQueryFor(type);
    const context = this.contextService.queryContextFor(scope);
    const input = {
      field,
      phrase,
      position: 'contains',
      ...vars,
    };
    const variables = { input };
    try {
      const results = await this.get('apollo').watchQuery({ query, variables, context, fetchPolicy: 'network-only' }, resultKey);
      return results.edges.map(edge => edge.node);
    } catch (e) {
      this.errorNotifier.show(e);
    }
  },
});
