// eslint-disable-next-line import/no-extraneous-dependencies
const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

function FILE(s) {
  return !URL(s) && /\.json$/.test(s);
}
function start() {
  const server = jsonServer.create();
  const middleware = jsonServer.defaults();
  server.use(middleware);

  const routes = JSON.parse(fs.readFileSync('./routes.json'));
  const rewriter = jsonServer.rewriter(routes);
  server.use(rewriter);

  const router = jsonServer.router('./db.json');
  server.use(router);

  router.render = (req, res) => {
    res.jsonp({
      data: res.locals.data,
      status: 0,
      code: 200,
      success: true,
      msg: '',
    });
  };

  const webServer = server.listen(3333, () => {
    console.log('JSON Server is running');
  });
  return [webServer, server];
}

let [webServer, server] = start();

const source = './';
const watchedDir = path.dirname(source);
let readError = false;
fs.watch(watchedDir, (event, file) => {
  if (file) {
    const watchedFile = path.resolve(watchedDir, file);
    if (watchedFile === path.resolve(source)) {
      if (FILE(watchedFile)) {
        let obj;
        try {
          obj = JSON.parse(fs.readFileSync(watchedFile));
          if (readError) {
            readError = false;
          }
        } catch (e) {
          readError = true;
          return;
        }

        const isDatabaseDifferent = !_.isEqual(obj, server.db.getState());
        if (isDatabaseDifferent) {
          webServer.destroy(() => {
            [webServer, server] = start();
          });
        }
      }
    }
  }
});
