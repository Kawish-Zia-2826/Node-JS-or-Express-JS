// const express = require("express");
import  express from "express"
const app = express();
app.listen(3000)
app.get("/",(req,res)=>{
  res.json({name:"kawish"})
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.set('view engine','ejs')
// app.get("/about",(req,res)=>{

//   res.redirect('/user')
// })

// app.set('view engine','ejs')

// app.get("/user",(req,res)=>{res.send("hires.redirect('path');")})
// app.get("/back",(req,res)=>{res.redirect('..')})


// app.get("/about/:userID-:name",(req,res)=>{res.send(req.params)})

// app.get('/html',(req,res)=>{res.render('html')})
// app.get('/html2',(req,res)=>{res.render('html2')})
// app.get('/download',(req,res)=>{res.download(__dirname+'/c indexx.pdf','image.png')})
// app.get('/detail',(req,res)=>{res.send(req.query)})

// app.get('/err',(req,res)=>{
//   // res.write("sfd")
//   // res.end()

// console.log(res.headersSent);
// // res.status(200).send("true");
// // console.log(res.headersSent);
// res.set('a',"this is sope");
// console.log(res.get('a'));
// res.send("work")


// })


// app.post('/post',(req,res)=>{res.send(req.body)})
// app.get('/post',(req,res)=>{res.send(req.protocol)})
app.post('/post',(req,res)=>{
// if(req.accepts('html')){
// res.send("<h1>hi</h1>")
// }else if(req.accepts("json")){
//   res.send({"nmae":"kawish"})

// }else if(req.accepts("xml")){
//   res.send("<message>this is xml</message>")
// }else{
//   res.send("nothing suupot")
// }

// res.send(req.get("host"))

if(req.is('application/json')){
  res.send("is valid")
}else if (req.is('text/html')){
res.send("is html")
}else{
  res.send("not supported")
}

})

app.get("/ejs",(req,res)=>{
  var list = ['name','abdsfd','dsf']
  res.render(
    'ejs'
    ,{
      name:"kawihs",
      message:"thi is message",
      list
    })
})



