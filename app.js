const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");



const app = express();


let items =[];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", function(req,res){

	//let day = date.getDate();  //Tuesday, June 9
	let day = date.getDay();  // Tuesday

	
	res.render("list", {listTitle: day, newListItems: items});
}); 

app.post("/",function(req,res){
	
	let item = req.body.newItem;

	if(req.body.list === "Work") {
		workItems.push(item);
		res.redirect("/work");
	}
	else{
		items.push(item);  //When  a post req is triggered on our home route it will save the value of newItem entered in textbox to the variable item and it'll redirect to our home route 
		res.redirect("/");
	}
	 
});

app.get("/work",function(req,res){
	res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.post("/work", function(req,res){
	let item = req.body.newItem;
	res.redirect("/work");
})

app.get("/about",function(req,res){
	res.render("about");
})



app.listen(3000,function(){
	console.log("Server started on port 3000");
})