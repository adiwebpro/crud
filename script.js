let diaryEntries = [];
let editIndex = -1;

document.getElementById('diaryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('entryTitle').value;
    const content = document.getElementById('entryContent').value;

    if (editIndex === -1) {
        // Create
        const entry = {
            id: diaryEntries.length + 1,
            title: title,
            content: content
        };
        diaryEntries.push(entry);
    } else {
        // Update
        diaryEntries[editIndex].title = title;
        diaryEntries[editIndex].content = content;
        editIndex = -1;
    }

    document.getElementById('diaryForm').reset();
    renderTable();
});

function renderTable() {
    const tbody = document.getElementById('diaryTable').querySelector('tbody');
    tbody.innerHTML = '';

    diaryEntries.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.id}</td>
            <td>${entry.title}</td>
            <td>${entry.content}</td>
            <td>
                <button onclick="editEntry(${index})">Edit</button>
                <button onclick="deleteEntry(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editEntry(index) {
    editIndex = index;
    const entry = diaryEntries[index];
    document.getElementById('entryId').value = entry.id;
    document.getElementById('entryTitle').value = entry.title;
    document.getElementById('entryContent').value = entry.content;
}

function deleteEntry(index) {
    diaryEntries.splice(index, 1);
    renderTable();
}