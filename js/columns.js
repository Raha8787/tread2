const container = document.getElementById('columns-container');
const form = document.getElementById('column-form');

const predefinedTitles = [
  { label: "نماد", type: "text" },
  { label: "نوع پوزیشن", type: "text" },
  { label: "حجم معامله", type: "number" },
  { label: "قیمت ورود", type: "number" },
  { label: "قیمت خروج", type: "number" },
  { label: "کارمزد", type: "number" },
  { label: "سود/زیان", type: "number" },
  { label: "تاریخ ورود", type: "date" },
  { label: "ساعت ورود", type: "time" },
  { label: "توضیحات", type: "textarea" },
  { label: "اسکرین‌شات", type: "file" }
];

function addColumn() {
  const wrapper = document.createElement('div');
  wrapper.className = 'column-row';

  const select = document.createElement('select');
  select.innerHTML = `<option value="">-- انتخاب عنوان --</option>` +
    predefinedTitles.map(t => `<option value="${t.label}">${t.label}</option>`).join('') +
    `<option value="custom">سفارشی...</option>`;

  const customInput = document.createElement('input');
  customInput.type = 'text';
  customInput.placeholder = 'عنوان دلخواه';
  customInput.style.display = 'none';

  select.onchange = () => {
    customInput.style.display = select.value === 'custom' ? 'inline' : 'none';
  };

  const typeSelect = document.createElement('select');
  typeSelect.innerHTML = `
    <option value="text">متن</option>
    <option value="number">عدد اعشاری</option>
    <option value="date">تاریخ</option>
    <option value="time">ساعت</option>
    <option value="file">فایل</option>
    <option value="textarea">توضیحات بلند</option>
  `;

  wrapper.appendChild(select);
  wrapper.appendChild(customInput);
  wrapper.appendChild(typeSelect);
  container.appendChild(wrapper);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const columnRows = document.querySelectorAll('.column-row');
  const result = [];

  columnRows.forEach(row => {
    const [select, customInput, typeSelect] = row.children;
    const label = select.value === 'custom' ? customInput.value.trim() : select.value;
    const type = typeSelect.value;
    if (label) result.push({ label, type });
  });

  if (result.length === 0) return alert('حداقل یک ستون وارد کنید.');
  const currentUser = localStorage.getItem('user');
  localStorage.setItem(`columns_${currentUser}`, JSON.stringify(result));
  location.href = 'journal.html';
});

