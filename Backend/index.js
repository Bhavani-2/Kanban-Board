const express = require('express')
const cors  = require('cors');
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors({origin: 'http://localhost:5173',}))

app.use(express.json())

const dbPath = path.join(__dirname, 'board.db')

let db = null

const initializeDb = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    console.log('Database connected successfully')

  app.listen(3000, '127.0.0.1', () => { 
    console.log("Server Running at http://127.0.0"); 
});
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

initializeDb()

app.post('/api/auth/login', async(request, response) =>{

  const {name,password, email} = request.body

const hashedPassword = await bcrypt.hash(password, 10)
 const query = `select * from users where email='${email}'`;
     const data = await db.get(query);
     console.log(data)
      if(data=== undefined){
        const query= `INSERT INTO users (name, email, password_hash)
VALUES ('${name}','${email}', '${hashedPassword}')`
const data = await db.run(query)
 const payload = {name: name, email:email}
      const jwtToken = jwt.sign(payload, 'token')
      response.send({jwtToken})
     }
     else{
       const checkPassword = await bcrypt.compare(password, data.password_hash)
    if (checkPassword) {
      const payload = {name: name, email:email}
    
      const jwtToken = jwt.sign(payload, 'token')
      response.send({jwtToken})
    } else {
      response.status(400).json({error:'Invalid password'})
     
    }
        
     }
 })