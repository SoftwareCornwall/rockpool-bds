const assert = require("assert");
const id_validation = require("../id_validation.js");

assert.equal(id_validation.validate_id(0), false);
assert.equal(id_validation.validate_id("11111"), true);
assert.equal(id_validation.validate_id("&&&&&"), false);
assert.equal(id_validation.validate_id("ABC12"), false);
assert.equal(id_validation.validate_id("abc12"), true);

console.log("All tests passing");
