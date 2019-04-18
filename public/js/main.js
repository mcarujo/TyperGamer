var tempoinicial = "10";

$(document).ready(function () {
  resetGame();
  controller(tempoinicial);
  wordsCounterTextArea();
  setWordsNumber();
});


function wordsCounter() {
  var text = $(".frase").text();
  var length = text.split(" ").length;
  return length;
}

function setWordsNumber() {
  var number = wordsCounter();
  $("#length").text(number);
}

function wordsCounterTextArea() {
  var text = $("#textarea");
  text.on("input", function () {
    var value = text.val();
    var chars = chars == " " ? 0 : value.length;
    var words = value.split(/[\S]+/).length;
    $("#userChars").text(chars);
    $("#userWords").text(words);
  });
}

function controller(timeStart) {
  $("#seconds").text(timeStart);
  var field = $("#textarea");
  field.one("focus", function () {
    var time = $("#seconds").text();
    var pid = setInterval(function () {
      time--;
      $("#seconds").text(time);
      if (time < 1) {
        $("#textarea").attr("disabled", true);
        $("#textarea").toggleClass("off");
        clearInterval(pid);
      }
    }, 1000);
  });
}
function verify(){
var frase = $(".frase").text();
}
function resetGame() {
  $("#reset").click(function () {
    $("#textarea").attr("disabled", false);
    $("#textarea").toggleClass("off");
    $("#textarea").val("");
    $("#userChars").text("0");
    $("#userWords").text("0");
    $("#seconds").text("10");
    controller();
  });
}
