const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/chatbox')
const message = db.get('message')

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
        const message = {
            name: req.body.name.toString(),
            content: req.body.content.toString()
        };
        message
            .insert(message)
            .then(createdMessage => {
                res.json(createdMessage)
            })
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