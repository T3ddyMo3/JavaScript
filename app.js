const express = require('express');

const app = express();

app.get(`/`, (req, res)=>{
    res.send(`hey welcome nice to meet you`);
});

app.get(`/about`, (req,res)=>{
    res.send(`Damn i kinda know whats going on!!!!`);
});

const port =  (process.env.PORT || 4000);
app.listen(port, ()=> console.log(`lising on ${port}`));