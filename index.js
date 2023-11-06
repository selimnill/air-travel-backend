const express = require('express');
const cors = require('cors');
const port = 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();

app.use(cors());
app.use(express.json());



// Database Connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bjthsm0.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    
    
  } finally {

  }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('Welcome To The Backend.!');
})

app.listen(port, () => {
    console.log(`Back End is Running on port ${port}`);
})
