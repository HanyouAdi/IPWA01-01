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
  { country: "Deutschland", company: "NordEastTech AG", co2: 8.1 },
  { country: "Deutschland", company: "Wels Energy GmbH", co2: 79850 },
  { country: "Frankreich", company: "EcoIndustrie SA", co2: 42950 },
  { country: "USA", company: "StripesCarbon Inc.", co2: 25.3 },
  { country: "USA", company: "MoonGrid LLC", co2: 18.9 },
  { country: "Japan", company: "Yokai Metals", co2: 14.2 },
  { country: "China", company: "RedSun Industrial Components", co2: 89300 }, // 89.300 anpassen????
  { country: "Österreich", company: "Green Systems AG", co2: 10630 },
  { country: "USA", company: "Frontier Data Centers LLC", co2: 44120 },
  { country: "Litauen", company: "Baltic Industrial Services SIA", co2: 12980 },
  { country: "Deutschland", company: "ElbeLogistik Industrie AG", co2: 22890 },
  { country: "Australien", company: "Pacific Renewable Infrastructure", co2: 26540 },
  { country: "Kanada", company: "Green Resource Group", co2: 39750 },
  { country: "Schweden", company: "Nordic Future AB", co2: 9650 },
  { country: "Frankreich", company: "Atlantique Transport Industriel", co2: 33640 },
  { country: "Vietnam", company: "Siam Industrial Dynamics", co2: 24860 },
  { country: "Luxemburg", company: "LuxGreen Financial Services SA", co2: 7880 },
  { country: "Deutschland", company: "Nordstahl Produktion GmbH", co2: 34900 },
  { country: "Chile", company: "Andes Copper Solutions", co2: 23980 },
  { country: "Kanada", company: "Evergreen Forest Products", co2: 22480 },
  { country: "China", company: "Golden River Electronics", co2: 72450 },
  { country: "Griechenland", company: "Feta Industrial Solutions", co2: 19680 },
  { country: "Norwegen", company: "FjordRenew", co2: 6980 },
  { country: "Deutschland", company: "Delta Circular", co2: 11200 },
  { country: "USA", company: "Sunbelt Logistics Group", co2: 38750 },
  { country: "Frankreich", company: "NordEst Matériaux Durables", co2: 18920 },
  { country: "Australien", company: "Southern Minerals Group", co2: 62980 },
  { country: "Indien", company: "Bharat Heavy Systems Ltd.", co2: 62300 },
  { country: "Estland", company: "Nordic Digital Manufacturing OÜ", co2: 8320 },
  { country: "Kanada", company: "Pacific Rail Logistics", co2: 31900 },
  { country: "Japan", company: "Sakura Energy Systems", co2: 22780 },
  { country: "Deutschland", company: "GreenGrid Systems GmbH", co2: 14620 },
  { country: "Australien", company: "BlueGum Industrial Logistics", co2: 41110 },
  { country: "Ungarn", company: "DanubeTech Kft.", co2: 20140 },
  { country: "China", company: "Eastern Horizon Logistics", co2: 64700 },
  { country: "Kanada", company: "MapleCore Resources Inc.", co2: 29840 },
  { country: "Brasilien", company: "Amazônia Processos Industriais", co2: 48200 },
  { country: "Frankreich", company: "HexaTech Production SA", co2: 29780 },
  { country: "USA", company: "IronPeak Industrial Systems Inc.", co2: 52400 },
  { country: "Türkei", company: "Anatolia Steel Works", co2: 33120 },
  { country: "Slowenien", company: "Alpine Circular Solutions d.o.o.", co2: 9450 },
  { country: "Kanada", company: "NorthStar Materials Corp.", co2: 28940 },
  { country: "Polen", company: "Vistula Manufacturing", co2: 27300 },
  { country: "Australien", company: "Outback Resource Engineering", co2: 58300 },
  { country: "Frankreich", company: "Lumière Industrie Énergie", co2: 24350 },
  { country: "China", company: "Pearl Delta Manufacturing Group", co2: 96880 },
  { country: "Finnland", company: "Arctic BioTech", co2: 7450 },
  { country: "USA", company: "Midwest Chemical Solutions", co2: 61300 },
  { country: "Irland", company: "Emerald Data Services Ltd.", co2: 25900 },
  { country: "Griechenland", company: "Hellas Energy Systems", co2: 14350 },
  { country: "Belgien", company: "EcoForge NV", co2: 16950 },
  { country: "USA", company: "Pacific Alloy Manufacturing", co2: 47980 },
  { country: "Vietnam", company: "Mekong Manufacturing Corp.", co2: 22300 },
  { country: "Deutschland", company: "Bavaria Precision Manufacturing", co2: 19750 },
  { country: "Ägypten", company: "NileTech Manufacturing", co2: 28560 },
  { country: "Dänemark", company: "WindCore Danmark", co2: 9120 },
  { country: "Kanada", company: "Great Lakes Steel Ltd.", co2: 41250 },
  { country: "China", company: "Jade Dragon Heavy Industries", co2: 128600 },
  { country: "Kroatien", company: "Adriatic EcoIndustries", co2: 11890 },
  { country: "Marokko", company: "Atlas Green Works", co2: 15890 },
  { country: "Litauen", company: "Baltic Future Systems", co2: 10540 },
  { country: "Deutschland", company: "GreenTech Solutions GmbH", co2: 12450 },
  { country: "Argentinien", company: "PampaAgro Industrial SA", co2: 26750 },
  { country: "Norwegen", company: "Atlantic Renewables", co2: 13770 },
  { country: "Südafrika", company: "Ubuntu Industrial Holdings", co2: 37400 },
  { country: "Spanien", company: "VerdeLogística SA", co2: 19430 },
  { country: "Österreich", company: "AlpenWert Energie GmbH", co2: 8740 },
  { country: "Tschechien", company: "Bohemia Industrial Group", co2: 21850 },
  { country: "Mexiko", company: "Azteca Manufacturing Group", co2: 31670 },
  { country: "Dänemark", company: "Kiwi Sustainable Industries", co2: 9980 },
  { country: "Vereinigtes Königreich", company: "CarbonEdge Industries PLC", co2: 34500 },
  { country: "Südkorea", company: "HanSeong Advanced Materials", co2: 41900 },
  { country: "Vereinigtes Königreich", company: "StraitTech Global", co2: 17420 }
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


