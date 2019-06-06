import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('logout');
  this.route('authenticate', { path: '/authenticate/:token' });
  this.route('manage', { path: '' }, function() {
    this.route('invitations');
    this.route('orgs', function() {
      this.route('org', { path: ':org_id' }, function() {
        this.route('users', function() {
          this.route('user', { path: ':user_id' });
        });
        this.route('apps', function() {
          this.route('app', { path: ':app_id' }, function() {
            this.route('access-levels');
            this.route('teams');
            this.route('users');
          });
        });
      })
    })
  });
});

export default Router;
