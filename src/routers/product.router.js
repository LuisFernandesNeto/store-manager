const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {

    res.status().json();
});

router.get('/:id', async (req, res) => {

    res.status().json();
})

module.exports = router;