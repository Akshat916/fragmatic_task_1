// schema.js
const mongoose = require('./database');

const { Schema } = mongoose;

const geoDataSchema = new Schema({
    IP: {
        type: String,
        unique: true, // Enforce uniqueness for the IP field
      },
      city: {
        geoname_id: Number,
        names: String,
      },
      continent: {
        code: String,
        geoname_id: Number,
        names: String,
      },
      country: {
        geoname_id: Number,
        iso_code: String,
        names: String,
      },
      location: {
        accuracy_radius: Number,
        latitude: Number,
        longitude: Number,
        time_zone: String,
      },
      postal_code: String,
      registered_country: {
        geoname_id: Number,
        iso_code: String,
        names: String,
      },
      subdivisions: {
        geoname_id: Number,
        iso_code: String,
        names: String,
      },
});

module.exports = mongoose.model('GeoData', geoDataSchema);
