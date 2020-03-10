const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require("express-rate-limit");

const app = express();

const db = monk('localhost/chatbox')
const messages = db.get('messages')
const filter = new Filter()

app.use(cors());
app.use(express.json());


app.get('/', (req, res) =>{
    res.json({
        message: 'sanity check 2'
    })
});

app.get('/messages', (req, res) => {
    messages
        .find()
        .then(messages => {
            res.json(messages);
        })
})

function isValid(message) {
    return message.name && message.name.toString().trim() !== "" && 
        message.content && message.content.toString().trim() !== "";
}

app.use(rateLimit({
    windowMs: 3 * 1000,
    max: 1
}));

app.post('/messages', (req, res) =>{
    if (isValid(req.body)) {
        const message = {
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        };
        messages
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