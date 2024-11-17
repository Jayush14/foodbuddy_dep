const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoDb = require("./db");

const app = express();
const port = 5000;

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["POST", "GET"],
  credentials: true
}));

// Add middleware for COOP and COEP headers
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

mongoDb();

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,path: '/',domain: 'localhost', httpOnly: false,sameSite: 'None', maxAge: 1000 * 60 }
}));

app.use(express.json());
app.use('/api', require("./Routes/Createuser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/FavFood"));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
