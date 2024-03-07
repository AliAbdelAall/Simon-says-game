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
  let comp_turn = true
  let level_counter = 0
  let high_score_counter = 0



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

  function incrementLevel() {
    level_counter += 1
    if (high_score_counter < level_counter) {
      high_score_counter = level_counter - 1
    }
    level.innerText = level_counter
    high_score.innerText = high_score_counter
    console.log(level)
  }

  function playSequence() {
    addToSequence()
    incrementLevel()
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
  }

  // function letUserClick() {
  //   board.classList.remove("unclickable")
  // }

  // function checkColor(element) {
  //   const color = element.getAttribute(`data-tile`)
  //   selected_tiles.push(color)
  //   if (color !== color_sequence[selected_tiles.length - 1]) {
  //     playAudio("wrong")
  //     color_sequence = []
  //     setTimeout(function () {
  //       alert("YOU LOSE")
  //     }, 500)

  //   } else {
  //     playAudio(color)
  //   }
  // }

  // tiles.forEach(element => {
  //   element.addEventListener("click", function () {
  //     checkColor(element)
  //   })
  // })

  const playGame = () => {
    if (comp_turn) {
      playSequence()
    } else { letUserClick() }
  }

  play.addEventListener("click", () => {
    playGame()
    // playSequence()
    // letUserClick()
    // selected_tiles = []

    console.log(color_sequence)
  })
}