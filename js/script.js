// Initializing AOS library
window.addEventListener('DOMContentLoaded', function () {
  // AOS.init({
  //   duration: 1500,
  //   debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  //   throttleDelay: 99
  // })

  // Main text animation gsap
  const header = document.querySelector('header')
  const mainText1 = document.querySelector('.main-item-1 h3')
  const mainText2 = document.querySelector('.main-item-2')

  const nameText = document.getElementById('name')
  const textContent = nameText.textContent;

  nameText.innerHTML = textContent.split("").map(letter => {
    return letter === " " ? "&nbsp;" : `<span style="display: inline-block; position: relative;">${letter}</span>`;
  }).join("");


  gsap.from(header, {
    duration: 1,     // Duração da animação em segundos
    y: -100,            // Deslocamento vertical inicial
    opacity: 0,        // Começa invisível
    ease: "power2.out"
  })

  gsap.from(mainText1, {
    duration: 2,     // Duração da animação em segundos
    x: 100,            // Deslocamento vertical inicial
    opacity: 0,        // Começa invisível
    delay: .8,
    ease: "power2.out"
  })

  // Anima cada letra individualmente
  gsap.fromTo(
    "#name span",          // Seleciona cada span criado
    { opacity: 0, x: 60 }, // Estado inicial: opacidade zero e deslocamento para baixo
    {
      opacity: 1,
      x: 0,
      delay: 1.5,          // Atraso antes da animação começar
      stagger: 0.2,       // Intervalo entre a animação de cada letra
      duration: 1.3,        // Duração da animação para cada letra
      ease: "back.out(3)"
    }
  );

  gsap.from(mainText2, {
    duration: 2,
    x: -200,
    opacity: 0,
    delay: 4,
    ease: "power2.out"
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
const spacing = 15; // Spacing between dots
const dotSize = 2;  // Size of the dots
const repelDistance = 80; // Distance at which dots are repelled
let isMouseMoved = false; // Variable to track initial mouse movement

function setup() {
  const main = document.querySelector('main');
  const canvas = createCanvas(main.offsetWidth, main.offsetHeight);
  canvas.parent(main);

  gsap.from(canvas.elt, {
    duration: 5,
    opacity: 0,
    ease: "power2.out"
  });

  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      dots.push({ x: x, y: y, baseX: x, baseY: y, isRepelled: false });
    }
  }
}

function draw() {
  background('#010E1E'); // Dark background
  noStroke();
  fill('#024978'); // Dot color

  dots.forEach(dot => {
    if (isMouseMoved) {
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
          dot.isRepelled = false; // Stops moving when in original position
        }
      }
    }
    ellipse(dot.x, dot.y, dotSize);
  });
}

// Function to track initial mouse movement
function mouseMoved() {
  isMouseMoved = true;
}

// Adjust canvas as the browser window changes size
function windowResized() {
  const main = document.querySelector('main');
  resizeCanvas(main.offsetWidth, main.offsetHeight);
  dots = [];
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      dots.push({ x: x, y: y, baseX: x, baseY: y, isRepelled: false });
    }
  }
}

