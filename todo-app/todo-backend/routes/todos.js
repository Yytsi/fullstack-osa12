const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();

const { getAsync, setAsync } = require("../redis");
const { get } = require("mongoose");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  const todosCount = await getAsync("todos_count");
  await setAsync("todos_count", todosCount ? parseInt(todosCount) + 1 : 1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  try {
    req.todo.text = req.body.text;
    req.todo.done = req.body.done;
    await req.todo.save();
    res.send(req.todo);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.use("/:id", findByIdMiddleware, singleRouter);
// singleRouter.use(findByIdMiddleware);

module.exports = router;
