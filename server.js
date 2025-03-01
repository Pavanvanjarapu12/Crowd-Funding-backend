const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON data

// Sample in-memory storage for campaigns
let campaigns = [
    { id: 1, title: "Save the Rainforests", description: "Plant trees worldwide", goalAmount: 50000, fundsRaised: 12000 },
    { id: 2, title: "Support Local Farmers", description: "Help small farmers grow", goalAmount: 30000, fundsRaised: 5000 }
];

// ✅ GET all campaigns
app.get("/api/campaigns", (req, res) => {
    res.json(campaigns);
});

// ✅ CREATE a new campaign
app.post("/api/campaigns", (req, res) => {
    const { title, description, goalAmount } = req.body;
    const newCampaign = {
        id: campaigns.length + 1,
        title,
        description,
        goalAmount,
        fundsRaised: 0
    };
    campaigns.push(newCampaign);
    res.status(201).json(newCampaign);
});

// ✅ FUND a campaign (Donate)
app.post("/api/campaigns/:id/fund", (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;
    const campaign = campaigns.find(c => c.id === parseInt(id));

    if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
    }

    campaign.fundsRaised += amount;
    res.json(campaign);
});

// ✅ DELETE a campaign
app.delete("/api/campaigns/:id", (req, res) => {
    campaigns = campaigns.filter(c => c.id !== parseInt(req.params.id));
    res.json({ message: "Campaign deleted" });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
