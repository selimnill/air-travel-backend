const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


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
    const paymentsCollection = client.db('air-travel-booking').collection('payments');




    app.get('/bookings-info', async(req, res) => {
        const query = {};
        const bookings = await bookingsCollection.find(query).toArray(); 
        res.send(bookings);
    })

    app.get('/bookings-details/:id', async(req, res) => {
      const id = req.params.id;
      const query = ({_id: new ObjectId(id)});
      const findId = await bookingsCollection.findOne(query);
      res.send(findId);
    })

    app.post('/create-payment-intent', async(req, res) => {
      const booking = req.body;
      console.log(booking);
      const price = booking.price;
      const amount = price * 100;

      const paymentIntent = await stripe.paymentIntents.create({
        currency:'usd',
        amount: amount,
        "payment_method_types": [
            "card"
        ]
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      })
    });

    app.post('/payments', async (req, res) =>{
      const payment = req.body;
      console.log(payment);
      const result = await paymentsCollection.insertOne(payment);
      const id = payment.bookingId
      const filter = {_id: new ObjectId(id)}
      const updatedDoc = {
          $set: {
              paid: true,
              transactionId: payment.transactionId
          }
      }
      const updatedResult = await bookingsCollection.updateOne(filter, updatedDoc)
      res.send(result);
  })
    
    
  } finally {

  }
}
run().catch(console.dir);









app.listen(port, () => {
    console.log(`Back End is Running on port ${port}`);
})
