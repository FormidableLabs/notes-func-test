/**
 * Example tests.
 */
var client = require("rowdy").client;

describe("notes", function () {

  describe("items", function () {
    it("adds a note and deletes it", function (done) {
      client
        .get(global.HOST_URL)

        // Create a note.
        .waitForElementByCss("[data-qa-name='notes-new-input']")
        .type("Delete Test")
        .waitForElementByCss("[data-qa-name='notes-new-create']")
        .click()
        .waitForElementByCss("[data-qa-name='notes-item-title']")
        .text()
        .then(function (text) {
          expect(text).to.equal("Delete Test");
        })

        // Delete it.
        .waitForElementByCss("[data-qa-name='notes-item-delete']")
        .click()
        .safeEval("!!document.querySelector(\"[data-qa-name='notes-item']\")")
        .then(function (hasNotes) {
          expect(hasNotes).to.be.false;
        })

        .nodeify(done);
    });

    it("adds a note and edits it", function (done) {
      client
        .get(global.HOST_URL)

        // Create a note.
        .waitForElementByCss("input[data-qa-name='notes-new-input']")
        .type("Edit Test")
        .waitForElementByCss("button[data-qa-name='notes-new-create']")
        .click()
        .waitForElementByCss("[data-qa-name='notes-item-title']")
        .text()
        .then(function (text) {
          expect(text).to.equal("Edit Test");
        })

        // Edit the note.
        .waitForElementByCss("[data-qa-name='notes-item-edit']")
        .click()

        // Check new URL.
        .url()
        .then(function (url) {
          expect(url).to.match(/\/note\/[0-9]*\/edit$/);
        })
        .waitForElementByCss("[data-qa-name='note-edit-title']")
        .getValue()
        .then(function (val) {
          expect(val).to.equal("Edit Test");
        })

        .nodeify(done);
    });

    it("adds a note and views it");
  });

});
