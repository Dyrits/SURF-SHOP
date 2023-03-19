const geocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const client = geocoding({ accessToken: process.env.MAPBOX_TOKEN });

module.exports = {
  search: async location =>
    client
      .forwardGeocode({ limit: 1, query: location, abc: "zefzef" })
      .send()
      .then(response => response?.body?.features[0]?.geometry?.coordinates)
};
