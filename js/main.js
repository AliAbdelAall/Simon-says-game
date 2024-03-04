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
    win: "/sounds/game-win.mp3",
    lose: "/sounds/game-over.mp3",
    wrong: "/sounds/wrong.mp3"
  }

  const color_list = ["red", "green", "blue", "yellow"]
  let selected_tiles = []
  let color_sequence = []



  function playAudio(item) {
    const audio = new Audio(audio_files[item])
    audio.play()
  }

  function addToSequence() {
    color_sequence.push(color_list[Math.floor(Math.random() * 4)])
  }

  function getElementByColor(color) {
    for (let i = 0; i < 4; i++) {
      const element = tiles[i]
      const element_color = tiles[i].getAttribute(`data-tile`)
      if (element_color === color) {
        return element
      }
    }
  }

  function playSequence() {
    for (let i = 0; i < color_sequence.length; i++) {
      const element = getElementByColor(color_sequence[i])
      const element_color = element.getAttribute(`data-tile`)
      console.log(element, element_color)
      setTimeout(function () {
        playAudio(element_color)
        element.classList.remove("inactive")
        setTimeout(function () {
          element.classList.add("inactive")
        }, 800)
      }, 1000 * i)

    }
  }

  function letUserClick() {
    board.classList.remove("unclickable")
  }

  function checkColor(element) {
    const color = element.getAttribute(`data-tile`)
    selected_tiles.push(color)
    if (color !== color_sequence[selected_tiles.length - 1]) {
      playAudio("wrong")
      color_sequence = []
      setTimeout(function () {
        alert("YOU LOSE")
      }, 500)

    } else {
      playAudio(color)
    }
  }

  tiles.forEach(element => {
    element.addEventListener("click", function () {
      checkColor(element)
    })
  })

  // play round on pressing play(unfinished code)
  play.addEventListener("click", function () {
    addToSequence()
    playSequence()
    letUserClick()
    selected_tiles = []

    console.log(color_sequence)
  })
}