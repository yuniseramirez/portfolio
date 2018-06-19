var express = require("express");
var app = express();
var port = 8000;
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
var usage = bodyParser.urlencoded({extended: true});
app.set('view engine', 'ejs');
const { Pool, Client } = require('pg')
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'postgres',
	password: '1001',
	port: 8080,
});


let newObj = {};

app.get("/", (req, res) =>{

	pool.query('SELECT * FROM searchhistory', (req2, res2) => {
    
    newObj = res2.rows;

    res.render('index', {

    });


  });
});

app.post('/post', (req, res) => {
	console.log(req.body);
  var inserQuery = {
    text: 'INSERT INTO searchhistory(product, price) VALUES($1, $2)',
    values: [req.body.product, req.body.price]
  }

  

  pool.query(inserQuery, (req, res) => {
    console.log('Data inserted to database');
  });

  res.redirect('/');

});


app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});