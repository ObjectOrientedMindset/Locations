import express from "express";
import cors from "cors";
import axios from "axios";
// Google Maps API Key
const API_KEY = "lCbm1G1ZrMPPO34pi9paPAoO0D3WZ8p1";
const BASE_URL = 'https://api.tomtom.com/search/2/nearbySearch/.json';
const app = express();
// Parse JSON requests
app.use(express.json());
app.use(cors());
app.post("/api/location", async (req, res) => {
    const { lat, lng, rds } = req.body;
    try {
        const response = await findNearbyPlaces(lat, lng, 'restaurant');
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});
async function findNearbyPlaces(latitude, longitude, category) {
    const params = {
        lat: latitude,
        lon: longitude,
        limit: 100,
        radius: 1000,
        categorySet: '7315',
        view: 'Unified',
        key: API_KEY,
    };
    try {
        const response = await axios.get(BASE_URL, { params });
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error:', error);
        return null;
    }
}
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
