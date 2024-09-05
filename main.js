// Liste der Schülernamen
const schueler = ["Yasin", "Thomas", "Fabio", "Hüseyin", "Oguz", 
    "Daniel", "Kevin", "Lara", "Julian", "Ju", 
    "Maryam", "Alireza"];
  
  // Prüfe, ob Fortschritt in localStorage vorhanden ist
  // Speichert die Daten in der Seite
  let remainingSchueler = JSON.parse(localStorage.getItem('remainingSchueler')) || [...schueler];
  let selectedSchueler = JSON.parse(localStorage.getItem('selectedSchueler')) || [];
  
  // Funktion, um die Listen der Schüler im DOM zu aktualisieren
  function updateLists() {
    const remainingList = document.querySelector('#remainingList');
    const selectedList = document.querySelector('#selectedList');
  
    // Liste der verbleibenden Schüler aktualisieren
    remainingList.innerHTML = '';
    remainingSchueler.forEach(schueler => {
      const li = document.createElement('li');
      li.innerText = schueler;
      remainingList.appendChild(li);
    });
  
    // Liste der ausgewählten Schüler aktualisieren
    selectedList.innerHTML = '';
    selectedSchueler.forEach(schueler => {
      const li = document.createElement('li');
      li.innerText = schueler;
      selectedList.appendChild(li);
    });
  }
  
  // Funktion, um Fortschritt in localStorage zu speichern
  function saveProgress() {
    localStorage.setItem('remainingSchueler', JSON.stringify(remainingSchueler));
    localStorage.setItem('selectedSchueler', JSON.stringify(selectedSchueler));
  }
  
  // Funktion, um einen Schüler zufällig auszuwählen
  function pickRandomSchueler() {
    if (remainingSchueler.length === 0) {
    // Wenn alle Schüler schon drangekommen sind, Liste zurücksetzen
    remainingSchueler = [...schueler];
    selectedSchueler = [];
    alert('Alle Schüler waren dran, beginnt von vorne!');
    }
  
    // Zufälligen Index auswählen
    const randomIndex = Math.floor(Math.random() * remainingSchueler.length);
    const selected = remainingSchueler[randomIndex];
  
    // Entfernen des ausgewählten Schülers und hinzufügen zur ausgewählten Liste
    remainingSchueler.splice(randomIndex, 1);
    selectedSchueler.push(selected);
  
    // Ausgewählten Schüler im DOM anzeigen mit Animation
    const output = document.querySelector('#output');
    output.innerText = selected;
    output.classList.remove('show');
    setTimeout(() => {
      output.classList.add('show');
    }, 100); // Verzögerung für die Animation
  
    // Listen und Fortschritt aktualisieren
    updateLists();
    saveProgress();
  }
  
  // Funktion, um Fortschritt zurückzusetzen
  function resetSchueler() {
    remainingSchueler = [...schueler];
    selectedSchueler = [];
    updateLists();
    saveProgress();
  }
  
  // Event Listener für den Button "Nächster Schüler"
  document.querySelector('#randomizeBtn').addEventListener('click', pickRandomSchueler);
  
  // Event Listener für Reset Button
  document.querySelector('#resetBtn').addEventListener('click', resetSchueler);
  
  // Initiale Anzeige der Listen
  updateLists();
  