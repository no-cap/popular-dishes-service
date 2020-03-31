const mysql = require('mysql');

const connection = mysql.createConnection(
    {
        host: "172.40.1.1",
        user: "root",
        password: "password",
        database: "PopularDishesList",
        port: 3306
    }    
);


connection.connect(() => {
    console.log('Connected to the root at PopularDishesList Database')
})


module.exports = connection;
