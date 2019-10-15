const express = require('express');
const mongoose = require('mongoose');
const Parser = require('rss-parser');



module.exports = {
    parseLink: async function(value){

        let parser = new Parser();

        (async () => {
 
            let feed = await parser.parseURL(value);
            console.log(feed.title);
           
            feed.items.forEach(item => {
              console.log(item.title + ':' + item.link)
            });
           
          })();


    }
};