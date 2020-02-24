const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.json({
        message: 'heard numba 2'
    })
});

function isValid(message) {
    return message.name && message.name.toString().trim() !== "" && 
        message.content && message.content.toString().trim() !== "";
}

app.post('/message', (req, res) =>{
    if (isValid(req.body)) {
        //coming soon
    } else {
        res.status(422);
        res.json({
            message: 'sanity check 3'
        })
    }
})
app.listen(3000, () =>{
    console.log('listening on http://localhost:3000')
})