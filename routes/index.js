var express = require('express');
var router = express.Router();
var mysql=require('./mysql.js');
mysql.connect();
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
//查看
router.get('/',function (req, res, next) {
    mysql.query("select * from mode",function (err,result) {
        if(err){
            console.log(err);
            res.end();
        }else{
            res.render('index',{result:result});
        }
    })
})
//添加
router.get('/add',function (req,res) {
    res.render('add');
})
router.get('/addcon',function (req,res) {
   var mname=req.query.mname;
   var msex=req.query.msex;
   var mage=req.query.mage;
   mysql.query(`insert into mode (mname,msex,mage) values ('${mname}','${msex}','${mage}')`,function (err) {
       if(err){
           console.log(err);
           res.end();
       }else{
           res.render("message",{message:"添加成功"});
       }
   })
})

//删除
router.get("/del/:id",function (req,res) {
    var id=req.params.id;
    console.log(id);
    mysql.query("delete from mode where mid = "+id,function (err) {
        if(err){
            console.log(err);
            res.end();
        }else{
            res.render("message",{message:"删除成功"});
        }
    })
})
//修改
router.get("/update/:mid&&:mname&&:msex&&:mage",function (req,res) {
    var mid=req.params.mid;     //params 多用来接收在url路径中的数据
    var mname=req.params.mname;
    var msex=req.params.msex;
    var mage=req.params.mage;
    res.render("update",{mid:mid,mname:mname,msex:msex,mage:mage});
})
router.get("/updatecon",function (req,res) {
    var mid=req.query.mid;             //query 多用来接收get请求的数据，在url?之后的数据
    var mname=req.query.mname;
    var msex=req.query.msex;
    var mage=req.query.mage;
    console.log(mname);
    mysql.query(`update mode set mname = '${mname}',msex='${msex}',mage='${mage}' WHERE mid = '${mid}'`,function (err) {
        if(err){
            console.log(err);
            res.end();
        }else{
            res.render("message",{message:"修改成功"});
        }
    });
})

module.exports = router;
