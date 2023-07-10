console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let ting = new Audio("ting.mp3")
let gameover = new Audio("complete.mp3")
let turn = "X"


let boxes = Array.from(document.getElementsByClassName("box"))
let boxTexts = Array.from(document.getElementsByClassName("boxtext"))
let displayTurn = document.getElementById("displayTurn") 
let resetButton = document.getElementById("reset") 
let gif = document.getElementById("gif") 
displayTurn.textContent = "Turn For X"

let board = ["","","","","","","","",""]
var winSet = [
    [0,1,2],[3,4,5],[6,7,8], //Rows
    [0,3,6],[1,4,7],[2,5,8], //Columns
    [0,4,8],[2,4,6]  //Diagonals
]

const changeTurn = () => {
    if (turn === "X") {
        displayTurn.textContent = "Turn For 0"
        return "0"
    } else {
        displayTurn.textContent = "Turn For X"
        return "X"
    }
}

const checkWin = (board,turn) =>{
    for(let i = 0; i < winSet.length; i++){
        const [a,b,c] = winSet[i]
        if(board[a] === turn && board[b] === turn && board[c]===turn){
            gameover.play()
            music.pause()
            gif.style.display = "block"
            displayTurn.textContent = `WINNER IS ${turn}`
            displayTurn.classList.add("winnerText")
            boxes.forEach((box)=>{
                box.classList.add("disabled")
            })
            boxTexts[a].classList.add("winColor")
            boxTexts[b].classList.add("winColor")
            boxTexts[c].classList.add("winColor")
            return true
        }
    }
    return false
}

const resetAll = () =>{
    boxes.forEach((box,i)=>{
        span = document.getElementById(i)
        span.textContent = ""
        span.classList.remove("winColor")
        displayTurn.classList.remove("winnerText")
        gif.style.display = "none"
        board[i]=""
        turn = "X"
        box.classList.remove("disabled")
        displayTurn.textContent = "Turn For X"
    })
}

boxes.forEach((box,i) => {
    box.addEventListener("click",()=>{
        ting.play()
        music.play()
        span = document.getElementById(i)
        span.textContent = turn
        board[i]=turn
        winner = checkWin(board,turn)
        if(!winner){ 
            turn = changeTurn()
            box.classList.add("disabled")
        }
    })
})

resetButton.addEventListener("click",()=>{
    resetAll()
})

