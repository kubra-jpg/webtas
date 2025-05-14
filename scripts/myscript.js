document.addEventListener('DOMContentLoaded', () => {
  // 1) Kayıt formu verilerini kaydetme (sadece index.html’deki form için)
  const form = document.getElementById('registrationForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const firstName = document.getElementById('firstName').value.trim();
      const lastName  = document.getElementById('lastName').value.trim();
      if (firstName && lastName) {
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        alert('Kayıt başarılı!');
        form.reset();
      }
    });
  }

  // 2) LocalStorage’dan kayıtlı isimleri alma
  const firstName = localStorage.getItem('firstName');
  const lastName  = localStorage.getItem('lastName');

  // 3) Sadece ana sayfada (index.html veya kök) hoş geldiniz mesajı göster
  const path    = window.location.pathname.toLowerCase();
  const isIndex = path.endsWith('index.html') || path.endsWith('/');
  if (firstName && lastName && isIndex) {
    alert(`Hoş geldiniz, ${firstName} ${lastName}!`);
  }

  // 4) Footer içindeki kullanıcı selamlamasını güncelle
  const footerUser = document.getElementById('footer-user');
  if (footerUser) {
    footerUser.textContent = (firstName && lastName)
      ? `Oturum Açık: ${firstName} ${lastName}`
      : 'Oturum Açık: Misafir';
  }
});