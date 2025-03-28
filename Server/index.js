const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoDb = require("./db");
const cookieParser = require('cookie-parser');
const MongoDBSession = require('connect-mongodb-session')(session);


const app = express();
const port = 5000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// MongoDB connection
mongoDb();


// Enable CORS with credentials
app.use(cors({
  origin: "http://localhost:3000", // Frontend URL
  methods: ["POST", "GET"],
  credentials: true, // Allow credentials (cookies) to be sent with requests
}));

// Security headers for cross-origin resource sharing
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});


const store = new MongoDBSession({
  uri: "mongodb+srv://gofood:EEdKc3fo5UctxhqZ@cluster0.zpusfds.mongodb.net/gofoodmern?retryWrites=true&w=majority",
  collection: 'mySessions',
  expires: 86400
})

// Session configuration
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400 * 1000,
  },
  store: store,
}));


// Routes
app.use('/api', require("./Routes/Createuser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/FavFood"));
app.use('/api', require("./Routes/Address"));

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
