const room = document.querySelectorAll('.main__room')
const roomsWidth = document.querySelector('.main__rooms')
const search = document.querySelector('.menu__search--input')
let calculateRoomMargin = ()=>{
    let roomsClientWidth = roomsWidth.clientWidth-1;
    console.log(roomsClientWidth)
    let roomsInRow = (Math.floor((roomsClientWidth)/150));
    console.log(roomsInRow)
    let marginsSpace =  roomsClientWidth - (roomsInRow*150)
    console.log(marginsSpace)
    let maringWidth =  marginsSpace/(roomsInRow-1)
    console.log(maringWidth)
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
