/* 
Potenzielle Funktionen:

Umschaltung von dir="ltr" / dir="rtl"

kleine Accessibility-Helfer

allgemeine UI-Funktionen 
*/

/* To-Do´s:

Priorisierte To-do-Liste
Hohe Priorität

Lokales Menü im Hinblick auf die Aufgabenstellung prüfen
Sicherstellen, dass das lokale Menü tatsächlich je nach Schriftkultur links bzw. rechts dargestellt wird. Das ist unmittelbar prüfungsrelevant.

JavaScript-Funktion zur Umschaltung von dir="ltr" / dir="rtl" einbauen
Dazu einen Button oder Schalter vorsehen, mit dem die Schreibrichtung sichtbar gewechselt werden kann. Das unterstützt direkt die Anforderung zur schriftkulturabhängigen Darstellung.

script.js sinnvoll strukturieren
Jetzt, da die alte Datei geleert wurde, entscheiden, ob script.js für die neue dir-Umschaltung und ggf. weitere projektweite Funktionen genutzt werden soll.

Fachbegriffe und Benennungen konsistent halten
Insbesondere CCF, PCF, CO₂-Bezeichnungen sowie die einheitliche Schreibweise von Earth’s / Earth's auf allen Seiten prüfen.

Tabellenköpfe mit scope="col" ergänzen
Das verbessert Semantik und Accessibility der CCF-Tabelle.

Labels mit for-Attributen und Inputs mit id verknüpfen
Ebenfalls wichtig für Accessibility und fachlich saubere Formularstruktur.

Sortierfunktion der Tabelle barriereärmer umsetzen
Idealerweise mit echten button-Elementen in den Tabellenköpfen statt nur klickbaren th-Elementen.

CSS-Regel thead.table-success th prüfen bzw. an die tatsächliche Tabellenklasse anpassen
Nur behalten, wenn sie wirklich zur aktuellen Tabelle passt.

section id="app" gegebenenfalls in div id="app" ändern
Das verbessert die semantische Klarheit der Vue-Mount-Stelle.

Mittlere Priorität

Abstände und Margins der Überschriften anpassen und vereinheitlichen
Das betrifft die visuelle Konsistenz der gesamten Website.

Einheitliche Nutzung der Klasse .header-logo auf allen Seiten prüfen und umsetzen
Damit Header und Logo-Darstellung technisch sauber vereinheitlicht werden.

partner.html: col-12 am main prüfen bzw. entfernen
Da dort keine .row-Umgebung vorliegt.

partner.html: verschachtelte container-Struktur prüfen und vereinfachen
Zur Bereinigung des Layouts und zur Reduktion unnötiger Abstände.

CSS/RTL-Konzept noch einmal gezielt prüfen
Besonders im Zusammenhang mit der tatsächlichen Platzierung des lokalen Menüs und dem neuen dir-Schalter.

Footer-Hinweis sprachlich abschließend prüfen
Vor allem, ob überall einheitlich die Formulierung mit „fiktiv“ verwendet wird.

Niedrigere Priorität

Kommentare im Code überarbeiten und professionalisieren
Wichtig für die Endfassung, aber erst nach Abschluss der funktionalen Änderungen sinnvoll.


*/

document.addEventListener("DOMContentLoaded", function () {
  const buttonMenuToggle = document.getElementById("ButtonMenuToggle"); /* Holt das Button-Element mit der ID "ButtonMenuToggle" aus dem DOM und speichert es in der Variable buttonMenuToggle. */
  const buttonMenuToggleText = document.getElementById("ButtonMenuToggleText");
  const buttonMenuToggleIcon = document.getElementById("ButtonMenuToggleIcon");
  const mainContent = document.getElementById("mainContent");
  const localMenu = document.getElementById("localMenu");

  if (
    buttonMenuToggle === null ||
    buttonMenuToggleText === null ||
    buttonMenuToggleIcon === null || 
    mainContent === null || 
    localMenu === null
  ) { 
    /* Überprüft, ob die benötigten Elemente im DOM vorhanden sind. 
    Wenn eines der Elemente nicht gefunden wird, wird eine Fehlermeldung in der Konsole ausgegeben und die Funktion wird mit return verlassen. */
    console.error("Eines oder mehrere benötigte Elemente wurden nicht gefunden. Bitte überprüfen Sie die IDs der Elemente.");
    return;
  }

  let localMenuIsOnLeftSide = false;

  /*
    Diese Funktion verschiebt das lokale Menü auf die linke Seite.
    Gleichzeitig wird der Hauptinhalt auf die rechte Seite verschoben.
    Außerdem wird der Text des Buttons angepasst.
  */
  function placeLocalMenuOnLeftSide() {
    mainContent.classList.remove("order-lg-1"); /* Entfernt die Klasse, die den Hauptinhalt auf der linken Seite positioniert */
    localMenu.classList.remove("order-lg-2"); /* Entfernt die Klasse, die das lokale Menü auf der rechten Seite positioniert */

    mainContent.classList.add("order-lg-2"); /* Fügt die Klasse hinzu, die den Hauptinhalt auf der rechten Seite positioniert */
    localMenu.classList.add("order-lg-1"); /* Fügt die Klasse hinzu, die das lokale Menü auf der linken Seite positioniert */

    buttonMenuToggleText.textContent = "Menü nach rechts verschieben"; /* Aktualisiert den Button-Text, um die neue Funktionalität widerzuspiegeln */
    
    buttonMenuToggleIcon.classList.remove("bi-arrow-bar-left"); /* Entfernt die Klasse, die das Icon für die linke Position darstellt */
    buttonMenuToggleIcon.classList.add("bi-arrow-bar-right"); /* Fügt die Klasse hinzu, die das Icon für die rechte Position darstellt */

    localMenuIsOnLeftSide = true; /* Setzt die Variable, um anzuzeigen, dass das lokale Menü jetzt auf der linken Seite ist */
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

    localMenuIsOnLeftSide = false;
  }

  /*
    Diese Funktion prüft, auf welcher Seite sich das lokale Menü gerade befindet.
    Danach wird das Menü auf die jeweils andere Seite verschoben.
  */
  function changeLocalMenuPosition() {
    if (localMenuIsOnLeftSide === true) { /* Wenn das lokale Menü aktuell auf der linken Seite ist, wird es auf die rechte Seite verschoben. */
      placeLocalMenuOnRightSide(); /* Ruft die Funktion auf, die das lokale Menü auf die rechte Seite verschiebt. */
    } else {
      placeLocalMenuOnLeftSide(); /* Wenn das lokale Menü aktuell nicht auf der linken Seite ist, wird es auf die linke Seite verschoben. */
    }
  }

  placeLocalMenuOnRightSide(); /* Initiale Positionierung des lokalen Menüs auf der rechten Seite, damit die Seite mit der erwarteten Standardanordnung startet. */
  buttonMenuToggle.addEventListener("click", changeLocalMenuPosition); /* Fügt dem Button ein Click-Event hinzu, das die Funktion changeLocalMenuPosition aufruft, wenn der Button geklickt wird. */
});