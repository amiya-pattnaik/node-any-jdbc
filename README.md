## node-any-jdbc

This module connects to any RDBMS such as Oracle, Vertica, Teradata, MySql etc.  and executes any sql statement on target database. You just need the the Xjdbc.jar of your target RDBMS to bridge the connection. One common method `execute` for all purpose.

## Installation

JDK: Install JDK 1.8. All the tests work out of the box on a 1.8+ JVM. JDK is require just as a bridge between Node.JS and your target RDBMS. Install if your machine does not have JDK 1.8+.

Xcode: MAC users, ensure you have Xcode installed. This is required for compiling native addon modules for Node.js.

#### Windows Build tool. (follow below step if your target OS is Windows)
```
Although it is not necessary, but before you install the windows specific build tools, make sure you uninstall other `microsoft visual c++ 2005 redistributable` software from the machine. You can install it afterwards if require a specific version for other purpose.

💡 [Windows Vista / 7 only] requires .NET Framework 4.5.1 (Currently not installed automatically by this package) Download and install it from [here](https://www.microsoft.com/en-us/download/details.aspx?id=40773)

Install all the required tools and configurations using Microsoft's windows-build-tools from an elevated PowerShell or CMD.exe (run as Administrator).

Note: If you are behind a specific corporate proxy, then you need to set some environment variables: ` setx NODE_TLS_REJECT_UNAUTHORIZED 0 `

npm install -g node-gyp

npm install -g --add-python-to-path --production windows-build-tools

Wait for build tool to be installed and once done exit from that shell, launch another elevated PowerShell or CMD.exe (run as Administrator)

npm config set msvs_version 2015

```
### Post Installation

MAC OSX users, there should not be any issues in installing all the dependent modules particularly `jdbc` modules. If jdbc module is not installed under the `node_modules` folder then you may require to install build tool `node-gyp`  which can be found [here](https://www.npmjs.com/package/node-gyp) and follow the above step again.

Windows users, if the Microsoft's windows-build-tools are installed properly then you may see `jdbc` module under the `node_modules` folder. If jdbc module is not available after installation then there might be some problem with the Microsoft's windows-build-tool. Check the console log for the specific error. Follow the steps again or refer to the document [here](https://github.com/felixrieseberg/windows-build-tools) and [also here](https://www.npmjs.com/package/node-gyp) to install it manually if require.

## Example

```
var db = require('node-any-jdbc');

//example of Oracle connection string
oracleCogfig = {
  libpath: './config/drivers/oracle/ojdbc7.jar',
  drivername: 'oracle.jdbc.driver.OracleDriver',
  url:  'jdbc:oracle:thin:QA/password123@//abc-test.corp.int:1527/stage1',
  // uri: 'jdbc:oracle:thin://abc-test.corp.int:1527/stage1',
  // user: 'QA',
  // password: 'password123',
};

//example of mysql connection string
var cogfig = {
  libpath: './config/drivers/mysql/mysql-connector-java-5.0.8-bin.jar',
  drivername: 'com.mysql.jdbc.Driver',
  uri: 'jdbc:mysql://localhost/employee_database',
  user: 'root',
  password: 'root123'
};

//example of sample select query to fetch the result set

var sql = 'SELECT * FROM emp_info where emp_id = "1001"';
db.execute(cogfig, sql, function(results){
  console.log(results);
});

//example of create TABLE

db.execute(cogfig, 'CREATE TABLE test(ID INTEGER, TEXT VARCHAR(255)), function(err){
  console.log(err);
  assert.equal(err, null);

});

//example of INSERT TABLE

var sql = 'INSERT INTO emp_info (emp_id, emp_name, emp_dept, location) VALUES (1009, "Chandra", "IT", "CA")';
db.execute(cogfig, sql, function(){
  db.execute(cogfig, 'SELECT * FROM emp_info where emp_id = 1009', function(results){
    console.log(results);
  });
});

For more info on how to use xjdbc.jar, db connection string and example etc. please refer to the sample example under /config and /test/specs/ on github.com/amiya-pattnaik/node-any-jdbc

```

## Contribution

Create a fork of the project into your own repository. Make all your necessary changes and create a pull request with a description on what was added or removed and details explaining the changes in lines of code. If approved, project owners will merge it.

## Licensing

MIT
