// Selectors
const noteForm = document.querySelector('#noteForm');
const noteTitleInput = document.querySelector('#noteTitle');
const noteContentInput = document.querySelector('#noteContent');
const notesList = document.querySelector('#notesList');

// Event Listeners
noteForm.addEventListener('submit', addNote);
notesList.addEventListener('click', handleNoteAction);

// Functions
function addNote(e) {
    e.preventDefault();

    const noteTitle = noteTitleInput.value.trim();
    const noteContent = noteContentInput.value.trim();
    if (noteTitle === '' || noteContent === '') return;

    const note = {
        id: Date.now(),
        title: noteTitle,
        content: noteContent,
        date: new Date().toISOString()
    };

    const notes = getNotes();
    notes.push(note);
    saveNotes(notes);
    renderNotes();

    noteTitleInput.value = '';
    noteContentInput.value = '';
}

function handleNoteAction(e) {
    const noteCard = e.target.closest('.note-card');
    if (!noteCard) return;

    if (e.target.classList.contains('edit-btn')) {
        editNote(noteCard.dataset.id);
    } else if (e.target.classList.contains('delete-btn')) {
        deleteNote(noteCard.dataset.id);
    } else {
        toggleNoteExpansion(noteCard);
    }
}

function editNote(id) {
    const notes = getNotes();
    const noteToEdit = notes.find(note => note.id === parseInt(id));
    if (noteToEdit) {
        noteTitleInput.value = noteToEdit.title;
        noteContentInput.value = noteToEdit.content;
        deleteNote(id);
    }
}

function deleteNote(id) {
    let notes = getNotes();
    notes = notes.filter(note => note.id !== parseInt(id));
    saveNotes(notes);
    renderNotes();
}

function getNotes() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
    const notes = getNotes();
    notesList.innerHTML = '';

    notes.sort((a, b) => new Date(b.date) - new Date(a.date));

    notes.forEach(note => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';
        noteCard.dataset.id = note.id;

        const formattedDate = new Date(note.date).toLocaleString();

        noteCard.innerHTML = `
            <h3>${note.title}</h3>
            <p class="date">${formattedDate}</p>
            <p class="content">${note.content}</p>
            <button class="btn edit-btn">Edit</button>
            <button class="btn delete-btn">Delete</button>
        `;

        notesList.appendChild(noteCard);
    });
}

function toggleNoteExpansion(noteCard) {
    noteCard.classList.toggle('expanded');
}

// Initial render
renderNotes();