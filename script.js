console.log("Portfolio Website Loaded Successfully");
const menuToggle = document.getElementById('menu-toggle');

const mobileNav = document.getElementById('mobile-nav');

menuToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
});

document.querySelectorAll('#mobile-nav a').forEach(link => {

  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
  });

});
