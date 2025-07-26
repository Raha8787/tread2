function login() {
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  const error = document.getElementById('error');

  if (!user || !pass) {
    error.textContent = 'نام کاربری و رمز را وارد کنید.';
    return;
  }

  if (user === 'admin') {
    if (pass === '1213123') {
      localStorage.setItem('user', 'admin');
      location.href = 'dashboard.html';
    } else {
      error.textContent = 'رمز ادمین اشتباه است!';
    }
  } else {
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    if (!users[user]) {
      users[user] = pass;
      localStorage.setItem('users', JSON.stringify(users));
    } else if (users[user] !== pass) {
      error.textContent = 'رمز نادرست است.';
      return;
    }
    localStorage.setItem('user', user);
    location.href = 'dashboard.html';
  }
}

function logout() {
  localStorage.removeItem('user');
  location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = localStorage.getItem('user');
  const welcome = document.getElementById('welcome');
  const adminBtn = document.getElementById('admin-btn');
  if (welcome) {
    welcome.textContent = 'خوش آمدید ' + currentUser;
    if (currentUser === 'admin') {
      adminBtn.style.display = 'block';
    }
  }
});
