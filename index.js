const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xljmjxf.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const usersCollection = client.db('house-hunterDB').collection('users');
const bookingCollection = client.db('house-hunterDB').collection('bookings');
const apartmentCollection = client
  .db('house-hunterDB')
  .collection('all-apartments');

// post user info
app.post('/users', async (req, res) => {
  const user = req.body;
  result = await usersCollection.insertOne(user);
  res.send(result);
});

// post new apartment
app.post('/new-apartment', async (req, res) => {
  const newApartment = req.body;
  const result = await apartmentCollection.insertOne(newApartment);
  res.send(result);
});
// get all apartments
app.get('/all-apartments', async (req, res) => {
  const result = await apartmentCollection.find().toArray();
  res.send(result);
});
// get all apartments
// app.get('/all-apartments', async (req, res) => {
//   const query = req.query;
//   const page = query.page;
//   const pageNumber = parseInt(page);
//   const perPage = 10;
//   const skip = pageNumber * perPage;

//   const result = await apartments.find().skip(skip).limit(perPage).toArray();
//   const count = await apartments.countDocuments();
//   res.send({ result, count });
// });

// get details by id
app.get('/apartment/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const query = { _id: new ObjectId(id) };
  const result = await apartmentCollection.findOne(query);
  res.send(result);
});

// post all bookings
app.post('/bookings', async (req, res) => {
  const user = req.body;
  result = await bookingCollection.insertOne(user);
  res.send(result);
});

// get my bookings data
app.get('/bookings', async (req, res) => {
  let query = {};
  if (req.query.email) {
    query = { email: req.query.email };
  }
  const result = await bookingCollection.find(query).toArray();
  res.send(result);
});

// get all booking data
app.get('/all-bookings', async (req, res) => {
  const result = await bookingCollection.find().toArray();
  res.send(result);
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('your server is running');
});

app.listen(port, () => {
  console.log(`your server is running on port ${port}`);
});
