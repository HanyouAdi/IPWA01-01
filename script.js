const btn = document.querySelector("#button1"); // Select the button element
btn.addEventListener("click", () => { // Add click event listener
  btn.textContent = "YOU CLICKED ME!! ❤️"; // Change button text on click
  setTimeout(() => { // Set a timeout to revert text after 1 second
    btn.textContent = "Press me"; // Revert button text
  }, 1000); // 1000 milliseconds = 1 second
});

// Initialize Bootstrap tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});


/*
  Ziel:
  - Wir haben fiktive Daten (Array von Objekten)
  - Wir rendern daraus Tabellenzeilen in <tbody>
  - HTML und JS sind getrennt: HTML = Struktur, JS = Logik/Rendering
*/

/* 1) Unsere Daten (fiktiv)
   - country: Land
   - company: Unternehmen
   - co2: Zahl (Emissionen)
   Länder dürfen mehrfach vorkommen.
*/
const emissionsdaten = [
  { country: "Deutschland", company: "NordTech AG", co2: 8.1 },
  { country: "Deutschland", company: "Räfle Energy GmbH", co2: 12.4 },
  { country: "Frankreich", company: "ÉcoIndustrie SA", co2: 10.7 },
  { country: "USA", company: "BlueCarbon Inc.", co2: 25.3 },
  { country: "USA", company: "SunGrid LLC", co2: 18.9 },
  { country: "Japan", company: "Sakura Metals", co2: 14.2 }
];

/* 2) Wir holen uns den <tbody>, in den wir Zeilen schreiben.
   document.getElementById(...) sucht im HTML nach einem Element mit dieser ID.
*/
const tbody = document.getElementById("co2Tbody");

/* 3) renderTable(rows)
   Diese Funktion bekommt eine Liste (Array) von Zeilen-Daten (rows)
   und baut daraus <tr> und <td> Elemente.

   WICHTIG:
   - Wir leeren tbody zuerst, damit nicht alles doppelt erscheint
   - Dann bauen wir Zeile für Zeile neu auf
*/
function renderTable(rows) {

  // tbody leeren: alles was vorher drin war, weg
  tbody.innerHTML = "";

  // klassische for-Schleife (Standard)
  for (let i = 0; i < rows.length; i = i + 1) {
    // neue Tabellenzeile erstellen
    const tr = document.createElement("tr");

    // 1. Spalte: Land
    const tdCountry = document.createElement("td");
    tdCountry.textContent = rows[i].country;

    // 2. Spalte: Unternehmen
    const tdCompany = document.createElement("td");
    tdCompany.textContent = rows[i].company;

    // 3. Spalte: CO2
    const tdCo2 = document.createElement("td");
    // Zahl hübsch formatieren (1 Nachkommastelle)
    tdCo2.textContent = rows[i].co2.toFixed(1);

    // td in tr einfügen
    tr.appendChild(tdCountry);
    tr.appendChild(tdCompany);
    tr.appendChild(tdCo2);

    // tr in tbody einfügen
    tbody.appendChild(tr);
  }
}

/* 4) Erste Anzeige beim Laden:
   Wir rendern die Originaldaten.
*/
renderTable(emissionsdaten);

/* 5) Sortier-Status merken
   - sortKey: Welche Spalte ist aktuell sortiert?
   - sortDir: Richtung "asc" oder "desc"
*/
let sortState = {
  sortKey: null,
  sortDir: "asc"
};

/*
  6) sortBy(key)
  Diese Funktion:
  - entscheidet, ob wir asc oder desc sortieren
  - macht eine Kopie von data
  - sortiert diese Kopie
  - rendert das Ergebnis

  key ist z.B. "country" oder "company" oder "co2"
*/
function sortBy(key) {
  let rowsCopy;
  let dirFactor;

  // Wenn wir die gleiche Spalte nochmal sortieren: Richtung umdrehen
  if (sortState.sortKey === key) {
    if (sortState.sortDir === "asc") {
      sortState.sortDir = "desc";
    } else {
      sortState.sortDir = "asc";
    }
  } else {
    // Neue Spalte gewählt: standardmäßig aufsteigend starten
    sortState.sortKey = key;
    sortState.sortDir = "asc";
  }

  // dirFactor = 1 für asc, -1 für desc
  if (sortState.sortDir === "asc") {
    dirFactor = 1;
  } else {
    dirFactor = -1;
  }

  // Kopie erstellen, damit data unverändert bleibt
  rowsCopy = copyArray(emissionsdaten);

  // Sortieren (Standard in JS: Array.sort)
  rowsCopy.sort(function (a, b) {
    let av;
    let bv;

    av = a[key];
    bv = b[key];

    // Wenn beide Werte Zahlen sind (z.B. co2), rechnen wir direkt
    if (typeof av === "number" && typeof bv === "number") {
      return (av - bv) * dirFactor;
    }

    // Sonst behandeln wir es als Text und vergleichen alphabetisch
    // localeCompare ist gut für Umlaute und deutsche Sortierung
    return String(av).localeCompare(String(bv), "de") * dirFactor;
  });

  // Ergebnis anzeigen
  renderTable(rowsCopy);
}

/*
  7) copyArray(arr)
  Wir bauen eine Kopie des Arrays, ohne moderne Kurzschreibweisen.
  (Warum? Damit wir original data nicht durch sort() verändern.)
*/
function copyArray(arr) {
  let copy;
  let i;

  copy = [];
  for (i = 0; i < arr.length; i = i + 1) {
    copy.push(arr[i]);
  }
  return copy;
}

/*
  8) Buttons mit Funktionen verbinden (Event Listener)
*/
const btnSortCountry = document.getElementById("btnSortCountry");
const btnSortCompany = document.getElementById("btnSortCompany");
const btnSortCo2 = document.getElementById("btnSortCo2");

btnSortCountry.addEventListener("click", function () {
  sortBy("country");
});

btnSortCompany.addEventListener("click", function () {
  sortBy("company");
});

btnSortCo2.addEventListener("click", function () {
  sortBy("co2");
});


