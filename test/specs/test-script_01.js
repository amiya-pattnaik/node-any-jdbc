
const assert  = require('assert');
var dbc       = require('../../config/db');
var db        = require('../../index');


describe('Sample ETL Testing Demo Script_01 --- ', function () {

  it("executes a SQL select query on mysql database, testcase - 1", function (done){
    var sql = 'SELECT * FROM emp_info where emp_name = "Amiya"';
    db.execute(dbc.mysql, sql, function(results){
      console.log(results);
      assert.equal(results.rows[0].emp_id, 1001)      //mocha style assertions
      done();
    });
  });
});
