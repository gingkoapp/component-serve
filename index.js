var express = require('express');
var Temp = require('temporary/lib/dir');
var builder = require('./builder.js');

module.exports = function(opts) {
  if (!opts.out) opts.out = new Temp().path;

  var router = express();
  var rebuild = builder(opts);

  router.use(express.static(opts.out));
  router.get('/build.js', rebuild, function(req, res) {
    res.type('js');
    res.send(res.locals.js);
  });

  router.get('/build.css', rebuild, function(req, res) {
    res.type('css');
    res.send(res.locals.css);
  });

  return router;
};
