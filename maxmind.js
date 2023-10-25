// maxmind.js
const maxmind = require('maxmind');

const maxmindReader = maxmind.openSync('GeoLite2-City.mmdb');

module.exports = maxmindReader;
