let db=
{
	host:'localhost',
	user:'priya',
	password:'priya',
	database:'apple',
	port:3306
}

const mysql=require("mysql2");
const conn=mysql.createConnection(db);
const express = require('express');
const app = express();
/*const cors = require('cors');
app.use(cors());*/
app.listen(360, function () {
    console.log("server listening at port 360...");
});
const bodyParser = require('body-parser');
app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not
/*var result;

app.post('/poc1', function (req, res) {
	
		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
    	var xyz ={ v1:37, v2:35};
        res.send(xyz);
    });*/

// Getting details of book using bookid
app.get('/getDetail', function (req, res) {
    
	let input=req.query.bookid; //input from data(ajax)

	let output={status:false, bookdetails:{bookid:0, bookname:"", price:0}};

	conn.query('select bookname, price from book where bookid=?',[input],
	(error,row)=>
	{
		if(error)
		{
			console.log(error);
		}
		else
		{
			if(row.length>0)
			{
				output.status=true;
				console.log(row);
				output.bookdetails=row[0];
			}
		}
		console.log(output);
		res.send(output);// sending response

	});


	});
// updating price of book using bookid
	app.get('/updateDetail', function (req, res) {
    
		let input = { bookid:req.query.bookid, bookname:req.query.bookname, price:req.query.price };//input from data(ajax)
	
		let output={status:false};
		console.log(input.bookid);
	
		conn.query('update book set bookname=?, price=? where bookid=?',[input.bookname, input.price,input.bookid],
		(error,rows)=>
		{
			if(error)
			{
				console.log("error");
				console.log(error);
			}
			else
			{
				if(rows.affectedRows>0)
				{
					output.status=true;
					console.log(rows);
					console.log("bookdetails updated");
				}
				else{
					console.log("Cannot update because bookid not found");
				}
			}
			console.log(output);
			res.send(output);// sending response
	
		});
	
	
		});




