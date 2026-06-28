const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");

const app = express();
const PORT = 5000;
const DB_FILE = "./db.json";

app.use(cors());
app.use(express.json());

const readDB = async () => fs.readJson(DB_FILE);
const writeDB = async (data) => fs.writeJson(DB_FILE, data);

// GET all todos
app.get("/todos", async (req, res) => {
  const data = await readDB();
  res.json(data);
});

// GET single todo
app.get("/todos/:id", async (req, res) => {
  const data = await readDB();
  const todo = data.find(t => t.id === req.params.id);
  res.json(todo || {});
});

// CREATE todo
app.post("/todos", async (req, res) => {
  const data = await readDB();

  const newTodo = {
    id: Date.now().toString(),
    title: req.body.title,
    description: req.body.description || "",
    completed: false,
    status: "Pending"
  };

  data.push(newTodo);
  await writeDB(data);

  res.json(newTodo);
});

// UPDATE todo (IMPORTANT FOR STATUS CHANGE)
app.put("/todos/:id", async (req, res) => {
  let data = await readDB();

  const index = data.findIndex(t => t.id === req.params.id);

  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    await writeDB(data);
    return res.json(data[index]);
  }

  res.status(404).json({ error: "Not found" });
});

// DELETE todo
app.delete("/todos/:id", async (req, res) => {
  let data = await readDB();
  data = data.filter(t => t.id !== req.params.id);
  await writeDB(data);

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log("🔥 Server running on http://localhost:" + PORT);
});