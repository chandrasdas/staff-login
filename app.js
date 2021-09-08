const express = require('express');

const app = express();
const PORT = 3000;

app.listen(PORT,()=>{ console.log("This web-app is listening on port "+PORT) } );

app.get('/',(req,res) => {
    res.send("<h1>this is a barebone node-js express app !</h1>");
});