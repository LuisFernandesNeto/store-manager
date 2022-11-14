const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const productController = require('../../../src/controllers/productsControllers');
const productService = require('../../../src/services/productsServices');
const mockProducts = require('./mocks/products.controller.mock');    

const { expect, use } = chai;

use(chaiHttp);

describe('Testandos os controllers de product', ()=> {
  it('testando a listagem de todos os produtos', async () => {
    const res = {};
    /* const req = {}; */
    const productList = [mockProducts]

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
    .stub(productService, 'findAll')
    .resolves({ type: null, message: productList });

    await productController.findAll(_req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productList);
  })
});