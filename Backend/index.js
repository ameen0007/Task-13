const express = require("express");
const app = express();
const { checkwanteditems } = require("./utlities");

const cors = require("cors");
app.use(cors());
app.use(express.json());
let todos = [];

app.get("/api/todo", (req, res) => {
  res.json(todos);
  console.log(todos, "in get");
});

app.post("/api/todo", (req, res) => {
  const { userInputData } = req.body;
  console.log(req.body, "body");

  const wanteddata = ["userInputData"];

  checkwanteditems(wanteddata, req.body, res);

  console.log(wanteddata, "==wanteddatafunc");
  const newtodo = {
    TodoList: userInputData,
    id: Date.now(),
    status: false,
  };
  todos.push(newtodo);
  res.json(todos);
  console.log(newtodo, "====inpost");
});

app.put("/api/todo", (req, res) => {
  const { editedInputValues, TodoId } = req.body;

  const wanteddata = ["editedInputValues", "TodoId"];

  checkwanteditems(wanteddata, req.body, res);

  const index = todos.findIndex((todo) => todo.id === TodoId);

  todos[index].TodoList = editedInputValues[TodoId];
  res.json(todos);
});

app.put("/api/todos/complete", (req, res) => {
  const { TodoId } = req.body;
  const wanteddata = ["TodoId"];
  checkwanteditems(wanteddata, req.body, res);
  const index = todos.findIndex((todo) => todo.id === TodoId);

  todos[index].status = !todos[index].status;

  console.log(todos, "===after status");
  res.json(todos);
});

app.delete("/api/todo", (req, res) => {
  const { todosArray, TodoId } = req.body;
  const wanteddata = ["todosArray", "TodoId"];
  checkwanteditems(wanteddata, req.body, res);
  const newarray = todosArray.filter((data) => data.id !== TodoId);

  todos = newarray;
  res.json(todos);
  console.log(todos, "==main todos array");
});

app.listen(4000, () => {
  console.log("server started");
});
