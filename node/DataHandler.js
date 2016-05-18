/**
 *   @author Bates, Howard [ hbates@northmen.org ]
 *   @version 0.0.1
 *   @summary http server: XX || Created: X.XX.2016
 *   @todo Everything!
 */

"use strict";

const DATASTORE = require('nedb'),
	DB = new DATASTORE({ filename: './data/workorder_db.json', autoload: true });
     this.data = [];

class DataHandler {
	constructor() {
          DB.loadDatabase();
	}

     addData(data) {
          DB.insert(data);
     }

     queryData(data) {
          DB.find(data);
     }

     loadData(callback) {
          DB.find({}, function(err, docs) {
               callback(docs);
          });
     }
}

module.exports = DataHandler;