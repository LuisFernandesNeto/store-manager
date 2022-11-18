const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/salesModels');
const connection = require('../../../src/models/connection');
const mockSale = require('./mocks/sales.model.mock');

const { expect } = chai;

chai.use(sinonChai);

describe('testando os models de sales', async () => {
    afterEach(sinon.restore);

    const execute = { insertId: 1 };

    const expected = 1;

    it('testando o cadastro da venda', async () => {
        sinon.stub(connection, 'execute').resolves([execute]);
        const response = await salesModel.insert(mockSale);

        expect(response).to.equal(expected);
    });
});