var tempoinicial = "2";

$(document).ready(function() {
  resetGame();
  controller(tempoinicial);
  wordsCounterTextArea();
  setWordsNumber();
  verify();
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
  text.on("input", function() {
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
  field.one("focus", function() {
    var time = $("#seconds").text();
    var pid = setInterval(function() {
      time--;
      $("#seconds").text(time);
      if (time < 1) {
        insertTable();
        $("#textarea").attr("disabled", true);
        $("#textarea").toggleClass("off");
        clearInterval(pid);
      }
    }, 1000);
  });
}
function verify() {
  var phrase = $(".frase");
  var text = $("#textarea");
  text.on("input", function() {
    var typed = text.val();
    var reference = phrase.text().substring(0, typed.length);
    if (typed == reference) {
      text.removeClass("wrong");
      text.addClass("right");
    } else {
      text.removeClass("right");
      text.addClass("wrong");
    }
  });
}

function insertTable() {
  var tabela = $("#lines");
  var usuario = "Nameless";
  var numPalavras = $("#userWords").text();
  var linha =
    "<tr>" +
    "<td>" +
    usuario +
    "</td>" +
    "<td>" +
    numPalavras +
    "</td>" +
    "</tr>";
  console.log(tabela);
  tabela.prepend(linha);
}

function resetGame() {
  $("#reset").click(function() {
    var text = $("#textarea");
    text.attr("disabled", false);
    text.removeClass("wrong");
    text.removeClass("right");
    text.removeClass("off");
    text.val("");
    $("#userChars").text("0");
    $("#userWords").text("0");
    $("#seconds").text(tempoinicial);
    controller();
  });
}
