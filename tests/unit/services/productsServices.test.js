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
  describe('testando cadastro de um novo produto', async () => {
    beforeEach(async () => {
      sinon.stub(productModel, 'insert').resolves(product);
    });

    afterEach(sinon.restore);

    const product = {
      id: 1,
      name: 'Trombeta Flamejante',
    };

    const invalidValue = true;
    const invalidName = 'F';
    const validName = 'Trombeta Flamejante';

    it('com erros', async () => {
      const response = await productService.insert(invalidValue);

      expect(response.type).to.equal('INVALID_NAME');
      expect(response.message).to.equal('"name" length must be at least 5 characters long');

    });
    it('com sucesso', async () => {
      const response = await productService.insert(validName);

      expect(response.type).to.equal(null);
      expect(response.message).to.equal(product);
    });
  });
});