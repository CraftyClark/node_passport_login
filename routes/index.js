const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { parseLink } = require('../config/parse');

// Welcome page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard page
router.get('/dashboard', ensureAuthenticated, (req, res) => {

    let temp = req.user.urls;
    let temp_array = [];
    temp.forEach(async function(o) {
        let temp_url = (o.link); 
        await parseLink(temp_url);
    });

    res.render('dashboard', {
        name: req.user.name,
        urls: req.user.urls
    })
});

module.exports = router;