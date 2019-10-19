import { c, ctx } from './config'

export default class GameEngine {
  constructor(fretBoard) {
    this.fretBoard = fretBoard
    this.randomNote = {}
    this.clickedNote = ''
    this.c = c
    this.ctx = ctx
    this.started = false
    this.startBtn = document.getElementById('start')
  }

  setRandomNote() {
    this.randomNote = {
      string: this.getRandomInt(0, 5)
    }
  }

  static toggleStarted() {
    console.log(this.started)
    this.started = !this.started
  }

  getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
  }

  isIntersect(point, note) {
    return Math.sqrt((point.x - note.x) ** 2 + (point.y - note.y) ** 2) < note.radius
  }

  playGame() {
    while(this.started) {
      this.c.addEventListener('click', (e) => {

        const rect = this.fretBoard.c.getBoundingClientRect()
        const pos = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        }
        for (let string in this.fretBoard.mappedNotes) {
          if (this.fretBoard.mappedNotes.hasOwnProperty(string)) {
            for (let notes in this.fretBoard.mappedNotes[string]) {
              if (this.fretBoard.mappedNotes[string].hasOwnProperty(notes)) {
                let note = this.fretBoard.mappedNotes[string][notes]
                if (this.isIntersect(pos, note)) {
                  this.clickedNote = note.note
                }
              }
            }
          }
        }

        this.setRandomNote()

        console.log(this.clickedNote)

      })
    }
    document.getElementById('start').addEventListener('click', function(){
        GameEngine.toggleStarted()
    })
  }
}