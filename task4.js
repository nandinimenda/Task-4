// Theme Toggle
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Navigation Tabs
const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.content-section');

tabs.forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    const id = tab.dataset.section;

    sections.forEach(s => s.classList.toggle('visible', s.id === id));
    tabs.forEach(t => t.classList.toggle('active', t === tab));
  });
});

// Notes App
let notes = JSON.parse(localStorage.getItem('notes')) || [];
const noteContainer = document.getElementById('notesContainer');

function renderNotes() {
  noteContainer.innerHTML = '';
  notes.forEach((note, index) => {
    const div = document.createElement('div');
    div.className = 'box';
    div.innerHTML = `<span>${note}</span>
      <div>
        <button onclick="edit(${index})">✏️</button>
        <button onclick="del(${index})">🗑️</button>
      </div>`;
    noteContainer.appendChild(div);
  });
}

window.edit = i => {
  const updated = prompt('Edit your note:', notes[i]);
  if (updated) {
    notes[i] = updated.trim();
    saveNotes();
  }
};

window.del = i => {
  notes.splice(i, 1);
  saveNotes();
};

document.getElementById('addBtn').addEventListener('click', () => {
  const input = document.getElementById('noteText');
  const text = input.value.trim();
  if (text) {
    notes.push(text);
    input.value = '';
    saveNotes();
  }
});

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
}

renderNotes();

// Product Listing
const products = [
  { name: 'Smartwatch', cat: 'gadgets', price: 800, rating: 4.3, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWGvgMrXtBsGcK2oIB99u2ud8zI1cW89eS2w&s' },
  { name: 'Sneakers', cat: 'style', price: 1200, rating: 4.6, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3MECkuP6PJuQ5fLfryCdXTulVfNzebx2V0Q&s' },
  { name: 'Tablet', cat: 'gadgets', price: 15000, rating: 4.7, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKOyD1rUxkahjHU4upB2uZIwB7HxfSCWMRsA&s' },
  { name: 'Backpack', cat: 'style', price: 750, rating: 4.2, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUaRzG6NN8_5Rc-KtgwzE7sLWLEFbQTiUmWg&s' },
];

const grid = document.getElementById('productGrid');
const fcat = document.getElementById('filterCat');
const fsrt = document.getElementById('sortProducts');

function showProds() {
  let list = [...products];
  if (fcat.value !== 'all') list = list.filter(p => p.cat === fcat.value);
  if (fsrt.value === 'low') list.sort((a, b) => a.price - b.price);
  if (fsrt.value === 'high') list.sort((a, b) => b.price - a.price);
  if (fsrt.value === 'rating') list.sort((a, b) => b.rating - a.rating);

  grid.innerHTML = '';
  list.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `<img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <p>⭐ ${p.rating}</p>`;
    grid.appendChild(div);
  });
}

fcat.addEventListener('change', showProds);
fsrt.addEventListener('change', showProds);
showProds();
