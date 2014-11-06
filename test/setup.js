/**
 * Mocha setup.
 */
/*globals chai:true */
var chai = require("chai");

// Add test lib globals, and patch Chai.
global.expect = chai.expect;

// Set test environment
process.env.NODE_ENV = "test";

// Configure Rowdy.
var rowdy = require("rowdy");
var config = require("../config");
rowdy(config);
