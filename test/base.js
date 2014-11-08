/**
 * Global setup / teardown.
 */
var superagent = require("superagent");
var rowdy = require("rowdy");
var client = rowdy.client;
var adapter = rowdy.adapters.mocha;

// Globals
var ELEM_WAIT = 200;

// TODO: Move to global config.
var HOST_URL = "http://127.0.0.1:3002";

adapter.before();
before(function (done) {
  client
    // Set our global timeout.
    .setImplicitWaitTimeout(ELEM_WAIT)

    .nodeify(done);
});

adapter.beforeEach();
beforeEach(function (done) {
  // Nuke all notes.
  superagent
    .agent()
    .del(HOST_URL + "/api/notes")
    .send({})
    .on("error", done)
    .end(function () {
      done();
    });
});

adapter.afterEach();
adapter.after();

