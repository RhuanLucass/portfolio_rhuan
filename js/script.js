// Setting fixed main height on page load
function setFixedMainHeight() {
  const main = document.querySelector('main');
  main.style.height = `${window.innerHeight}px`;
}

window.addEventListener('load', setFixedMainHeight);
window.addEventListener('load', setFixedMainHeight);


// Active header on scroll
scrollHeader = () => {
  const nav = document.getElementById('header')

  if(this.scrollY >= 50) nav.classList.add('active-header')
  else nav.classList.remove('active-header')
}

window.addEventListener('scroll', scrollHeader)

// Toggle menu on mobile
const buttonMenuMobile = document.querySelector('.menu-mobile')
toggleMenu = () => {
  const span = buttonMenuMobile.querySelector('span')
  const menuMobile = document.querySelector('.menu-desktop')

  menuMobile.classList.toggle('active-menu-mobile')
  span.classList.toggle('toggle-button-menu')
}

buttonMenuMobile.addEventListener('click', toggleMenu)