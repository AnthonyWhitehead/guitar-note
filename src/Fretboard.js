import { strings, yOffset } from './config'

export default class FretBoard {
  constructor() {
    this.c = document.getElementById('guitar')
    this.ctx = this.c.getContext('2d')
    this.fretLength = this.c.width / 12
    this.fretHeight = this.c.height / 6
    this.mappedNotes = {}
    this.strings = strings
  }

  /**
   * render the guitar frets
   */
  renderFrets() {
    for (let i = this.fretLength; i <= this.c.width; i += this.fretLength) {
      this.ctx.moveTo(i, 0)
      this.ctx.lineTo(i, this.c.height)
      this.ctx.stroke()
    }
  }

  /**
   *  render the fret circles
   */
  renderFretCircles() {
    const singleCircles = [3, 5, 7, 9]
    const doubleCircles = [12]
    let index = 0
    for (let i = this.fretLength; i <= this.c.width; i += this.fretLength) {
      index++
      if (singleCircles.includes(index)) {
        this.renderCircle(i - this.fretLength / 2, 100)
      }
      if (doubleCircles.includes(index)) {
        this.renderCircle(i - this.fretLength / 2, 50)
        this.renderCircle(i - this.fretLength / 2, 150)
      }
    }
  }

  /**
   *
   * @param x
   * @param y
   *
   * render an individual circle
   */
  renderCircle(x, y) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, 5, 0, 2 * Math.PI)
    this.ctx.fill()
  }

  /**
   * take the strings array from config
   * and map each note into object
   * with x and y co-ordinates so that we
   * can render them on the fretboard
   */
  mapNotes() {
    for (let i = 0; i < this.strings.length; i++) {
      this.mappedNotes[i] = this.strings[i].map((note, index) => {
        let x = this.fretLength
        let y = this.fretHeight
        return {
          note: note,
          x: x * index - x / 2,
          y: i * y + yOffset,
          radius: 10
        }
      })
    }
  }

  /**
   * take the mappedNotes and
   * render them on the fretBoard
   */
  renderNotes() {
    for (let string in this.mappedNotes) {
      if (this.mappedNotes.hasOwnProperty(string)) {
        for (let note in this.mappedNotes[string]) {
          if (this.mappedNotes[string].hasOwnProperty(note)) {
            this.ctx.beginPath()
            this.ctx.arc(
              this.mappedNotes[string][note].x,
              this.mappedNotes[string][note].y,
              this.mappedNotes[string][note].radius,
              0,
              2 * Math.PI,
              false
            )
          }
          this.ctx.stroke()
        }
      }
    }
  }

  render() {
    this.renderFrets()
    this.renderFretCircles()
    this.mapNotes()
    this.renderNotes()
  }
}
