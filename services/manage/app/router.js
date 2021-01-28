import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('not-found', { path: '/*path' });
  this.route('login');
  this.route('signup');
  this.route('logout');
  this.route('set-profile'),
  this.route('authenticate', { path: '/authenticate/:token' });
  this.route('manage', { path: '' }, function() {
    this.route('invites', function() {
      this.route('view', { path: ':org_id' });
    });
    this.route('orgs', function() {
      this.route('list', { path: '/' }, function() {
        this.route('create');
        this.route('edit', { path: '/edit/:org_id' });
      });
      this.route('view', { path: ':org_id' }, function() {
        this.route('settings', function() {
          this.route('regional-consent', function() {
            this.route('edit', { path: ':consent_id' });
          })
        });
        this.route('users', function() {
          this.route('invite');
        });
        this.route('apps', function() {
          this.route('list', { path: '/' }, function() {
            this.route('create');
            this.route('edit', { path: 'edit/:app_id' }, function() {
              this.route('contexts', function() {
                this.route('add');
                this.route('edit', { path: ':context_id' });
              });
            });
          });
          this.route('view', { path: ':app_id' }, function() {
            this.route('access-levels', function() {
              this.route('create');
              this.route('edit', { path: ':access_level_id' });
            });
            this.route('teams', function() {
              this.route('create');
              this.route('edit', { path: ':team_id' });
            });
            this.route('users', function() {
              this.route('create');
              this.route('edit', { path: ':email' }, function() {
                this.route('custom-select-fields');
              });
            });
            this.route('comments', function() {
              this.route('edit', { path: ':comment_id' });
            });
            this.route('fields', function() {
              this.route('create');
              this.route('edit', { path: ':field_id' });
            });
          });
        });
      })
    })
  });
});

export default Router;
