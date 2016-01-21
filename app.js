var koa = require('koa'),
  route = require('koa-route'),
  app = module.exports = koa(),
  fs = require('fs'),
  mappedRoutes = {};

app.use(route.get('/routes', routes));

function* routes() {
  this.body = JSON.stringify(mappedRoutes);
}

function* show(data) {
  var mappedRoute = mappedRoutes[this.url];
  this.status = mappedRoute.status;
  this.body = mappedRoute.body;
}

fs.readdir('mocks', function(err, items) {
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    fs.readFile('mocks/' + item, 'utf8', function(err, data) {
      var obj = JSON.parse(data);
      mappedRoutes[obj.uri] = obj.response;
      app.use(route[obj.method](obj.uri, show));
    });
  }
});

if (!module.parent) app.listen(3000);
