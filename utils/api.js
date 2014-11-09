/**
 * API helpers.
 */
var superagent = require("superagent");
var _ = require("lodash");

module.exports = {
  delNotes: function (callback) {
    superagent
      .agent()
      .del(global.HOST_URL + "/api/notes")
      .send({})
      .on("error", callback)
      .end(function () {
        callback();
      });
  },

  postNote: function (obj, callback) {
    title = _.isString(obj) ? obj : null;

    superagent
      .agent()
      .post(global.HOST_URL + "/api/notes")
      .send(_.merge({
        title: title,
        text: "Text for " + title,
        createdAt: new Date()
      }, obj))
      .on("error", callback)
      .end(function () {
        callback();
      });
  }
};
