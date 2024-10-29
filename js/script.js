// Initializing AOS library
window.addEventListener('DOMContentLoaded', function () {
  AOS.init({
    duration: 1500,
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99
  })
})

// // Setting fixed main height on page load
function setFixedMainHeight() {
  const main = document.querySelector('main')
  main.style.height = `${window.innerHeight}px`
}

function setFixedMainHeightResize() {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  if (!isTouchDevice) {
    setFixedMainHeight()
  }
  setFixedMainHeight()
}

window.addEventListener('load', setFixedMainHeight)
window.addEventListener('resize', setFixedMainHeightResize)
window.addEventListener('orientationchange', setFixedMainHeight);


// Active header on scroll
scrollHeader = () => {
  const nav = document.getElementById('header')

  if (this.scrollY >= 50) nav.classList.add('active-header')
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




// Animated background on mouse hover
let dots = [];
const spacing = 15; // Espaçamento entre as bolinhas
const dotSize = 2;  // Tamanho das bolinhas
const repelDistance = 80; // Distância de dispersão das bolinhas

function setup() {
  const main = document.querySelector('main')
  const canvas = createCanvas(main.offsetWidth, main.offsetHeight)
  canvas.parent(main)

  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      dots.push({ x: x, y: y, baseX: x, baseY: y, isRepelled: false });
    }
  }
}

function draw() {
  background('#010E1E'); // Fundo escuro
  noStroke();
  fill('#024978'); // Cor das bolinhas


  dots.forEach(dot => {
    const distance = dist(mouseX, mouseY, dot.baseX, dot.baseY);
    if (distance < repelDistance) {
      dot.isRepelled = true;
      const angle = atan2(dot.baseY - mouseY, dot.baseX - mouseX);
      dot.x = lerp(dot.x, dot.baseX + cos(angle) * repelDistance, 0.2);
      dot.y = lerp(dot.y, dot.baseY + sin(angle) * repelDistance, 0.2);
    } else if (dot.isRepelled) {
      dot.x = lerp(dot.x, dot.baseX, 0.1);
      dot.y = lerp(dot.y, dot.baseY, 0.1);
      if (abs(dot.x - dot.baseX) < 0.1 && abs(dot.y - dot.baseY) < 0.1) {
        dot.isRepelled = false; // Para de mover quando está na posição original
      }
    }
    ellipse(dot.x, dot.y, dotSize);
  });
}

// Ajusta a tela conforme a janela do navegador muda
function windowResized() {
  const main = document.querySelector('main')
  resizeCanvas(main.offsetWidth, main.offsetHeight);
  dots = [];
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      dots.push({ x: x, y: y, baseX: x, baseY: y, isRepelled: false });
    }
  }
}