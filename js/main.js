window.onload = function () {
  const play = document.getElementById("play")
  const tiles = document.querySelectorAll(".tile")
  const info = document.getElementById("info")
  const board = document.querySelector(".board")
  const level = document.getElementById("level")
  const high_score = document.getElementById("high-score")

  const audio_files = {
    red: "/sounds/red.mp3",
    blue: "/sounds/blue.mp3",
    green: "/sounds/green.mp3",
    yellow: "/sounds/yellow.mp3",
    win: "/sounds/game-win.wav",
    lose: "/sounds/game-over.wav",
    wrong: "/sounds/wrong.mp3"
  }

  const start_info = "Make it to 12 to win!"

  const color_list = ["red", "green", "blue", "yellow"]
  let selected_tiles = []
  let color_sequence = []
  let comp_turn = true
  let high_score_counter = 0
  let round_counter = 0


  function playAudio(item) {
    const audio = new Audio(audio_files[item])
    audio.play()
  }

  function getElementByColor(color) {
    for (let i = 0; i < 4; i++) {
      if (tiles[i].getAttribute(`data-tile`) === color) {
        return tiles[i]
      }
    }
  }

  function addToSequence() {
    color_sequence.push(color_list[Math.floor(Math.random() * 4)])
  }

  function incrementLevel(round) {
    if (round < 13) {
      level.innerText = round
    }
    if (high_score_counter < round) {
      high_score.innerText = round - 1
    }
  }

  function playSequence() {
    board.classList.add("unclickable")
    addToSequence()
    console.log(color_sequence)
    for (let i = 0; i < color_sequence.length; i++) {
      const element = getElementByColor(color_sequence[i])
      setTimeout(function () {
        playAudio(color_sequence[i])
        element.classList.remove("inactive")
        setTimeout(function () {
          element.classList.add("inactive")
        }, 600)
      }, 1000 * i)
    }
    setTimeout(() => {
      board.classList.remove("unclickable")
      comp_turn = false
    }, 1000 * color_sequence.length)
  }


  function validateClickedColor(element) {
    const element_color = element.getAttribute(`data-tile`)
    console.log(color_sequence, selected_tiles)

    if (element_color === color_sequence[selected_tiles.length]) {
      selected_tiles.push(element_color)
      console.log(color_sequence, selected_tiles)
      console.log(color_sequence.length == selected_tiles.length)
      playAudio(element_color)
      if (color_sequence.length == selected_tiles.length) {
        selected_tiles = []
        board.classList.add("unclickable")
        setTimeout(() => {
          comp_turn = true
          playGame()
        }, 1000)

      }
    } else {
      playAudio("wrong")
      board.classList.add("unclickable")
      round_counter = 0
      comp_turn = true
      color_sequence = []
      setTimeout(() => {
        playAudio("lose")
        info.innerText = "You Lose"
        info.style.color = "red"
        info.style.fontWeight = "1000"
        info.style.fontSize = "32px"
        play.style.display = "block"
      }, 600)
    }
  }

  function hidePlayButton() {
    play.style.display = "none"
    info.innerText = start_info
    info.style.fontWeight = "1000"
    info.style.fontSize = "24px"
    info.style.color = "white"
    info.style.fontSize = "16px"
  }

  const playGame = () => {
    if (round_counter < 2) {
      round_counter++
      incrementLevel(round_counter)
      if (comp_turn) {
        playSequence()
      }
    } else {
      playAudio("win")
      round_counter = 0
      color_sequence = []
      comp_turn = true
      info.innerText = "You Win"
      info.style.color = "green"
      info.style.fontSize = "32px"
      play.style.display = "block"

    }
  }

  tiles.forEach(element => {
    element.addEventListener("click", function () {
      validateClickedColor(element)
    })
  })

  play.addEventListener("click", () => {
    console.log("clicked")
    hidePlayButton()
    playGame()
  })
}