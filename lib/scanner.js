var fs = require('fs'),
  route = require('koa-route'),
  _ = require('lodash-node'),
  mappedRoutes = {},
  mocksDirectory = process.argv[2] || '../mocks';

function scan(directory) {
  var items = fs.readdirSync(mocksDirectory);
  _.forEach(items, function(item) {
    var obj = JSON.parse(fs.readFileSync(mocksDirectory + '/' + item));
    mappedRoutes[identifier(obj.method, obj.uri)] = obj.response;
    app.use(route[obj.method](obj.uri, show));
    console.info('Registered route: %s', item);
  });
};

function identifier(method, uri) {
  return method.toLowerCase() + ':' + uri;
};

function* show() {
  var mappedRoute = mappedRoutes[identifier(this.request.method, this.url)];
  this.status = mappedRoute.status;
  this.body = mappedRoute.body;
};

module.exports = function(app) {
  this.app = app;
  return {
    scan: scan,
    routes: mappedRoutes,
  }
}
