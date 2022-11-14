const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const productModel = require('../../../src/models/productsModels');
const connection = require('../../../src/models/connection');
const mockProducts = require('./mocks/products.model.mock');    

const { expect, use } = chai;

use(chaiHttp);

describe('Testandos os models de product', ()=> {
  it('testando a listagem de todos os produtos', async ()=> {
    sinon.stub(connection, 'execute').resolves([mockProducts]);
    const response = await productModel.findAll();

    expect(response).to.deep.equal(mockProducts);
  })
});