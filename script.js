console.log("Portfolio Website Loaded Successfully");
const menuToggle = document.getElementById('menu-toggle');

const mobileNav = document.getElementById('mobile-nav');

const icon = menuToggle.querySelector('i');

menuToggle.addEventListener('click', () => {

  mobileNav.classList.toggle('active');

  if (mobileNav.classList.contains('active')) {

    icon.classList.remove('fa-bars');
    icon.classList.add('fa-xmark');

  } else {

    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  }

});

/* Close after click */

document.querySelectorAll('#mobile-nav a').forEach(link => {

  link.addEventListener('click', () => {

    mobileNav.classList.remove('active');

    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');

  });

});
