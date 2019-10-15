const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { parseLink } = require('../config/parse');

// Welcome page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard page
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    let feedRequests = req.user.urls.map(function(o) {
        return parseLink(o.link);
    });

    Promise.all(feedRequests).then((data) => {
        res.render('dashboard', {
            name: req.user.name,
            urls: req.user.urls,
            feeds: data,
        })
    })
});

module.exports = router;