
const columns = JSON.parse(localStorage.getItem('custom_columns') || '[]');
const form = document.getElementById('trade-form');
const thead = document.getElementById('table-head');
const tbody = document.getElementById('table-body');
let trades = JSON.parse(localStorage.getItem('trades') || '[]');

function renderForm() {
  form.innerHTML = '';
  columns.forEach((col, index) => {
    let input = '';
    if (col.type === 'text') {
      input = `<input type="text" name="${index}" placeholder="${col.title}" required>`;
    } else if (col.type === 'number') {
      input = `<input type="number" name="${index}" step="0.0001" placeholder="${col.title}" required>`;
    } else if (col.type === 'date') {
      input = `<input type="date" name="${index}" required>`;
    } else if (col.type === 'time') {
      input = `<input type="time" name="${index}" required>`;
    } else if (col.type === 'file') {
      input = `<input type="file" name="${index}" accept=".jpg,.jpeg,.png" required>`;
    }
    form.innerHTML += input;
  });
}

function renderTable() {
  thead.innerHTML = '<tr>' + columns.map(col => `<th>${col.title}</th>`).join('') + '</tr>';
  tbody.innerHTML = '';
  trades.forEach(t => {
    let tr = '<tr>';
    t.forEach((val, i) => {
      if (columns[i].type === 'file' && val.startsWith('data:image')) {
        tr += `<td><img src="${val}" width="40" /></td>`;
      } else {
        tr += `<td>${val}</td>`;
      }
    });
    tr += '</tr>';
    tbody.innerHTML += tr;
  });
}

function saveTrade() {
  const newTrade = [];
  const inputs = form.elements;
  for (let i = 0; i < columns.length; i++) {
    const col = columns[i];
    const input = inputs[i];
    if (col.type === 'file' && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        newTrade[i] = e.target.result;
        if (newTrade.length === columns.length) {
          trades.push(newTrade);
          localStorage.setItem('trades', JSON.stringify(trades));
          renderTable();
          form.reset();
        }
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      newTrade[i] = input.value;
    }
  }
  // If no file in trade, still push
  if (!newTrade.includes(undefined)) {
    trades.push(newTrade);
    localStorage.setItem('trades', JSON.stringify(trades));
    renderTable();
    form.reset();
  }
}

function goBack() {
  location.href = 'index.html';
}

renderForm();
renderTable();
