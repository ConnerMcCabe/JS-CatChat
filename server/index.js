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
        message: 'sanity check 2'
    })
});

app.get('/message', (req, res) => {
    message
        .find()
        .then(message => {
            res.json(message);
        })
})

function isValid(message) {
    return message.name && message.name.toString().trim() !== "" && 
        message.content && message.content.toString().trim() !== "";
}

app.post('/message', (req, res) =>{
    if (isValid(req.body)) {
        const message = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };
        message
            .insert(message)
            .then(createdMessage => {
                res.json(createdMessage)
            })
    } else {
        res.status(422);
        res.json({
            message: 'Hey, type some stuff or this thing no message'
        })
    }
})
app.listen(3000, () =>{
    console.log('listening on http://localhost:3000')
})