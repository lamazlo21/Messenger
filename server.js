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
    let filePath = '.';
    switch(req.method){
        case 'POST':
            switch(req.url){
                case '/signup':
                    filePath += '/public/pages/signup.ejs';
                    dbFunc.addUser(db, req, res, cache, filePath)
                    break;
                case '/signin':
                    filePath += '/public/pages/signin.ejs';
                    dbFunc.findUser(db, req, res, cache, filePath)
                    break;
            }
            break;

        case 'GET':
            switch(req.url){
                case '/':
                    filePath += '/public/index.ejs'
                    dbFunc.getAllRooms(db, res, cache, filePath)
                    break;

                case '/signup':
                    filePath += '/public/pages/signup.ejs';
                    dbFunc.staticFiles(res,cache,filePath)
                    break;

                case '/signin':
                    filePath += '/public/pages/signin.ejs';
                    dbFunc.staticFiles(res,cache,filePath)
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

server.listen(3002, ()=>{
    console.log('Server listen to port 3100!')
})