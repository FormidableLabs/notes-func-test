var api = require("../utils/api");

describe("note", function () {

  beforeEach(function (done) {
    api.postNote({
      title: "My test note",
      text: "## Heading\n\n*Awesome*"
    }, done);
  });

  it("views a note");
  it("edits a note, then views changes");
  it("deletes a note");
});
