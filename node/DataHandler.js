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

     loadData(callback) {
          DB.find({}, (err, docs) => {
               if (docs.length != null) {
                    callback(docs);
               }
          });
     }

     updateData(data) {
          console.log(`UPDATING`);
          DB.update({ _id: data.id }, { building: data.building
               , roomNumber: data.roomNumber
               , submitter: data.submitter
               , problemDesc: data.problemDesc
               , assigned: data.assigned
               , completed: data.completed
               , status: data.status
          }, { upsert: true });
     }

     addData(data) {
          console.log(`ADDING`);
          DB.insert(data);
      }

     /*queryData(data) { // keep as a reference for method below
          const THAT = this; //change to arrow function later
          // console.log(`DataHandler output: ${data.id}`);
          DB.findOne({ _id: data.id }, function(err, docs) {
               if (docs == null) {
                    THAT.addData(data);
               } else {
                    THAT.updateData(data);
               }
          });
     }*/

     /*removeData(data) {
          DB.remove({ _id: data.id }, {});
     }*/

     queryData(data) {
          
          DB.findOne({ _id: data.id }, (err, docs) => {
               if (docs == null) {
                    this.addData(data);
               } else {
                    this.updateData(data);
               }
          });
     }
}

module.exports = DataHandler;