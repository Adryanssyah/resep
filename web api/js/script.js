var mode = document.querySelector('.mode');
var mode2 = document.querySelector('.isi-header .mode');
var element = document.body;
var navbar = document.querySelector('navbar');
var link = document.getElementById('dark');
let onpageLoad = localStorage.getItem('theme') || '';

// cek settingan browser apakah dalam mode dark atau tidak
if (onpageLoad === 'dark-mode') {
      navbar.classList.toggle('nav-dark');
      element.classList.toggle('dark-mode');
      // CEK JIKA LINK DARK SDH PUNYA HREF
      if (link.hasAttribute('href')) {
            link.removeAttribute('href');
      } else {
            link.setAttribute('href', 'styles/dark.css');
      }
}

// TOMBOL DARK MODE DI HEADER
mode2.addEventListener('click', function () {
      navbar.classList.toggle('nav-dark');
      element.classList.toggle('dark-mode');
      // CEK JIKA LINK DARK SDH PUNYA HREF
      if (link.hasAttribute('href')) {
            link.removeAttribute('href');
      } else {
            link.setAttribute('href', 'styles/dark.css');
      }

      let theme = localStorage.getItem('theme');
      if (theme && theme === 'dark-mode') {
            localStorage.setItem('theme', '');
      } else {
            localStorage.setItem('theme', 'dark-mode');
      }
});

// TOMBOL DARK MODE DI NAVBAR
mode.addEventListener('click', function () {
      navbar.classList.toggle('nav-dark');
      element.classList.toggle('dark-mode');
      // CEK JIKA LINK DARK SDH PUNYA HREF
      if (link.hasAttribute('href')) {
            link.removeAttribute('href');
      } else {
            link.setAttribute('href', 'styles/dark.css');
      }

      let theme = localStorage.getItem('theme');
      if (theme && theme === 'dark-mode') {
            localStorage.setItem('theme', '');
      } else {
            localStorage.setItem('theme', 'dark-mode');
      }
});
