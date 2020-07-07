import React, { useState, useEffect } from "react"

const Morpher = () => {
  const [state, setState] = useState({
    text: "Ethereum",
    words: [
      "Ethereum",
      "以太坊",
      "イーサリアム",
      "Etérium",
      "이더리움",
      "اتریوم",
      "Αιθέριο",
      "Eterijum",
      "إثيريوم",
      "อีเธอเรียม",
      "Эфириум",
      "इथीरियम",
      "ಇಥೀರಿಯಮ್",
      "אתריום",
      "Ξ",
      "ইথেরিয়াম",
      "எதீரியம்",
      "ఇథిరియూమ్",
    ],
    counter: 0,
  })

  // loops over chars to morph a text to another
  const morpher = (start, end) => {
    // array of chars to randomly morph the text between start and end
    const chars = [
      "a",
      "b",
      "c",
      "d",
      "x",
      "y",
      "z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "{",
      "}",
      "%",
      "$",
      "?",
      "!",
    ]
    // duration of the global morph
    const duration = 3
    // speed of the morph for each letter
    const frameRate = 30

    // text variables
    const string = start.split("")
    const result = end.split("")
    const slen = string.length
    const rlen = result.length

    // time variables
    let present = new Date()
    let past = present.getTime()
    let count = 0
    let spentTime = 0
    // splitTime  = milliseconds / letters
    let splitTime = (duration * 70) / Math.max(slen, rlen)

    function update() {
      // Update present date and spent time
      present = new Date()
      spentTime += present.getTime() - past

      // Random letters
      for (let i = count; i < Math.max(slen, rlen); i++) {
        const random = Math.floor(Math.random() * (chars.length - 1))
        // Change letter
        string[i] = chars[random]
      }

      // Morph letters from start to end
      if (spentTime >= splitTime) {
        // Update count of letters to morph
        count += Math.floor(spentTime / splitTime)
        // Morphing
        for (let j = 0; j < count; j++) {
          string[j] = result[j] || null
        }
        // Reset spent time
        spentTime = 0
      }

      // Update DOM
      setState({ ...state, text: string.join("") })

      // Save present date
      past = present.getTime()

      // Loop
      if (count < Math.max(slen, rlen)) {
        // Only use a setTimeout if the frameRate is lower than 60FPS
        // Remove the setTimeout if the frameRate is equal to 60FPS
        setTimeout(() => {
          window.requestAnimationFrame(update)
        }, 1000 / frameRate)
      }
    }

    // Start loop
    update()
  }

  useEffect(() => {
    const morphInterval = setInterval(() => {
      const start = state.text
      const end = state.words[state.counter]

      morpher(start, end)

      if (state.counter < state.words.length - 1) {
        setState({ ...state, counter: state.counter++ })
      } else {
        // TODO this doesn't work, it doesn't set counter state
        setState({ ...state, counter: 0 })
      }
    }, 3000)

    return () => {
      clearInterval(morphInterval)
    }
  })

  return <span>{state.text}</span>
}

export default Morpher
