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
    const product = {
      id: 1,
      name: 'Trombeta Flamejante',
    };

    const invalidValue = undefined;
    const invalidName = 'F';
    const validName = 'Trombeta Flamejante';

    afterEach(sinon.restore);

    it('com erro de length', async () => {
      const response = await productService.insert(invalidName);

      expect(response.type).to.equal('INVALID_NAME');
      expect(response.message).to.equal('"name" length must be at least 5 characters long');

    });
    it('com erro retorna undefined', async () => {
      const response = await productService.insert(invalidValue);

      expect(response.type).to.equal('INVALID_VALUE');
      expect(response.message).to.equal('"name" is required');

    });
    it('com sucesso', async () => {
      sinon.stub(productModel, 'insert').resolves(1);
      sinon.stub(productModel, 'findById').resolves(product);
      const response = await productService.insert(validName);

      expect(response.type).to.equal(null);
      expect(response.message).to.equal(product);
    });
  });
  describe('testando atualização de um produto', async () => {
    const product = {
      id: 2,
      name: 'Trombeta Flamejante',
    };

    const invalidValue = undefined;
    const invalidName = 'F';
    const validName = 'Trombeta Flamejante';
    const validId = 2;

    afterEach(sinon.restore);

    it('com erro de length', async () => {
      const response = await productService.update(invalidName);

      expect(response.type).to.equal('INVALID_NAME');
      expect(response.message).to.equal('"name" length must be at least 5 characters long');

    });
    it('com erro retorna undefined', async () => {
      const response = await productService.update(invalidValue);

      expect(response.type).to.equal('INVALID_VALUE');
      expect(response.message).to.equal('"name" is required');

    });
    it('com sucesso', async () => {
      sinon.stub(productModel, 'update').resolves(1);
      sinon.stub(productModel, 'findById').resolves(1);
      const response = await productService.update(validName, validId);

      expect(response.type).to.equal(null);
      expect(response.message).to.equal(product);
    });
  });
});