

// // Setting fixed main height on page load
// const main = document.querySelector('main')
// function setFixedMainHeight() {
//   main.style.height = `${window.innerHeight}px`
// }

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
// function setFixedMainHeightResize() {
//   if (!isTouchDevice) {
//     setFixedMainHeight()
//   }
//   setFixedMainHeight()
// }

// window.addEventListener('load', setFixedMainHeight)
// window.addEventListener('resize', setFixedMainHeightResize)
// window.addEventListener('orientationchange', setFixedMainHeight);



// Active header on scroll
const nav = document.getElementById('header')
const mainSection = document.querySelector('main')

const scrollHeader = () => {
  if (this.scrollY >= 50) {
    nav.classList.add('active-header')
  } else {
    nav.classList.remove('active-header')
  }
}

window.addEventListener('scroll', scrollHeader)



// Toggle menu on mobile
const buttonMenuMobile = document.querySelector('.menu-mobile')
const toggleMenu = () => {
  const span = buttonMenuMobile.querySelector('span')
  const menuMobile = document.querySelector('.menu-desktop')

  menuMobile.classList.toggle('active-menu-mobile')
  span.classList.toggle('toggle-button-menu')
}

buttonMenuMobile.addEventListener('click', toggleMenu)
