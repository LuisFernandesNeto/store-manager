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

    const soldProduct = [
            {
              "productId": 1,
              "quantity": 1
            },
            {
              "productId": 2,
              "quantity": 5
            }
          ];

    const saleId = 1;

    it('testando o cadastro da venda', async () => {
        sinon.stub(connection, 'execute').resolves(mockSale);
        const response = await salesModel.insert([soldProduct], saleId);

        expect(response).to.deep.equal(mockSale);
    });
});