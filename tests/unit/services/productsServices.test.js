const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

const productService = require('../../../src/services/productsServices');
const productModel = require('../../../src/models/productsModels');
const mockProducts = require('./mocks/products.service.mock');
const { products } = mockProducts;

const { expect } = chai;

chai.use(sinonChai);

describe('Testandos os services de product', function () {
  afterEach(sinon.restore);
  it('testando a listagem de todos os produtos', async function () {
    sinon.stub(productModel, 'findAll').resolves([...products]);

    const response = await productService.findAll();
    expect(response).to.deep.equal(products);
  });
  it('testando a listagem de todos os produtos', async function () {
    sinon.stub(productModel, 'findById').resolves(products[0]);

    const response = await productService.findById(1);
    expect(response.message).to.be.deep.equal(products[0]);
  });
  it('testando a listagem de todos os produtos', async function () {
    sinon.stub(productModel, 'findById').resolves();

    const response = await productService.findById(10);
    expect(response.message).to.be.deep.equal('Product not found');
  });
});