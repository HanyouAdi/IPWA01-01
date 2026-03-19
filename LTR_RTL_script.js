document.addEventListener("DOMContentLoaded", function () {
  const buttonMenuToggle = document.getElementById("ButtonMenuToggle");
  const htmlElement = document.documentElement;

  if (buttonMenuToggle === null || htmlElement === null) {
    console.error("Der Umschaltbutton oder das HTML-Element wurde nicht gefunden.");
    return;
  }

  /*
    Diese Funktion setzt die Schreibrichtung auf links nach rechts.
    Dadurch wird das lokale Menü per CSS auf die rechte Seite gesetzt.
    Außerdem wird die Beschriftung des Buttons angepasst.
  */
  function setDirectionToLeftToRight() {
    htmlElement.setAttribute("dir", "ltr");
    buttonMenuToggle.innerHTML = '<i class="bi bi-arrow-left-right"></i> Schriftkultur RLT';
  }

  /*
    Diese Funktion setzt die Schreibrichtung auf rechts nach links.
    Dadurch wird das lokale Menü per CSS auf die linke Seite gesetzt.
    Außerdem wird die Beschriftung des Buttons angepasst.
  */
  function setDirectionToRightToLeft() {
    htmlElement.setAttribute("dir", "rtl");
    buttonMenuToggle.innerHTML = '<i class="bi bi-arrow-left-right"></i> Schriftkultur LTR';
  }

  /*
    Diese Funktion prüft die aktuelle Schreibrichtung des Dokuments
    und setzt jeweils die entgegengesetzte Richtung.
  */
  function changeDirection() {
    if (htmlElement.getAttribute("dir") === "rtl") {
      setDirectionToLeftToRight();
    } else {
      setDirectionToRightToLeft();
    }
  }

  /*
    Diese Funktion sorgt dafür, dass der Buttontext beim Laden
    zur aktuellen Schreibrichtung passt.
  */
  function setInitialButtonText() {
    if (htmlElement.getAttribute("dir") === "rtl") {
      buttonMenuToggle.innerHTML = '<i class="bi bi-arrow-left-right"></i> Schriftkultur RLT';
    } else {
      buttonMenuToggle.innerHTML = '<i class="bi bi-arrow-left-right"></i> Schriftkultur LTR';
    }
  }

  setInitialButtonText();
  buttonMenuToggle.addEventListener("click", changeDirection);
});