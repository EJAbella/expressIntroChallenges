var express = require('express');
const fs = require('fs')
var app = express();
var port = process.env.PORT || 8000;

let storage = JSON.parse(fs.readFileSync(`${__dirname}/storage.json`, 'utf8'))
let parseStorage = storage.map((obj) => JSON.parse(obj))

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

app.post('/create/:name/:age', (req, res) => {
  let user = {
    id: storage.length+1,
    name: req.params.name,
    age: req.params.age
  }
  let userString = JSON.stringify(user)
  storage.push(userString)
  fs.writeFileSync(`${__dirname}/storage.json`, JSON.stringify(storage))
  res.json(user)
})

app.get('/', (req, res) => {
  res.json(parseStorage)
})

app.get('/:id', (req, res) => {
  let paramId = req.params.id
  let result;
  result = parseStorage.filter((obj) => obj.id == paramId)
  result.length > 0 ? res.json(result) : res.sendStatus(400)
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
