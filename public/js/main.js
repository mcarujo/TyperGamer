var tempoinicial = "2";

$(document).ready(function() {
  resetGame();
  controller(tempoinicial);
  wordsCounterTextArea();
  setWordsNumber();
  verify();
  changePhrase();
  scoreStatus();
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

function removeLine(event) {
  event.preventDefault();
  var $this = $(this)
    .parent()
    .parent()
    .parent();
  $this.fadeOut(function() {
    $this.remove();
  });
}

function changePhrase() {
  $("#change").on("click", function() {
    $.get("http://localhost:3000/frases", function(data) {
      var frase = $(".frase");
      var segundos = $("#seconds");
      var number = getRandomIntInclusive(0, data.length - 1);
      frase.text(data[number].texto);
      segundos.text(data[number].tempo);
    });
  });
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function insertTable() {
  var tabela = $("#lines");
  var usuario = "Nameless";
  var numPalavras = $("#userWords").text();

  var linha = $("<tr>");
  var colunaUser = $("<td>").text(usuario);
  var colunaWord = $("<td>").text(numPalavras);
  var colunaTrash = $("<td>");
  var link = $("<a>")
    .addClass("botaoremover")
    .attr("href", "#");
  var icone = $("<i>")
    .addClass("small")
    .addClass("material-icons")
    .text("delete")
    .click(removeLine);
  link.append(icone);
  colunaTrash.append(link);
  linha.append(colunaUser);
  linha.append(colunaWord);
  linha.append(colunaTrash);
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

function scoreStatus() {
  $("#score").on("click", function() {
    $(".score").slideToggle(500);
  });
}
