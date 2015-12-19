import assert from 'assert';
import API    from '../src/index.js';

describe('YouAreDaBomb', () => {
  beforeEach(function() {
    this.callTriggers = {
      before: false,
      after:  false,
      method: false
    };

    this.callOrder = {
      before: null,
      after:  null,
      method: null
    };

    this.callOrderIter = 1;

    this.testObject = {
      testMethod: (arg) => {
        this.callTriggers.method = arg;
        this.callOrder.method    = this.callOrderIter++;
      }
    };
  });

  it('Will trigger callback with arguments before testMethod call on `Before` usage', function()  {
    API.Before(this.testObject, 'testMethod', (arg) => {
      this.callTriggers.before = arg;
      this.callOrder.before    = this.callOrderIter++;
    });
    this.testObject.testMethod(true);

    assert.deepEqual(
      this.callTriggers,
      { before: true, after: false, method: true }
    );
    assert.deepEqual(
      this.callOrder,
      { before: 1, after: null, method: 2 }
    );
  });

  it('Will trigger callback with arguments after testMethod call on `After` usage', function()  {
    API.After(this.testObject, 'testMethod', (arg) => {
      this.callTriggers.after = arg;
      this.callOrder.after    = this.callOrderIter++;
    });
    this.testObject.testMethod(true);

    assert.deepEqual(
      this.callTriggers,
      { before: false, after: true, method: true }
    );
    assert.deepEqual(
      this.callOrder,
      { before: null, after: 2, method: 1 }
    );
  });

  it('Will trigger callback with arguments before and after testMethod call on `Around` usage', function()  {
    API.Around(this.testObject, 'testMethod', (arg) => {
      if (this.callTriggers.before) {
        this.callTriggers.after = arg;
        this.callOrder.after    = this.callOrderIter++;
      } else {
        this.callTriggers.before = arg;
        this.callOrder.before    = this.callOrderIter++;
      }
    });
    this.testObject.testMethod(true);

    assert.deepEqual(
      this.callTriggers,
      { before: true, after: true, method: true }
    );
    assert.deepEqual(
      this.callOrder,
      { before: 1, after: 3, method: 2 }
    );
  });
});
