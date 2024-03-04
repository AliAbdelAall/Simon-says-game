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
  const selected_tile = []
  const color_sequence = []



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


  tiles.forEach(element => {
    element.addEventListener("click", function () {

    })
  })

  play.addEventListener("click", function () {

  })
}