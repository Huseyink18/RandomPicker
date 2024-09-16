// Deine Schülerliste
const schueler = ["Yasin", "Thomas", "Fabio", "Hüseyin", "Oguz", "Daniel", "Kevin", "Lara", "Julian", "Ju", "Maryam", "Alireza"];

// Liste der anwesenden Schüler (diese wird durch die Anwesenheitsauswahl gefüllt)
let anwesendeSchueler = [];

// Liste der verbleibenden Schüler für den Random-Picker
let remainingSchueler = [];

// Liste der bereits ausgewählten Schüler
let selectedSchueler = [];

// Funktion, um die Anwesenheitsauswahl im DOM anzuzeigen
function createAttendanceList() {
    const attendanceList = document.querySelector('#attendanceList');
    attendanceList.innerHTML = '';

    schueler.forEach((schuelerName) => {
        const li = document.createElement('li');
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = "true";
        checkbox.id = schuelerName;

        const label = document.createElement('label');
        label.htmlFor = schuelerName;
        label.innerText = schuelerName;

        li.appendChild(checkbox);
        li.appendChild(label);
        attendanceList.appendChild(li);
    });
}

// Funktion, um die ausgewählten Schüler als anwesend zu speichern
function markAttendance() {
    const checkedBoxes = document.querySelectorAll('#attendanceList input:checked');
    anwesendeSchueler = Array.from(checkedBoxes).map(box => box.id);
    remainingSchueler = [...anwesendeSchueler];  // Setze die anwesenden Schüler als verbleibende Schüler
    updateRemainingList();
}

// Funktion, um die Liste der verbleibenden Schüler im DOM anzuzeigen
function updateRemainingList() {
    const remainingList = document.querySelector('#remainingList');
    remainingList.innerHTML = '';

    remainingSchueler.forEach((schuelerName) => {
        const li = document.createElement('li');
        li.innerText = schuelerName;
        remainingList.appendChild(li);
    });

    const selectedList = document.querySelector('#selectedList');
    selectedList.innerHTML = '';

    selectedSchueler.forEach((schuelerName) => {
        const li = document.createElement('li');
        li.innerText = schuelerName;
        selectedList.appendChild(li);
    });
}

// Funktion, um einen anwesenden Schüler zufällig auszuwählen
function pickRandomSchueler() {
    if (remainingSchueler.length === 0) {
        alert('Keine Schüler mehr übrig, beginnt von vorne!');
        resetSchueler();
        return;
    }

    const randomIndex = Math.floor(Math.random() * remainingSchueler.length);
    const selected = remainingSchueler[randomIndex];

    // Entfernen des ausgewählten Schülers aus der verbleibenden Liste und hinzufügen zur ausgewählten Liste
    remainingSchueler.splice(randomIndex, 1);
    selectedSchueler.push(selected);

    // Zeige den ausgewählten Schüler an
    const output = document.querySelector('#output');
    output.innerText = `${selected} wurde ausgewählt!`;

    // Aktualisiere die Listen
    updateRemainingList();
}

// Funktion, um die Listen zurückzusetzen
function resetSchueler() {
    remainingSchueler = [...anwesendeSchueler];
    selectedSchueler = [];
    updateRemainingList();
}

// Event Listener für den Button "Anwesende Schüler übernehmen"
document.querySelector('#markAttendanceBtn').addEventListener('click', markAttendance);

// Event Listener für den Button "Nächster Schüler"
document.querySelector('#randomizeBtn').addEventListener('click', pickRandomSchueler);

// Event Listener für Reset Button
document.querySelector('#resetBtn').addEventListener('click', resetSchueler);

// Initiale Anzeige der Anwesenheitsliste
createAttendanceList();
