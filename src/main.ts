import './style.css'

const info = document.querySelector('.info')!.querySelector('strong') as HTMLElement
const board = document.querySelector('.board') as HTMLElement
const modal = document.querySelector('.modal') as HTMLElement
const restart = document.querySelector('.modal__btn') as HTMLButtonElement
const winCases = [
  // Line cases
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Column cases
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonal cases
  [0, 4, 8],
  [2, 4, 6]
]

let cells: Element[] = []
let currentPlayer = 'X'

const createBoard = () => {
  for(let i = 0; i < 9; i++){
    const cell = document.createElement('div')
    cell.classList.add('board__cell')

    cell.addEventListener('click', () => {
      if(cell.innerHTML == '') cell.innerHTML = currentPlayer
      if(cell.innerHTML == currentPlayer) cell.setAttribute('data-player', currentPlayer)
      winCheck()

      currentPlayer = currentPlayer == 'X' ? 'O' : 'X'
      changeInfo()
    })

    board.appendChild(cell)
    cells.push(cell)
  }
}

const winCheck = () => {
  const draw = cells.every(cell => {
    if(cell.innerHTML != '') return true
    else return false
  })

  if(draw) endGame('draw')

  for (let i = 0; i < winCases.length; i++) {
    let check: string[] = []
    const winCase = winCases[i];

    for (let j = 0; j < winCase.length; j++) {
      const index = winCase[j];
      check.push(cells[index].innerHTML)
    }
    const win = check.every(cell => {
      if(cell === check[0] && cell !== '') return true
      else return false
    })
    
    if(win) endGame(currentPlayer)
  }
}

const changeInfo = () => {
  info.innerHTML = currentPlayer
  info.setAttribute('data-player', currentPlayer)
}

const endGame = (result: string) => {
  const icon = modal.querySelector('i') as HTMLElement
  const msg = modal.querySelector('.modal__msg') as HTMLElement

  if(result == 'draw') {
    icon.className = ''
    icon.classList.add('fa-solid', 'fa-face-frown')

    msg.innerHTML = 'It was a Draw'
  } else {
    icon.className = ''
    icon.classList.add('fa-solid', 'fa-trophy', 'fa-shake')

    msg.innerHTML = `Player ${currentPlayer} won!`
  }

  modal.setAttribute('data-result', result)
  modal.style.display = 'block'
}

restart.addEventListener('click', () => {
  cells.forEach(cell => {
    cell.innerHTML = ''
  })
  modal.style.display = 'none'
  currentPlayer = 'X'
  changeInfo()
})

createBoard()