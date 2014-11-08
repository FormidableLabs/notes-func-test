/**
 * Example tests.
 */
var client = require("rowdy").client;
var asserters = require("wd").asserters;

describe("notes", function () {

  describe("items", function () {
    it("adds a note and deletes it", function (done) {
      client
        .get(global.HOST_URL)

        // Create a note.
        .waitForElementByCss("input[data-qa-name='note-new-input']")
        .type("Delete Test")
        .waitForElementByCss("button[data-qa-name='note-new-create']")
        .click()
        .waitForElementByCss("[data-qa-name='note-item']:last-child",
          asserters.textInclude("Delete Test"))
        .text()
        .then(function (text) {
          expect(text).to.equal("Delete Test");
        })

        // // Delete a note
        // // TODO REMOVE?
        // .waitForElementByCss(
        //   "[data-qa-name='note-item']:last-child " +
        //   "[data-qa-name='note-item-delete']")
        // .click()

        .nodeify(done);
    });

    it("adds a note and edits it", function (done) {
      client
        .get(global.HOST_URL)

        // Create a note.
        .waitForElementByCss("input[data-qa-name='note-new-input']")
        .type("Edit Test")
        .waitForElementByCss("button[data-qa-name='note-new-create']")
        .click()
        .waitForElementByCss("[data-qa-name='note-item']:last-child",
          asserters.textInclude("Edit Test"))
        .text()
        .then(function (text) {
          expect(text).to.equal("Edit Test");
        })

        // Edit the note.
        // .waitForElementByCss(".notes-item .note-edit")
        // .click()
        // .url()
        // .then(function (url) {
        //   expect(url).to.match(/\/note\/.*\/edit$/);
        // })
        // .waitForElementByCss("#input-title")
        // .getValue()
        // .then(function (val) {
        //   expect(val).to.equal("Edit Test");
        // })

        .nodeify(done);
    });

    it("adds a note and views it");
  });

});
