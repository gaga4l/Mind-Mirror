let userClickedPattern = [];
let gamePattern = [];
var buttonColor = ["green", "red", "yellow", "blue"];
let level = 0;

$(".startButton").on("click", function () {
  if (level === 0) {
    gameStart();
  }
});

function gameStart() {
  $(".startButton").addClass("hide");
  $(".info").removeClass("hide");
  nextRound();
}

function nextPlay() {
  return buttonColor[Math.floor(Math.random() * 4)];
}

function nextRound() {
  level++;
  $("#level-title").text("Level " + level);
  $(".btn").addClass("unclickable");
  $(".info").text("Wait for the computer!");

  userClickedPattern = [];
  gamePattern.push(nextPlay());
  computerPlay(gamePattern);

  setTimeout(() => {
    userPlay();
  }, level * 600 + 100);
}

function computerPlay(sequence) {
  sequence.forEach((color, index) =>
    setTimeout(() => {
      playSound(color);
      animateButton(color);
    }, (index + 1) * 600)
  );
}

function userPlay() {
  $(".btn").removeClass("unclickable");
  $(".info").text("your turn....");
  $(".btn")
    .off("click")
    .on("click", function () {
      const index = userClickedPattern.push(this.id) - 1;
      animateButton(this.id);

      if (userClickedPattern[index] !== gamePattern[index]) {
        $(".info").text("Please try again!");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(() => {
          $("body").removeClass("game-over");
        }, 200);

        setTimeout(() => {
          restartGame();
        }, 1000);
        return;
      }

      playSound(this.id);
      const left = gamePattern.length - userClickedPattern.length;
      if (left > 0) {
        $(".info").text(left + " Tap left...");
      } else {
        $(".info").text("Success!");
      }

      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(() => {
          nextRound();
        }, 1000);
        return;
      }
    });
}

function restartGame() {
  $("#level-title").text("Press Start to play!");
  userClickedPattern = [];
  $(".btn").addClass("unclickable");
  gamePattern = [];
  level = 0;
  $(".startButton").removeClass("hide");
  $(".info").addClass("hide");
}

function playSound(name) {
  var colors = {
    green: "./sounds/green.mp3",
    red: "./sounds/red.mp3",
    yellow: "./sounds/yellow.mp3",
    blue: "./sounds/blue.mp3",
    wrong: "./sounds/wrong.mp3",
  };

  if (colors[name]) {
    const sound = new Audio(colors[name]);
    sound.play();
  }
}

function animateButton(given) {
  $("#" + given).addClass("pressed");
  setTimeout(function () {
    $("#" + given).removeClass("pressed");
  }, 100);
}
