var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);

  if ((userClickedPattern.length) < (gamePattern.length)) {
    var answer = checkAnswer(userClickedPattern.length);
    if (answer == 0) {
      wrongAnswer();
      startOver();
    }
  }

  if ((userClickedPattern.length) === (gamePattern.length)) {
    var answer = checkAnswer(userClickedPattern.length);

    if (answer == 1) {
      nextSequence();
    } else {
      wrongAnswer();
      startOver();
    }
  }
})

function wrongAnswer() {
  var wrongAudio = new Audio("sounds/wrong.mp3");
  wrongAudio.play();
  $("#level-title").text("Game Over, Click This Text to Restart");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}

function startOver() {
  gamePattern = [];
  level = 0;
  $("h1").one("click", function() {
    $("#level-title").text("Level " + level);
    nextSequence();
  })
}

function checkAnswer(arrayLength) {
  var flag = 1;
  for (var i = 0; i < arrayLength; i++) {
    if (gamePattern[i] != userClickedPattern[i]) {
      flag = 0;
      break;
    }
  }
  return flag;
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio1 = new Audio("sounds/" + name + ".mp3");
  audio1.play();
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  setTimeout(function() {
    $("#level-title").text("Level " + level);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
  }, 500)
}

$("h1").one("click", function() {
  $("#level-title").text("Level " + level);
  nextSequence();
})
