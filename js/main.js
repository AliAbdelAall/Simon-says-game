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







  tiles.forEach(element => {
    element.addEventListener("click", function () {

    })
  })

  play.addEventListener("click", function () {

  })
}