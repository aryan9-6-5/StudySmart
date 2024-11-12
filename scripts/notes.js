document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('noteForm');
    const notesList = document.getElementById('notesList');
    const notePopup = document.getElementById('notePopup');
    const popupTitle = document.getElementById('popupTitle');
    const popupContent = document.getElementById('popupContent');
    const closePopupBtn = document.getElementById('closePopup');

    // Create popup overlay
    const popupOverlay = document.createElement('div');
    popupOverlay.classList.add('popup-overlay');
    document.body.appendChild(popupOverlay);

    // Load and display existing notes on page load
    displayNotes();

    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('noteTitle').value.trim();
        const content = document.getElementById('noteContent').value.trim();
        
        if (title && content) {
            // Save note to localStorage
            saveNote(title, content);
            
            // Reset form
            noteForm.reset();
            
            // Refresh notes display
            displayNotes();
        }
    });

    function saveNote(title, content) {
        const notes = getNotes();
        const newNote = {
            id: Date.now(),
            title: title,
            content: content,
            date: new Date().toLocaleString()
        };
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function getNotes() {
        return JSON.parse(localStorage.getItem('notes')) || [];
    }

    function displayNotes() {
        const notes = getNotes();
        notesList.innerHTML = '';
        
        if (notes.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.textContent = 'No notes yet. Create your first note!';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.gridColumn = '1 / -1';
            emptyMessage.style.color = '#666';
            notesList.appendChild(emptyMessage);
            return;
        }

        notes.forEach(note => {
            const noteItem = createNoteElement(note);
            notesList.appendChild(noteItem);
        });
    }

    function createNoteElement(note) {
        const noteItem = document.createElement('div');
        noteItem.classList.add('note-item');
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '×';
        deleteBtn.setAttribute('title', 'Delete note');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteNote(note.id);
        });

        const content = document.createElement('div');
        content.classList.add('note-content');
        
        // Create truncated content for preview
        const truncatedContent = note.content.length > 150 
            ? note.content.substring(0, 150) + '...'
            : note.content;

        content.innerHTML = `
            <h3>${note.title}</h3>
            <small>${note.date}</small>
            <p>${truncatedContent}</p>
        `;

        noteItem.appendChild(deleteBtn);
        noteItem.appendChild(content);

        // Add click event to show full note
        noteItem.addEventListener('click', () => {
            showPopup(note);
        });

        return noteItem;
    }

    function showPopup(note) {
        popupTitle.textContent = note.title;
        popupContent.textContent = note.content;
        notePopup.style.display = 'block';
        popupOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function deleteNote(id) {
        if (confirm('Are you sure you want to delete this note?')) {
            const notes = getNotes().filter(note => note.id !== id);
            localStorage.setItem('notes', JSON.stringify(notes));
            displayNotes();
        }
    }

    // Close popup handlers
    closePopupBtn.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', closePopup);
    
    // Add keyboard support for closing popup
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && notePopup.style.display === 'block') {
            closePopup();
        }
    });

    function closePopup() {
        notePopup.style.display = 'none';
        popupOverlay.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
});