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
    this.route('organizations', { path: ':id' }, function() {
      this.route('users', function() {
        this.route('view', { path: ':id' });
      });
      this.route('applications', function() {
      });
    })
  });
});

export default Router;
