const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const productModel = require('../../../src/models/productsModels');
const connection = require('../../../src/models/connection');
const mockProducts = require('./mocks/products.model.mock');    

const { expect, use } = chai;

use(chaiHttp);

describe('Testandos os models de product', ()=> {
  afterEach(sinon.restore);

  it('testando a listagem de todos os produtos', async () => {
    sinon.stub(connection, 'execute').resolves([mockProducts]);
    const response = await productModel.findAll();

    expect(response).to.deep.equal(mockProducts);
  });
  it('testando id dos produtos', async ()=> {
    sinon.stub(connection, 'execute').resolves([[mockProducts[0]]]);
    const response = await productModel.findById(1);

    expect(response).to.be.deep.equal(mockProducts[0]);
  });
  describe('cadastro de um novo produto', async () => {
    before(async () => {
      const execute = { insertId: 1 };

      sinon.stub(connection, 'execute').resolves([execute]);
    });

    const expected = 1;

    const payload = {
      name: 'Xablau Insano',
    };

    it('com sucesso', async () => {
      const response = await productModel.insert(payload.name);
  
      expect(response).to.equal(expected);
    });
  });
  describe('alterar um produto', async () => {
    before(async () => {
      const execute = 1;

      sinon.stub(connection, 'execute').resolves(execute);
    });

    const expected = 1

    const payload = {
      name: 'Xablau Insano',
    };

    it('com sucesso', async () => {
      const response = await productModel.update(payload.name);

      expect(response).to.equal(expected);
    });
  });
  describe('remover um produto', async () => {
    before(async () => {
      const execute = 1;

      sinon.stub(connection, 'execute').resolves(execute);
    });

    const payload = {
      name: 'Xablau Insano',
    };

    const expected = 1;

    it('com sucesso', async () => {
      const response = await productModel.remove(payload.name);

      expect(response).to.equal(expected);
    });
  });
});