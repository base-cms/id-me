import EmberObject from '@ember/object';
import LoadingMixinMixin from '@identity-x/manage/mixins/loading-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | loading-mixin', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let LoadingMixinObject = EmberObject.extend(LoadingMixinMixin);
    let subject = LoadingMixinObject.create();
    assert.ok(subject);
  });
});
