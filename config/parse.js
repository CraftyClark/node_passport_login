const express = require('express');
const mongoose = require('mongoose');
const Parser = require('rss-parser');



module.exports = {
    parseLink: async function(value){

        let parser = new Parser();

        (async () => {
 
            let feed = await parser.parseURL('https://www.reddit.com/.rss');
            console.log(feed.title);
           
            feed.items.forEach(item => {
              console.log(item.title + ':' + item.link)
            });
           
          })();

        // Feed.load(value, function(err, rss){
        //     // 
        //     //console.log(rss);
        // });

        // -------

        // let parser = new Parser();

        // (async (value) => {

        //     console.log('inside async');
        //     let feed = await parser.parseURL(value);
        //     console.log(feed.title);
          
        //     feed.items.forEach(item => {
        //       console.log(item.title + ':' + item.link)
        //       console.log('inside feed items for each');
        //     });
    
        //   });

        ///---------------------
        // console.log('++value: ' + value);
        // let parser = new Parser();

        // const feedRequests = value.map(feed => {
        //     let temp = parser.parseURL(feed);
        //     console.log(temp);
        //     return temp;
        // // return parser.parseURL(feed);
        // })

        // Promise.all(feedRequests).then(response => {
        //     // res.json(response);
        // callback(null, {
        //     statusCode: 200,
        //     body: JSON.stringify(response)
        // })
        // })




    // parseLink: function(value){

    //     let parser = new Parser();
        
    //     (async () => {
        
    //     let feed = await parser.parseURL(value);
    //     console.log(feed.title);
        
    //     feed.items.forEach(item => {
    //         console.log(item.title + ':' + item.link)
    //     });
    //     return feed.title;
    //     });

        
    // }


    }
};