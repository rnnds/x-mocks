var koa = require('koa'),
  route = require('koa-route'),
  app = module.exports = koa(),
  scanner = require('./scanner.js')(app);

app.use(route.get('/routes', function*() {
  this.body = JSON.stringify(scanner.routes);
}));

scanner.scan();

if (!module.parent) app.listen(3000);
