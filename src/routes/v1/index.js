const express = require('express');
const router = express.Router();

router.get('/info', (req, res) => {
    return res.json({
        message: "Booking Service v1 is running"
    });
});

module.exports = router;
