const currentUser = localStorage.getItem('user');
const structure = JSON.parse(localStorage.getItem(`columns_${currentUser}`) || '[]');
const form = document.getElementById('trade-form');
const thead = document.getElementById('journal-head');
const tbody = document.getElementById('journal-body');
let data = JSON.parse(localStorage.getItem(`journal_${currentUser}`) || '[]');

function createForm() {
  structure.forEach(col => {
    const label = document.createElement('label');
    label.textContent = col.label;
    let input;
    if (col.type === 'textarea') {
      input = document.createElement('textarea');
    } else {
      input = document.createElement('input');
      input.type = col.type;
      if (col.type === 'number') input.step = '0.0001';
    }
    input.name = col.label;
    input.required = true;
    form.appendChild(label);
    form.appendChild(input);
  });

  const btn = document.createElement('button');
  btn.textContent = 'ثبت معامله';
  btn.type = 'submit';
  form.appendChild(btn);
}

function renderTable() {
  thead.innerHTML = `<tr>${structure.map(c => `<th>${c.label}</th>`).join('')}</tr>`;
  tbody.innerHTML = '';
  data.forEach(row => {
    const tr = document.createElement('tr');
    structure.forEach(col => {
      const td = document.createElement('td');
      td.textContent = row[col.label] || '-';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const entry = {};
  structure.forEach(col => {
    const value = form.elements[col.label].value;
    entry[col.label] = value;
  });
  data.push(entry);
  localStorage.setItem(`journal_${currentUser}`, JSON.stringify(data));
  form.reset();
  renderTable();
});

function goBack() {
  location.href = 'dashboard.html';
}

createForm();
renderTable();
