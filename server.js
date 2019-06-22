const mysql = require('mysql')
const https = require('http')
const mime = require('mime')
const fs = require('fs')
const path = require('path')
//const dbFunc = require('databaseModule/dbFunctions')
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

let send404 = (res)=>{
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.end('404, it seems you\'re lost')
}

let sendFile = (res, filePath, fileContent)=>{
    res.writeHead(200, {'Content-Type': mime.getType(path.basename(filePath))})
    res.end(fileContent)
}

let staticFiles = (res, cache, absPath)=>{
    if(cache[absPath]) {
        sendFile(res, absPath, cache[absPath])
    }else{
        fs.access(absPath,(err => {
            if(!err){
                fs.readFile(absPath, (err, data)=>{
                    if(err)
                        send404(res)
                    else {
                        cache[absPath] = data;
                        sendFile(res, absPath, data)
                    }
                })
            }else
                send404(res)
        }))
    }
}



const server = https.createServer((req, res)=>{
    switch(req.method){

        case 'POST':

            break;

        case 'GET':
            let filePath = '.';
            switch(req.url){
                case '/':
                    filePath += '/index'
                    break;
                case '/signup':
                    filePath += '/signup';
                    break;
                case '/signin':
                    filePath += '/signin';
                    break;
                case '/rooms':
                    filePath += '/rooms';
                    break;
                default:
                    filePath += req.url;
                    break;
            }
            console.log(filePath)
            staticFiles(res,cache,filePath)
            break;

    }
})


db.end((err)=>{
    if(err)
        console.log('Database cannot be closed!')
})

server.listen(3100, ()=>{
    console.log('Server listen to port 3100!')
})