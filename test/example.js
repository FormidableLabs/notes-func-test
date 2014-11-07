/**
 * Example tests.
 */
/*global $*/
var asserters = require("wd").asserters;
var client = require("rowdy").client;

// TODO: Encapsulate this somewhere / switch asserts...
var _wrapFn = function (fn) {
  return "(" + fn.toString() + "())";
};

// TODO: Move to global config.
var HOST_URL = "http://127.0.0.1:3002";

describe("notes", function () {

  it("adds a note and deletes it", function (done) {
    client
      .get(HOST_URL)

      // Create a note.
      .waitForElementByCss("input.qa-note-new-input")
      .type("Delete Test")
      .waitForElementByCss("button#note-create")
      .click()
      .waitForElementByCss(".notes-item .note-title")
      .text()
      .then(function (text) {
        expect(text).to.equal("Delete Test");
      })

      // Delete a note
      .waitForElementByCss(".notes-item .note-delete")
      .click()
      .waitFor(asserters.jsCondition(_wrapFn(function () {
        // This is **not** the test code. It is code that is injected to the
        // remote browser state and executed in the browser.
        return $(".notes-item .note-delete").length === 0;
      })))

      .nodeify(done);
  });

  it("adds a note and edits it", function (done) {
    client
      .get(HOST_URL)

      // Create a note.
      .waitForElementByCss("input.qa-note-new-input")
      .type("Edit Test")
      .waitForElementByCss("button#note-create")
      .click()
      .waitForElementByCss(".notes-item .note-title")
      .text()
      .then(function (text) {
        expect(text).to.equal("Edit Test");
      })

      // Edit the note.
      .waitForElementByCss(".notes-item .note-edit")
      .click()
      .url()
      .then(function (url) {
        expect(url).to.match(/\/note\/.*\/edit$/);
      })
      .waitForElementByCss("#input-title")
      .getValue()
      .then(function (val) {
        expect(val).to.equal("Edit Test");
      })

      .nodeify(done);
  });
});

