const { assert } = require('chai');
const { fake } = require('sinon');
const Database = require('../src/Database');

describe('poemsData', () => {
  it('should get poems data', async () => {
    const get = fake.yields(null, JSON.stringify([]));
    const database = new Database({ get });
    const poemData = await database.getPoemsData();
    assert.strictEqual(get.firstArg, 'poemsData');
    assert.deepStrictEqual(poemData, []);
    assert.ok(get.calledOnce);
  });
});
