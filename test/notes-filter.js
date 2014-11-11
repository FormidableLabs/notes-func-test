// Client-side proxies.
/*globals document */
var async = require("async");
var client = require("rowdy").client;
var api = require("../utils/api");
var dom = require("../utils/dom");

describe("notes", function () {

  describe("filter", function () {

    beforeEach(function (done) {
      async.auto({
        note1: function (cb) { api.postNote("Note 1", cb); },
        note2: function (cb) { api.postNote("Note 2", cb); },
        note3: function (cb) { api.postNote("Note 3", cb); }
      }, done);
    });

    it("filters to no matches", function (done) {
      client
        .get(global.HOST_URL)

        .safeEval(dom.jsToStr(function () {
          return document
            .querySelectorAll("[data-qa-name='notes-item']").length;
        }))
        .then(function (numNotes) {
          expect(numNotes).to.equal(3);
        })

        .waitForElementByCss("[data-qa-name='notes-filter']")
        .type("NO_MATCH")

        .safeEval(dom.jsToStr(function () {
          return document
            .querySelectorAll("[data-qa-name='notes-item']").length;
        }))
        .then(function (numNotes) {
          expect(numNotes).to.equal(0);
        })

        .nodeify(done);
    });

    it("filters to one match");
    it("filters to multiple matches");
    it("filters to all matches");
  });

});
