
const defaultTitles = [
  'نماد', 'نوع پوزیشن', 'حجم معامله', 'قیمت ورود',
  'قیمت خروج', 'کارمزد', 'سود/زیان', 'تاریخ ورود',
  'ساعت ورود', 'توضیحات', 'اسکرین‌شات'
];

function addColumn(title = '', type = '') {
  const container = document.getElementById('column-container');
  const div = document.createElement('div');
  div.className = 'flex-row';
  div.innerHTML = `
    <select class="title-select">
      ${defaultTitles.map(t => `<option value="${t}" ${t === title ? 'selected' : ''}>${t}</option>`).join('')}
      <option value="custom">سفارشی...</option>
    </select>
    <input type="text" class="custom-title" placeholder="عنوان دلخواه" style="display:none;" />
    <select class="type-select">
      <option value="text">متن</option>
      <option value="number">عدد</option>
      <option value="date">تاریخ</option>
      <option value="time">ساعت</option>
      <option value="file">فایل (jpg/png)</option>
    </select>
    <button onclick="this.parentNode.remove()">❌</button>
  `;
  container.appendChild(div);
  const select = div.querySelector('.title-select');
  const input = div.querySelector('.custom-title');
  select.addEventListener('change', () => {
    input.style.display = select.value === 'custom' ? 'block' : 'none';
  });
}

function saveColumns() {
  const titles = [];
  document.querySelectorAll('#column-container .flex-row').forEach(row => {
    const title = row.querySelector('.title-select').value === 'custom'
      ? row.querySelector('.custom-title').value
      : row.querySelector('.title-select').value;
    const type = row.querySelector('.type-select').value;
    if (title.trim()) {
      titles.push({ title: title.trim(), type });
    }
  });
  localStorage.setItem('custom_columns', JSON.stringify(titles));
  location.href = 'journal.html';
}
