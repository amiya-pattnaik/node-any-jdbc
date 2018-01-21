//DBTester functions

/***************************************************************************************/


var anyDB     = require('any-db');
var anyDBJDBC = require('any-db-jdbc');

module.exports = {

  /***************************************************************************************/
  /**

  connect
  Opens a database connection and returns a handle to  that system.
  SQL statements can be submitted to the database.
  * @param {*} config - db connection strings

  **/
  /****************************************************************************************/

  connect : function (config, callback){
    anyDBJDBC.registerConfig(config);
    var connection = anyDB.createConnection(config.url, function (err){
      if(err){
        return console.error('** error in connecting database  ** ', err);
      } else { return callback(connection); }
    });
  },


  /***************************************************************************************/
  /**
   * method execute(config, sqlQuery, callback)
   * execute a SQL query on any RDBMS and gives query results set
   * @param {*} config - db connection strings
   * @param {*} sqlQuery - sql queries to execute
   * @param {callback} callback function that contains query results and gets called when the command finishes
   **/
  /****************************************************************************************/

  execute : function (config, sqlQuery, callback){
    this.connect(config, function(connection){
      connection.query(sqlQuery, function (err, rows) {
        connection.end(function (error) {});
        if (err) {
          return console.error('** error in executing query ** ', err);
        }
        return callback(rows);
      }); //end of exec block
    });//end of connect block
  },



} // end of module
