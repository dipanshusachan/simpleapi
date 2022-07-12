const express = require("express");
const con = require("./config");
const app = express();

app.use(express.json());

app.get("/", (req, resp) => {
  con.query("select * from employee", (err, result) => {
    if (err) { resp.send("error in api") }
    else { resp.send(result) }
  })
});


app.post("/insert", (req, resp) => {
  const data = req.body;
  con.query("INSERT INTO employee SET ?", data, (error, results) => {
    if (error) error;
    resp.send(results)
  })
});

app.put("/update:id",(req,resp)=>{
  const data= [req.body.name,req.body.password,req.params.id];
  con.query("UPDATE employee SET name = ?, password = ? WHERE id = ?",
  data,(error,results,fields)=>{
    if(error) throw error;
    resp.send(results)
  })
 
});

app.delete("/delete:id",(req,resp)=>{
  con.query("DELETE FROM employee WHERE id = " + req.params.id,(error,results)=>{
  if(error) throw error;
  resp.send(results)
})

});

app.listen("8000")