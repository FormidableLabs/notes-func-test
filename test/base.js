/**
 * Global setup / teardown.
 */
var superagent = require("superagent");
var rowdy = require("rowdy");
var client = rowdy.client;
var adapter = rowdy.adapters.mocha;

adapter.before();
before(function (done) {
  client
    // Set our global timeout.
    .setImplicitWaitTimeout(global.ELEM_WAIT)

    .nodeify(done);
});

adapter.beforeEach();
beforeEach(function (done) {
  // Nuke all notes.
  superagent
    .agent()
    .del(global.HOST_URL + "/api/notes")
    .send({})
    .on("error", done)
    .end(function () {
      done();
    });
});

adapter.afterEach();
adapter.after();

