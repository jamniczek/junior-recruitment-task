const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const { Todo } = require('./models/todo');
const { mongoURI } = require('./config/keys');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());
app.options('/todos/:id', cors()) 


var allowCrossDomain = function(req, res, next) {
  if ('OPTIONS' == req.method) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomain);

mongoose.connect(mongoURI, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));// eslint-disable-line

app.get('/todos', (req, res) => {
  Todo.find()
  .then((todos) => {
    res.send(todos);
  })
  .catch((err) => {
    res.send(err);
  });
});

app.post('/todos', (req, res) => {
  const someTodo = new Todo({
    content: req.body.content,
    finished: req.body.finished,
  });
  Todo.find({ content: someTodo.content }).then((todos) => {
    if (todos.length === 0) {
      someTodo.save()
      .then((todo) => {
        res.send(todo);
      })
      .catch((err) => {
        res.send(err);
      });
    } else {
      res.send({ message: 'such todo already exsts!' });
    }
  });
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndRemove(id)
  .then((todo) => {
    res.send(todo);
  })
  .catch((err) => {
    res.send(err);
  });
});

app.patch('/todos/:id', (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  Todo.findByIdAndUpdate(id, { $set: { finished: status } }, { new: true })
  .then(() => {
    res.send();
  })
  .catch((err) => {
    res.send(err);
  });
});

app.listen(PORT, () => {
  console.log('app running');// eslint-disable-line
});
