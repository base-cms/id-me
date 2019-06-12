import EmberObject from '@ember/object';
import ActionMixinMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | action-mixin', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let ActionMixinObject = EmberObject.extend(ActionMixinMixin);
    let subject = ActionMixinObject.create();
    assert.ok(subject);
  });
});
