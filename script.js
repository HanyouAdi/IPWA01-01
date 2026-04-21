document.addEventListener("DOMContentLoaded", function () {
  const buttonMenuToggle =
    document.getElementById(
      "ButtonMenuToggle",
    ); /* Holt das Button-Element mit der ID "ButtonMenuToggle" aus dem DOM 
  und speichert es in der Variable buttonMenuToggle. */
  const buttonMenuToggleText = document.getElementById("ButtonMenuToggleText");
  const buttonMenuToggleIcon = document.getElementById("ButtonMenuToggleIcon");
  const mainContent = document.getElementById("mainContent");
  const localMenu = document.getElementById("localMenu");
  let isLocalMenuOnLeftSide = false; /* Initialisiert eine Variable, die den aktuellen Zustand der Position des lokalen Menüs speichert. 
  Anfangs wird angenommen, dass das lokale Menü nicht auf der linken Seite ist. */

  if (
    buttonMenuToggle === null ||
    buttonMenuToggleText === null ||
    buttonMenuToggleIcon === null ||
    mainContent === null ||
    localMenu === null
  ) {
    /* Überprüft, ob die benötigten Elemente im DOM vorhanden sind. 
    Wenn eines der Elemente nicht gefunden wird, wird eine Fehlermeldung in der Konsole ausgegeben und die Funktion wird mit return verlassen. */
    console.error(
      "Eines oder mehrere benötigte Elemente wurden nicht gefunden. Bitte überprüfen Sie die IDs der Elemente.",
    );
    return;
  }

  /*
    Diese Funktion verschiebt das lokale Menü auf die linke Seite.
    Gleichzeitig wird der Hauptinhalt auf die rechte Seite verschoben.
    Zusätzlich wird der Text des Buttons angepasst.
  */
  function placeLocalMenuOnLeftSide() {
    mainContent.classList.remove(
      "order-lg-1",
    ); /* Entfernt die Klasse, die den Hauptinhalt auf der linken Seite positioniert */
    localMenu.classList.remove(
      "order-lg-2",
    ); /* Entfernt die Klasse, die das lokale Menü auf der rechten Seite positioniert */

    mainContent.classList.add(
      "order-lg-2",
    ); /* Fügt die Klasse hinzu, die den Hauptinhalt auf der rechten Seite positioniert */
    localMenu.classList.add(
      "order-lg-1",
    ); /* Fügt die Klasse hinzu, die das lokale Menü auf der linken Seite positioniert */

    buttonMenuToggleText.textContent =
      "Menü nach rechts verschieben"; /* Aktualisiert den Button-Text, um die neue Funktionalität widerzuspiegeln */

    buttonMenuToggleIcon.classList.remove(
      "bi-arrow-bar-left",
    ); /* Entfernt die Klasse, die das Icon für die linke Position darstellt */
    buttonMenuToggleIcon.classList.add(
      "bi-arrow-bar-right",
    ); /* Fügt die Klasse hinzu, die das Icon für die rechte Position darstellt */

    isLocalMenuOnLeftSide = true; /* Setzt die Variable, um anzuzeigen, dass das lokale Menü jetzt auf der linken Seite ist */
  }

  /*
    Diese Funktion verschiebt das lokale Menü auf die rechte Seite.
    Gleichzeitig wird der Hauptinhalt auf die linke Seite verschoben.
    Außerdem wird der Text des Buttons angepasst.
  */
  function placeLocalMenuOnRightSide() {
    mainContent.classList.remove("order-lg-2");
    localMenu.classList.remove("order-lg-1");

    mainContent.classList.add("order-lg-1");
    localMenu.classList.add("order-lg-2");

    buttonMenuToggleText.textContent = "Menü nach links verschieben";

    buttonMenuToggleIcon.classList.remove("bi-arrow-bar-right");
    buttonMenuToggleIcon.classList.add("bi-arrow-bar-left");

    isLocalMenuOnLeftSide = false;
  }

  /*
    Diese Funktion prüft, auf welcher Seite sich das lokale Menü gerade befindet.
    Danach wird das Menü auf die jeweils andere Seite verschoben.
  */
  function changeLocalMenuPosition() {
    if (isLocalMenuOnLeftSide === true) {
      /* Wenn das lokale Menü aktuell auf der linken Seite ist, wird es auf die rechte Seite verschoben. */
      placeLocalMenuOnRightSide(); /* Ruft die Funktion auf, die das lokale Menü auf die rechte Seite verschiebt. */
    } else {
      placeLocalMenuOnLeftSide(); /* Wenn das lokale Menü aktuell nicht auf der linken Seite ist, wird es auf die linke Seite verschoben. */
    }
  }

  placeLocalMenuOnRightSide(); /* Initiale Positionierung des lokalen Menüs auf der rechten Seite, 
  damit die Seite mit der erwarteten Standardanordnung startet. */
  buttonMenuToggle.addEventListener(
    "click",
    changeLocalMenuPosition,
  ); /* Fügt dem Button ein Click-Event hinzu, das die Funktion changeLocalMenuPosition aufruft, wenn der Button geklickt wird. */
});
