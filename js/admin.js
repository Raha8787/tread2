const select = document.getElementById('user-select');
const adminHead = document.getElementById('admin-head');
const adminBody = document.getElementById('admin-body');
const users = JSON.parse(localStorage.getItem('users') || '{}');

Object.keys(users).forEach(user => {
  const opt = document.createElement('option');
  opt.value = user;
  opt.textContent = user;
  select.appendChild(opt);
});

select.addEventListener('change', () => {
  const username = select.value;
  const structure = JSON.parse(localStorage.getItem(`columns_${username}`) || '[]');
  const journal = JSON.parse(localStorage.getItem(`journal_${username}`) || '[]');
  adminHead.innerHTML = `<tr>${structure.map(s => `<th>${s.label}</th>`).join('')}</tr>`;
  adminBody.innerHTML = '';
  journal.forEach(row => {
    const tr = document.createElement('tr');
    structure.forEach(col => {
      const td = document.createElement('td');
      td.textContent = row[col.label] || '-';
      tr.appendChild(td);
    });
    adminBody.appendChild(tr);
  });
});

function goBack() {
  location.href = 'dashboard.html';
}
