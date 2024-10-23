import geocoding from "npm:@mapbox/mapbox-sdk/services/geocoding.js";

const client = geocoding({ accessToken: Deno.env.get("MAPBOX_TOKEN") });

export default {
  search: async location =>
    client
      .forwardGeocode({ limit: 1, query: location })
      .send()
      .then(response => response?.body?.features[0]?.geometry?.coordinates)
};
