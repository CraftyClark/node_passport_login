const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { parseLink } = require('../config/parse');

// Welcome page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard page
router.get('/dashboard', ensureAuthenticated, (req, res) => { //ensureAuthenticated, parseLink

    let temp = req.user.urls;
    let temp_array = [];
    temp.forEach(function(o) {
        let temp_url = (o.link); //encodeURIComponent
        temp_array.push(temp_url);
        // await parseLink(temp_url);
        // parseLink(o.link.toString);
    });

    console.log('parseLink:');
    async function A(temp_array){
        await parseLink(temp_array);
    }
    A(temp_array);
    //console.log(parseLink(temp_array));


    // temp.forEach(function(o) {
    //     console.log('----parseLink----');
    //     console.log(parseLink(o.link));
    // });


    res.render('dashboard', {
        name: req.user.name,
        urls: req.user.urls
    })
});

module.exports = router;