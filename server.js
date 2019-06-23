const mysql = require('mysql')
const https = require('http')
const dbFunc = require('./databaseModule/dbFunctions')
let cache = {}

const db = mysql.createConnection(({
    host: '127.0.0.1',
    user: 'root',
    database: 'RT_CHAT'
}));

db.connect((err)=>{
    if(err)
        console.log("Cannot connect to database!")
    else
        console.log('Database connected!')
})


const server = https.createServer((req, res)=>{
    switch(req.method){

        case 'POST':

            break;

        case 'GET':
            let filePath = '.';

            switch(req.url){
                case '/':
                    filePath += '/public/index.ejs'
                    dbFunc.getAllRooms(db, res, cache, filePath)
                    break;
                case '/signup':
                    filePath += '/public/pages/signup.ejs';
                    break;
                case '/signin':
                    filePath += '/public/pages/signin.ejs';
                    break;
                default:
                    filePath += '/public'+req.url;
                    dbFunc.staticFiles(res,cache,filePath)
                    break;
            }
            break;

    }
})


//db.end((err)=>{
    //if(err)
    //    console.log('Database cannot be closed!')
  //  console.log('Database closed!')
//})

server.listen(3001, ()=>{
    console.log('Server listen to port 3100!')
})