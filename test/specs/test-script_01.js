
const assert  = require('assert');
var dbc       = require('../../config/db');
var db        = require('../../index');


describe('sample databse testing script', function () {

  it("should executes a SQL select query on mysql database and fetch the result set", function (done){
    var sql = 'SELECT * FROM emp_info where emp_name = "Amiya"';
    db.execute(dbc.mysql, sql, function(results){
      console.log(results);
      assert.equal(results.rows[0].emp_id, 1001)      //mocha style assertions
      done();
    });
  });

  it("should insert a SQL select statement on mysql database and fetch the result set", function (done){
    var sql = 'INSERT INTO emp_info (emp_id, emp_name, emp_dept, location) VALUES (1009, "Chandra", "IT", "CA")';

    db.execute(dbc.mysql, sql, function(){
      db.execute(dbc.mysql, 'SELECT * FROM emp_info where emp_id = 1009', function(results){
        console.log(results);
      });
      done();
    });
  });

});
