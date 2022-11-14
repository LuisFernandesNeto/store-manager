const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const productService = require('../../../src/services/productsServices');
const productModel = require('../../../src/models/productsModels');
const mockProducts = require('./mocks/products.service.mock');
const { products } = mockProducts;

const { expect, use } = chai;

use(chaiHttp);

describe('Testandos os services de product', function () {
  it('testando a listagem de todos os produtos', async function () {
    sinon.stub(productModel, 'findAll').resolves(products);

    const response = await productService.findAll();

    expect(response.message).to.deep.equal(products);
  })
});