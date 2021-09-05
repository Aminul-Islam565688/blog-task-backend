const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const app = express()



app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 7575


const uri = "mongodb+srv://test:test@cluster0.aifw0.mongodb.net/Blogger?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



client.connect(err => {
    const reactCollection = client.db("Blogger").collection("Reaction");
    // perform actions on the collection object
    app.get('/react:reaction', (req, res) => {
        const reaction = req.params.reaction
        const body = req.body.react
        console.log(reaction, body)
        reactCollection.insertOne({ react: 'happy' })
            .then((result) => {
                res.send(result.insertedCount > 0)
            })
    })


    console.log('MongoDB is Connected');
});






app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})