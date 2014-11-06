Notes - Functional Tests
========================

[![Build Status][trav_img]][trav_site]

Common functional tests for the REST-backed Notes app.

## WD.js

[WD.js](https://github.com/admc/wd) drives our functional tests. The library
implements all of the
[Webdriver JSON Protocols](https://code.google.com/p/selenium/wiki/JsonWireProtocol).

We use our own configuration wrapper,
[rowdy](https://github.com/FormidableLabs/rowdy) to set things up.

## Development

### Installation

Install with [npm](https://www.npmjs.org/):

    $ npm install

We follow a [Gulp](http://gulpjs.com/) workflow. To check everything:

    $ gulp check

[trav]: https://travis-ci.org/
[trav_img]: https://api.travis-ci.org/FormidableLabs/notes-func-test.svg
[trav_site]: https://travis-ci.org/FormidableLabs/notes-func-test
