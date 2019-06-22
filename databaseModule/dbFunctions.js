//let addUser = (name, surname, password)=>{
  //  db.query('INSERT INTO users SET ?', )
//}

// GET all rooms with number of users signed up to this room

async function getAllRooms(db){
     await db.query('SELECT name,count(room) as `numberOfUsers` FROM' +
        ' `Rooms`LEFT OUTER JOIN `Room users` ON' +
        ' Rooms.room_id = `Room users`.`room` GROUP BY room_id',
        (err, result, fields)=>{
        if(err)
            throw err;
        return result
    })
    console.log("xd")

}


module.exports.getAllRooms = getAllRooms;