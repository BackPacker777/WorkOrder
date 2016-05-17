/**
 *   @author Bates, Howard [ hbates@northmen.org ]
 *   @version 0.0.1
 *   @summary http server: XX || Created: X.XX.2016
 *   @todo Everything!
 */

"use strict";

const DATASTORE = require('nedb'),
	DB = new DATASTORE({ filename: './data/workorder_db.json', autoload: true });

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

     loadData() {
          DB.find({}, function(err, leData) {
               return leData;
          });
     }
}

module.exports = DataHandler;