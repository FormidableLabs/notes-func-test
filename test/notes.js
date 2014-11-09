/**
 * Example tests.
 */
var async = require("async");
var superagent = require("superagent");
var client = require("rowdy").client;

// Helpers.
var _postNote = function (title, cb) {
  superagent
    .agent()
    .post(global.HOST_URL + "/api/notes")
    .send({
      title: title,
      text: "Text for " + title,
      createdAt: new Date()
    })
    .on("error", cb)
    .end(function () {
      cb();
    });
};

var _qsAll = function (sel, extra) {
  return "document.querySelectorAll(\"" + sel + "\")" + extra;
};

describe("notes", function () {

  describe("items", function () {

    it("displays existing notes", function (done) {
      async.auto({
        note1: function (cb) { _postNote("Note 1", cb); },
        note2: function (cb) { _postNote("Note 2", cb); },
        note3: function (cb) { _postNote("Note 3", cb); }
      }, function (err) {
        if (err) { return done(err); }

        client
          .get(global.HOST_URL)

          .safeEval(_qsAll("[data-qa-name='notes-item']", ".length"))
          .then(function (numNotes) {
            expect(numNotes).to.equal(3);
          })

          .nodeify(done);
      });
    });

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
        .safeEval(_qsAll("[data-qa-name='notes-item']", ".length"))
        .then(function (numNotes) {
          expect(numNotes).to.equal(0);
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

    it("adds a note and views it", function (done) {
      client
        .get(global.HOST_URL)

        // Create a note.
        .waitForElementByCss("input[data-qa-name='notes-new-input']")
        .type("View Test")
        .waitForElementByCss("button[data-qa-name='notes-new-create']")
        .click()
        .waitForElementByCss("[data-qa-name='notes-item-title']")
        .text()
        .then(function (text) {
          expect(text).to.equal("View Test");
        })

        // View the note by clicking on the title.
        .waitForElementByCss("[data-qa-name='notes-item-title']")
        .click()

        // Check new URL.
        .url()
        .then(function (url) {
          expect(url).to.match(/\/note\/[0-9]*\/view$/);
        })
        .waitForElementByCss("[data-qa-name='note-view-title']")
        .text()
        .then(function (text) {
          expect(text).to.equal("View Test");
        })

        .nodeify(done);
    });
  });

});
