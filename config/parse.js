const express = require('express');
const mongoose = require('mongoose');
const Parser = require('rss-parser');

let parser = new Parser();

module.exports = {
  parseLink: async function(value){
      let feed = await parser.parseURL(value);
      return feed;
  }
};
