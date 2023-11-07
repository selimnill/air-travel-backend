const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = 5000;


const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome To The Backend.!');
});

// Database Connection


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lqq779x.mongodb.net/?retryWrites=true&w=majority`;

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
    const bookingsCollection = client.db('air-travel-booking').collection('bookingsCollection');




    app.get('/bookings-info', async(req, res) => {
        const query = {};
        const bookings = await bookingsCollection.find(query).toArray(); 
        console.log(bookings);
        res.send(bookings);
    })

    app.get('/bookings/:id', async(req, res) => {
      const id = req.params.id;
      const query = ({_id: new ObjectId(id)});
      const findId = await bookingsCollection.findOne(query);
      res.send(findId);
    })
    
    
  } finally {

  }
}
run().catch(console.dir);









app.listen(port, () => {
    console.log(`Back End is Running on port ${port}`);
})
