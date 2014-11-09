/**
 * Global setup / teardown.
 */
var rowdy = require("rowdy");
var client = rowdy.client;
var adapter = rowdy.adapters.mocha;
var api = require("../utils/api");

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
  api.delNotes(done);
});

adapter.afterEach();
adapter.after();

