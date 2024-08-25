import assert from "assert";

class AssertContext {
  constructor() {
    this.testCount = 0;
    this.globalTestCount = 0;
    this.expectedCount = null;
    this.expectedGlobalCount = null;

    return this;
  }
  ok(condition, message) {
    this.testCount++;
    this.globalTestCount++;
    assert.ok(condition, message);

    return this;
  }
  equal(actual, expected, message) {
    assert.equal(actual, expected, message);
    this.testCount++;
    this.globalTestCount++;

    return this;
  }
  strictEqual(actual, expected, message) {
    assert.strictEqual(actual, expected, message);
    this.testCount++;
    this.globalTestCount++;

    return this;
  }
  deepEqual(actual, expected, message) {
    assert.deepEqual(actual, expected, message);
    this.testCount++;
    this.globalTestCount++;

    return this;
  }
  deepStrictEqual(actual, expected, message) {
    assert.deepStrictEqual(actual, expected, message);
    this.testCount++;
    this.globalTestCount++;

    return this;
  }
  resetCount() {
    this.testCount = 0;

    return this;
  }
  expectCount(count) {
    this.expectedCount = count;

    return this;
  }
  expectGlobalCount(count) {
    this.expectedGlobalCount = count;

    return this;
  }
  assertCount() {
    if (this.expectedCount) {
      assert.deepEqual(
        this.testCount,
        this.expectedCount,
        "Tests does not match expected count"
      );
    }

    return this;
  }
  assertGlobalCount() {
    if (this.expectGlobalCount) {
      assert.deepEqual(
        this.globalTestCount,
        this.expectedGlobalCount,
        "Tests does not match global expected count"
      );
    }

    return this;
  }
}
export const test = async (fn) => {
  const context = new AssertContext();
  await fn(context);

  context.assertCount();
  context.assertGlobalCount();
};
