const express   = require('express')

const app =  express()

app.listen(3000,()=>{
  console.log("route is working");
  
})

app.set('view eingine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))


app.get('/',(req,res)=>{
  res.render('all-post.ejs')
})
app.get('/show-contact',(req,res)=>{
  res.render('show-contact.ejs')
})
app.get('/add-contact',(req,res)=>{
  res.render('add-contact.ejs')
})
app.post('/add-contact',(req,res)=>{
 
})
app.get('/update-contact',(req,res)=>{
  res.render('update-contact.ejs')
})
app.post('/update-contact',(req,res)=>{
  
})
app.get('/delete',(req,res)=>{})









// const express = require('express')
// const app = express()
// app.listen(3000)


// app.use('view engine','ejs')

// app.use(express.static("public"))
// app.use(express.urlencoded({extended:false}))
// app.get('/',(req,res)=>{})
// app.get('/show',(req,res)=>{})
// app.get('/add-contact',(req,res)=>{})
// app.post('/add-contact',(req,res)=>{})
// app.get('/update-contact',(req,res)=>{})
// app.post('/update-contact',(req,res)=>{})


