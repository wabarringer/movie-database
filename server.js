const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "movies_db",
  },
  console.log(`Connected to the movies_db database.`)
);

app.get("/api/movies", (req, res) => {
  db.query(`SELECT * FROM movies`, function (err, results) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(results);
    }
  });
});

app.get("/api/reviews", (req, res) => {
  db.query(
    `SELECT * FROM movies LEFT JOIN reviews ON movie_id=movies.id`,
    function (err, results) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(results);
      }
    }
  );
});

app.post("/api/movies", (req, res) => {
  db.query(
    `INSERT INTO movies (movie_name) VALUES ("Avatar")`,
    function (err, results) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(results);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
