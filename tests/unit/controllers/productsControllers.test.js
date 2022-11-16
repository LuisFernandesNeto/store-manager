const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

const productController = require('../../../src/controllers/productsControllers');
const productService = require('../../../src/services/productsServices');
const mockProducts = require('./mocks/products.controller.mock');    

const { expect } = chai;

chai.use(sinonChai);

describe('Testandos os controllers de product', ()=> {
  afterEach(sinon.restore);
  it('testando a listagem de todos os produtos', async () => {
    const res = {};
    const req = {};
    const productList = mockProducts

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
    .stub(productService, 'findAll')
    .resolves(productList);

    await productController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productList);
  });
  it('testando o id dos produtos', async () => {
    const res = {};
      const req = { params: { id: 1 } };
    const productList = mockProducts

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
    .stub(productService, 'findById')
    .resolves({ type: null, message: productList});

    await productController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productList);
  });
  it('testando o erro do id dos produtos', async () => {
    const res = {};
      const req = { params: { id: 10 } };
    const productList = mockProducts

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
    .stub(productService, 'findById')
    .resolves({type: 'PRODUCT_NOT_FOUND', message: 'Product not found'});

    await productController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });
});