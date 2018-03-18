var express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
var app=express();
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/hack1');
finalArr=[];
var Schema=mongoose.Schema;
var userSchema=new Schema({
  name:String,
  github:String,
  linkedin:String
});
var user=mongoose.model("user",userSchema);
app.use(cors());
app.use(express.static(__dirname+"/public"));
app.get("/api/:address",function(req,res){
res.sendFile(__dirname+"/views/index.html");
});
app.post("/api/submit",function(req,res){
    var insert=new user({
        "name":req.query.name,
        "github":req.query.gb,
        "linkedin":req.query.lin
    });
    insert.save();
    res.send("done");
});
app.get("/list",function(req,res){
    user.find({},function(err,doc){
        console.log(doc);
    if(err) throw err;
    res.send(JSON.stringify(doc));
    });
  });
  app.get("/result",function(req,res){
      var checkArr=undefined;
      
      checkArr=req.query.select.split(",");
      console.log(checkArr[0]);
      for(var i=0;i<checkArr.length;i++){
          user.findOne({"github":checkArr[i]},function(err,doc){
              console.log(doc);
           if(err) throw err;
           if(doc){
   
               finalArr.push(doc);
           }

          });

      }
    res.send("1");
  });
  app.get("/ans",function(req,res){
   res.send(JSON.stringify(finalArr));
  });
app.listen(5000);