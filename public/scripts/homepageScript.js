const room = document.querySelectorAll('.main__room')
const roomsWidth = document.querySelector('.main__rooms')
const search = document.querySelector('.menu__search--input')
const availableRoomsText = document.querySelector('.main--title')
const main = document.querySelector('.main')
let alerts = []

let calculateRoomMargin = () =>{
    let roomsClientWidth = roomsWidth.clientWidth-1;
    let roomsInRow = (Math.floor((roomsClientWidth)/150));
    let marginsSpace =  roomsClientWidth - (roomsInRow*150)
    let maringWidth =  marginsSpace/(roomsInRow-1)

    room.forEach((element,index)=>{
        if((index+1)%roomsInRow != 0) {
            element.style.marginRight = maringWidth + "px"
        }
        else
            element.style.marginRight = 0 + "px"
    })
}

calculateRoomMargin()
window.addEventListener('resize',calculateRoomMargin)
search.addEventListener('change', ()=>{
})


let createWarning = (alertText)=>{
    let div = document.createElement('div')
    div.textContent = alertText
    div.setAttribute('id', 'warning')
    div.setAttribute('class', 'alert alert-danger')
    div.setAttribute('role','alert')
    main.insertBefore(div, availableRoomsText)
}

let removeWarning = ()=>{
    let alert = document.querySelectorAll('#warning')
    if(alert!=null)
        alert.forEach((alert)=>{
            alert.remove()
        })

}


room.forEach((room)=>{
    room.addEventListener('click', ()=>{
        removeWarning()
        if(document.cookie){
            let roomName = room.childNodes[1].childNodes[1].textContent;
            let roomId = room.getAttribute('roomid')
            roomName = roomName.replace(' ','')
            let url = 'http://localhost:3002/chat/' + roomName+'.'+roomId
            location.href = url
        }else{
            alerts = []
            alerts.push('You have to sign in in order to join room!')
            alerts.forEach((alert)=>{
                createWarning(alert)
            })
        }
    })
})