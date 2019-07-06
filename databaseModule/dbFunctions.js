const fs = require('fs')
const ejs = require('ejs')
const mime = require('mime')
const path = require('path')
const bcrypt = require('bcrypt')
const qs = require('querystring')
const saltRounds = 10;

let parseData = (req, cb)=>{
    let body =''
    req.setEncoding('utf-8')

    req.on('data',(data)=>{
        body +=data;
    })

    req.on('end',()=>{
        let data = qs.parse(body)
        cb(data)
    })
}

let send404 = (res)=>{
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.end('404, it seems you\'re lost')
}

let sendFile = (res, filePath, fileContent, data)=>{
    if(filePath.includes('ejs'))
        fileContent = ejs.render(fileContent, {data: data})
    res.writeHead(200, {'Content-Type': mime.getType(path.basename(filePath))})
    res.end(fileContent)
}

exports.staticFiles = (res, cache, absPath, template)=> {
    if (cache[absPath]) {
        sendFile(res, absPath, cache[absPath], template)
    } else {
        fs.access(absPath, (err => {
            if (!err) {
                fs.readFile(absPath, 'utf-8', (err, data) => {
                    if (err)
                        send404(res)
                    else {
                        cache[absPath] = data;
                        sendFile(res, absPath, data, template)
                    }
                })
            } else
                send404(res)
        }))
    }
}

// GET all available rooms

exports.getAllRooms = (db, res, cache, filePath)=>{
     db.query('SELECT name,count(room) as `numberOfUsers` FROM' +
        ' `Rooms`LEFT OUTER JOIN `Room users` ON' +
        ' Rooms.room_id = `Room users`.`room` GROUP BY room_id',
        (err, result, fields)=>{
        if(err)
            throw err;
        exports.staticFiles(res,cache,filePath, result)
    })
}

// GET rooms which user is signed up for

exports.getUserRooms = (db)=>{
    db.query('SELECT room, name FROM `Room users` INNER JOIN' +
        ' `Rooms` ON `Rooms`.`room_id` = `Room users`.`room`' +
        ' WHERE user = ? ', [1], (err,result,fields)=>{
        if(err)
            throw err;
        return result
    })
}

// INSERTS

// ADD new user
exports.addUser=(db, req, res, data)=>{
    parseData(req,(data)=> {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(data.password[0], salt, (erro, hash) => {
                db.query('INSERT INTO `Users`(name, surname, hashed_pass, status) ' +
                    'VALUES (?,?,?,?)',
                    [data.name, data.surname, hash, 0], (error) => {
                        res.writeHead(200,  {'Content-Type': 'text/plain'})
                        if (err)
                            throw error;
                        res.end()
                    }
                )
            })
        })
    })
}



