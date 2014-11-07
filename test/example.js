/**
 * Example tests.
 */
var client = require("rowdy").client;

// TODO: Move to global config.
// TODO: rename this file.
var HOST_URL = "http://127.0.0.1:3002";

describe("notes", function () {

  it("adds a note and deletes it", function (done) {
    client
      .get(HOST_URL)

      // Create a note.
      .waitForElementByCss("input[data-qa-name='note-new-input']")
      .type("Delete Test")
      .waitForElementByCss("button[data-qa-name='note-new-create']")
      .click()
      .waitForElementByCss(".notes-item .note-title")
      .text()
      .then(function (text) {
        expect(text).to.equal("Delete Test");
      })

      // Delete a note
      .waitForElementByCss(".notes-item .note-delete")
      .click()

      .nodeify(done);
  });

  it("adds a note and edits it", function (done) {
    client
      .get(HOST_URL)

      // Create a note.
      .waitForElementByCss("input[data-qa-name='note-new-input']")
      .type("Edit Test")
      .waitForElementByCss("button[data-qa-name='note-new-create']")
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

