const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const todosRouter = require("./routes/todos");
const { getAsync } = require("./redis");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/todos", todosRouter);
app.use("/statistics", async (req, res) => {
  const todosCount = await getAsync("todos_count");
  res.send({
    added_todos: todosCount ? parseInt(todosCount) : 0,
  });
});

module.exports = app;
