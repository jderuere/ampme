global.chai = require('chai');
global.proxyquire = require('proxyquire');
global.request = require('supertest');
global.sinon = require('sinon');
global.sinonChai = require('sinon-chai');
global.chaiAsPromised = require('chai-as-promised');
global.expect = chai.expect;

chai.use(sinonChai);
chai.use(chaiAsPromised);