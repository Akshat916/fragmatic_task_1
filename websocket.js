// websocket.js
const maxmindReader = require('./maxmind');
const GeoData = require('./schema');

module.exports = (socket) => {
  console.log('WebSocket connection established.');

  socket.on('message', async (message) => {
    console.log(`Received: ${message}`);
    console.log('Message handling function called');

    const data = JSON.parse(message);
    const ip_address = data[0];
    console.log(`IP: ${ip_address}`);

    if (ip_address) {
      try {
        const existingData = await GeoData.findOne({ IP: ip_address });

        if (existingData) {
          console.log('Data with the same IP already exists in the database. Not adding new data.');
        } else {
            const geo_data = maxmindReader.get(ip_address);
            if (geo_data) {
            const refine_data = new GeoData({
            IP: ip_address,
            city: {
              geoname_id: geo_data.city ? geo_data.city.geoname_id : null,
              names: geo_data.city ? geo_data.city.names.en : null,
            },
            continent: {
              code: geo_data.continent ? geo_data.continent.code : null,
              geoname_id: geo_data.continent ? geo_data.continent.geoname_id : null,
              names: geo_data.continent ? geo_data.continent.names.en : null,
            },
            country: {
              geoname_id: geo_data.country ? geo_data.country.geoname_id : null,
              iso_code: geo_data.country ? geo_data.country.iso_code : null,
              names: geo_data.country ? geo_data.country.names.en : null,
            },
            location: {
              accuracy_radius: geo_data.location ? geo_data.location.accuracy_radius : null,
              latitude: geo_data.location ? geo_data.location.latitude : null,
              longitude: geo_data.location ? geo_data.location.longitude : null,
              time_zone: geo_data.location ? geo_data.location.time_zone : null,
            },
            postal_code: geo_data.postal ? geo_data.postal.code : null,
            registered_country: {
              geoname_id: geo_data.registered_country ? geo_data.registered_country.geoname_id : null,
              iso_code: geo_data.registered_country ? geo_data.registered_country.iso_code : null,
              names: geo_data.registered_country ? geo_data.registered_country.names.en : null,
            },
            subdivisions: {
              geoname_id: geo_data.subdivisions[0] ? geo_data.subdivisions[0].geoname_id : null,
              iso_code: geo_data.subdivisions[0] ? geo_data.subdivisions[0].iso_code : null,
              names: geo_data.subdivisions[0] ? geo_data.subdivisions[0].names.en : null,
            },
            });

            console.log(refine_data);

            await refine_data.save();
            console.log('Data inserted into MongoDB using Mongoose successfully.');
          }
          else{
            console.log('Geo data is not avilabe for this IP',ip_address);
          }
        }
      } catch (err) {
        console.error('Error processing data:', err);
      }
    }
  });
};
