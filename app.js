/*----- constants -----*/
const board = document.querySelector('.board')
/*----- state variables -----*/
let foodRow = Math.floor(Math.random() * 25) + 1
let foodColumn = Math.floor(Math.random() * 25) + 1
let headRow = Math.floor(Math.random() * 15) + 5
let headColumn = Math.floor(Math.random() * 15) + 5
let snakeFood = `<div class ="food" style="grid-area: ${foodRow} / ${foodColumn}"></div>`
let snakeHead = `<div class ="head" style="grid-area: ${headRow} / ${headColumn}"></div>`
/*----- cached elements  -----*/

/*----- functions -----*/
const init = () => {
  board.innerHTML = snakeFood + snakeHead
}
const moveSnake = (e) => {
  console.log(e)
}
init()

/*----- event listeners -----*/
document.addEventListener('keydown', moveSnake)
