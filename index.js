const express=require("express");
const app=express()
app.use(express.json())

courses=[
{id:1,course:'python'},
{id:2,course:'nodejs'},
{id:3, course:'Jav'}
]
logger=function(req,res,next){
    console.log(req.url);
    next();
}
app.use(logger)

app.get('/',(req,res)=>{
    res.send("Hello World!")
    res.end()
});
app.get('/api/courses',(req,res)=>{
 res.send(courses);

});
app.get('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=> c.id===parseInt(req.params.id))
    if(!course){
        res.status(404).send(`The Course with the id ${req.params.id} is not found`)
    }
    res.send(course)
})

app.post('/api/courses',(req,res)=>{
    console.log(req)
 const course={
     id: courses.length+1,
     course:req.body.name
 }
 courses.push(course)
 res.send(course)
})


const PORT=process.env.PORTNO||3000
app.listen(PORT,()=> {console.log(`Listening to port ${PORT}`)});
   