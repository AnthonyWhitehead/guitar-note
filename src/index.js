import FretBoard from './Fretboard'
import GameEngine from './GameEngine'

const fretBoard = new FretBoard()

fretBoard.render()

const gameEngine = new GameEngine(fretBoard)

gameEngine.playGame()