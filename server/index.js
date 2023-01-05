const express = require("express");
const sqlite3 = require("sqlite3").verbose();
let sql;
//database connection
const dp =new sqlite3.Database("./test.dp",sqlite3.OPEN_READWRITE,(err) =>{
    if (err) return console.log(err.message);
    else console.log("connected to database");
});

sql='CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY,task,done)';
dp.run(sql);
const PORT = process.env.PORT || 3001;

const app = express();
let todo = [];

app.get("/todos", (req, res) => {
   sql='SELECT * FROM todos';
   dp.all(sql,[],
    (err,rows)=>{if(err) return console.log(err.message);
    rows.forEach((row)=>{console.log(row);});}

);
});
app.delete("/todos/:todoId", (req, res) => {
    var todoId=req.params.todoId;
   
    res.json({ message: todoId});
});

app.put('/todos/:todoId', function (req, res) {
    var todoId=req.params.todoId;
   
    res.json({ message: todoId });
});
app.post('/todos/:task', function (req, res) {
    var task=req.params.task;
    // let new_id = parseInt(todo.length) + 1;
    // todo.push({ id: new_id, task: task, done: false });
    sql='INSERT INTO todos(task,done) VALUES (?,?)';
    dp.run(sql,[task,false],
        (err)=>{if(err) return console.log(err.message);}

    );
    console.log(todo);
    res.json({ message: "added successfully"});
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});