const fs = require('fs')
const ejs = require('ejs')
const mime = require('mime')
const path = require('path')
const bcrypt = require('bcrypt')
const qs = require('querystring')
const cookies = require('cookie')
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

let sendFile = (res, filePath, fileContent, data, allRooms)=>{
    if(filePath.includes('ejs'))
        fileContent = ejs.render(fileContent, {data: data, allRooms: allRooms})
    res.writeHead(200, {'Content-Type': mime.getType(path.basename(filePath))})
    res.end(fileContent)
}

exports.staticFiles = (res, cache, absPath, template, allRooms)=> {
    if (cache[absPath]) {
        sendFile(res, absPath, cache[absPath], template, allRooms)
    } else {
        fs.access(absPath, (err => {
            if (!err) {
                fs.readFile(absPath, 'utf-8', (err, data) => {
                    if (err)
                        send404(res)
                    else {
                        cache[absPath] = data;
                        sendFile(res, absPath, data, template, allRooms)
                    }
                })
            } else
                send404(res)
        }))
    }
}

// GET all available rooms

exports.getAllRooms = (db, req, res, cache, filePath)=>{
     db.query('SELECT name,count(room) as `numberOfUsers`, room_id FROM' +
        ' `Rooms`LEFT OUTER JOIN `Room users` ON' +
        ' Rooms.room_id = `Room users`.`room` GROUP BY room_id',
        (err, result, fields)=>{
        if(err)
            throw err;
        let cookieRes = cookies.parse(req.headers.cookie||'')
        if(cookieRes.name)
            exports.getUserRooms(db, res, cache, filePath,cookieRes.name, result)
        else
            exports.staticFiles(res,cache,filePath, result)
    })
}

// GET user id

// GET rooms which user is signed up for

exports.extractRoomName = (url)=>{
    let obj = {
        url: url,
        roomName: '',
        roomId: null
    }
    if(url.includes('/chat/')){
         obj.url = '/chat'
         obj.roomName = url.replace('/chat/','')
         let splitedUrl = obj.roomName.split('.')
         obj.roomId = splitedUrl[splitedUrl.length-1]
        return obj
    }
    return obj
}

exports.getUserRooms = (db, res, cache, filePath, username, allRooms)=>{
    db.query('SELECT room, name, room_id FROM `Room users` INNER JOIN' +
        ' `Rooms` ON `Rooms`.`room_id` = `Room users`.`room`' +
        ' WHERE user = ? ', [username], (err,result,fields)=>{
        if(err)
            throw err;
        exports.staticFiles(res,cache,filePath, allRooms, result)
    })
}

exports.getMessages = (db, res, cache, filePath, roomId)=>{
    db.query('SELECT content FROM Messages WHERE room = ?', [roomId],
    (err, result, fields)=>{
        if(err)
            throw err;
        exports.staticFiles(res,cache,filePath, result)
        })
}

exports.signOut = (res)=>{

}

// INSERTS

// ADD new user
exports.addUser=(db, req, res, cache, filePath)=>{
    parseData(req,(data)=> {
        db.query('SELECT username FROM `Users` WHERE username = ?',[data.name],
        (err, result, fields)=>{
            if(err)
                throw err;
            if(result.length==0){
                bcrypt.hash(data.password, saltRounds, (err, hash) => {
                    db.query('INSERT INTO `Users`(username, hashed_pass, status) ' +
                        'VALUES (?,?,?)',
                        [data.name, hash, 0], (error) => {
                            if (error)
                                throw error;
                            res.writeHead(301, {"Location": "http://localhost:3002/signupcomplete"}); 
                            res.end()
                        }
                    )
            })
        }else{
            const message = {alert: 'User with this login already exists'}
            exports.staticFiles(res,cache,filePath, message)
        }})
})}

exports.findUser=(db,req,res, cache, filePath)=>{
    parseData(req,(data)=>{
        console.log(data)
        db.query('SELECT hashed_pass FROM `Users` WHERE username = ?',[data.name],
        (err, result, fields)=>{
            if(err)
                throw err;
            const message = {alert: 'Particular user dosen\'t exists'}
            if(result.length>0){
                bcrypt.compare(data.password,result[0].hashed_pass.toString(),(err, isEqual)=>{
                    if(isEqual===false){
                        exports.staticFiles(res,cache,filePath, message)
                    }else{
                        res.setHeader('Set-Cookie', cookies.serialize('name', data.name),{
                            httpOnly: false,
                            maxAge: 60 * 60 * 24 * 7
                        })
                        res.writeHead(301, {"Location": "http://localhost:3002"});
                        res.end()
                    }
            })
            }else{
                    exports.staticFiles(res,cache,filePath, message)
            }
    })
})}



