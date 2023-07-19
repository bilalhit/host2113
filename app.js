const expres = require('express');
const sql = require('mysql2');
const body = require('body-parser');
//const { createConnection } = require('net');
const app = expres();

app.use(body.json());

const con = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysqlg123",
    database: "node_restapi"
});

 //let apiResponse = ()=> {
//     return result
// };
con.connect((err)=> {
    if (err){
        throw err;
    }
    else{
        console.log('conction done');
    }
});
app.get('/',(req,res)=>{
    res.send('WELLCOM TO HOME PAGE')
})
app.get('/api/iteams',(req, res)=>{
    let sqlqureqa = "SELECT* FROM iteams";
    let qure = con.query(sqlqureqa,(err,result)=>{
        if (err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});
app.get('/api/iteams/:id',(req, res)=>{
    const sqlQuery =`SELECT * FROM iteams WHERE id = ${req.params.id}`;
    const query = con.query(sqlQuery, (err, results) => { 
        if(err) {
            throw err;
        }
        else{
            res.send(results);
        }
    });
});
// post
app.post('/api/iteams',(req ,res)=>{

    //let data ={tital: req.tital.tital, body: req.body.body};
    const Query = `INSERT INTO iteams (tital,body) VALUES( '${req.body.tital}','${req.body.body}')`;
    // console.log( req.body.tital+"   "+ req.body.body);
    const query = con.query(Query,(err, results) => {
        if(err) {
            res.send("ERROR.....!!!!")
        }
        else{
           res.send("DATA ADDING DONE"); 
        }
      });
});
//put 
app.put('/api/iteams/:id',(req, res) => {
    let sqlQuery = "UPDATE iteams SET tital='"+req.body.tital+"', body='"+req.body.body+"' WHERE id="+req.params.id;
    
    let query = con.query(sqlQuery, (err, results) => {
      if(err) {
        throw err;
      }
      else{
        res.send('DATA UPDATE DONE');
      }
    });
  });
// delete
app.delete('/api/iteams/:id',(req, res) => {

    console.log("here")
    let sqlQuery = `DELETE FROM iteams WHERE id = ${req.params.id}`;
      
    let query = con.query(sqlQuery, (err, results) => {
      if(err) {throw err;}

        res.send("DELETED");
    });
  });


// creat sever
app.listen(2113,(err)=>{
    if (err){
        throw err;
    }
    else
    console.log('server is run on 2113');
})