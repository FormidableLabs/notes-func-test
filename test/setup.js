/**
 * Mocha setup.
 */
/*globals chai:true */
var chai = require("chai");

// Add test lib globals.
global.expect = chai.expect;

// Constants.
global.ELEM_WAIT = 200;
global.HOST_URL = "http://127.0.0.1:3002";

// Set test environment
process.env.NODE_ENV = "test";

// Configure Rowdy.
var rowdy = require("rowdy");
var config = require("../config");
rowdy(config);
