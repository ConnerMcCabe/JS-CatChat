const express = require('express');

const app = express();

app.get('/', (req, res) =>{
    res.json({
        message: 'heard numba 2'
    })
})

app.listen(3000, () =>{
    console.log('listening on http://localhost:3000')
})