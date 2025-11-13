const express = require('express');
const router = express.Router();

router.post('/chat', async (req, res) => {
    const userMessage = req.body.message || "No message received";

    return res.json({
        reply: "Your backend is working! You said: " + userMessage
    });
});

module.exports = router;
