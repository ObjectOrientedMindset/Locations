const express = require("express");
const cors = require("cors"); // Import the cors middleware
const axios = require("axios");

// Google Maps API Key
const API_KEY = "AIzaSyDnqMMgQPfBaC1tE12tDqYBFMtziBZDvkM";

const app = express();
// Parse JSON requests
app.use(express.json());
app.use(cors());

app.post("/api/location", async (req, res) => {
  const { lat, lng } = req.body;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&key=${API_KEY}`
    );

    const nearbyPlaces = response.data.results.map((place) => ({
      name: place.name,
      address: place.vicinity,
    }));
    console.log(nearbyPlaces);
    res.json(nearbyPlaces);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
