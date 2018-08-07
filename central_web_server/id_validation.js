
function validate_id(id) { return /^([a-z0-9]{5})$/gm.test(id); }

module.exports = { validate_id };
