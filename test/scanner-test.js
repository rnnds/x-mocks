var assert = require('assert'),
  mock = require('mock-fs'),
  simple = require('simple-mock'),
  app = require('koa'),
  scanner = require('../lib/scanner.js')(app);

describe('Scanner', function() {
  describe('scan', function() {
    it('should read files and register its route', function() {
      mock({
        '../mocks': {
          'get.json': '{"uri":"list","method":"get","response":{"status":200,"body":"Ok"}}',
          'put.json': '{"uri":"add","method":"post","response":{"status":201,"body":"Created"}}'
        }
      });
      simple.mock(app, 'use').callFn(function(){});
      scanner.scan();
      assert.equal(JSON.stringify(scanner.routes['get:list']), '{"status":200,"body":"Ok"}');
      assert.equal(JSON.stringify(scanner.routes['post:add']), '{"status":201,"body":"Created"}');
    });
  });
});
