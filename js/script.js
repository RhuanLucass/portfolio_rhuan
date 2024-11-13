// // Initializing AOS library
window.addEventListener('DOMContentLoaded', function () {
  // Main text animation gsap
  // Function to prevent default events
  const preventScroll = (e) => {
    e.preventDefault()
  }

  // Function to disable scroll events
  const disableScroll = () => {
    window.addEventListener('wheel', preventScroll, { passive: false }); // Mouse wheel event
    // window.addEventListener('touchmove', preventScroll, { passive: false });  // Touch events
    // window.addEventListener('keydown', preventScroll, { passive: false }); // Keyboard down events
    // Events considered passive normally do not accept code interference, so it is necessary to disable it
  }

  // Function to enable scroll events
  const enableScroll = () => {
    window.removeEventListener('wheel', preventScroll);
    // window.removeEventListener('touchmove', preventScroll);
    // window.removeEventListener('keydown', preventScroll);
  }

  // Create the gsap timeline
  const tl = gsap.timeline({
    // onStart: disableScroll,
    onComplete: () => {
      // enableScroll()
      tlInfinite.play()

      if (isTouchDevice) {
        tlMobile.play();
      }
    }
  })

  const tlInfinite = gsap.timeline({ paused: true })
  const tlMobile = gsap.timeline({ paused: true })

  const header = document.querySelector('header')
  const h4Text1 = document.querySelector('.main-item-1 h4')
  const h4Text2 = document.querySelector('.main-item-2 h4')
  const h2Text2 = document.querySelectorAll('.main-item-2 h2')
  const mainText3 = document.querySelector('.main-item-3')
  const circlesTouchMobile = document.querySelectorAll('.circles-wrapper span')
  const infiniteTextWrapper = document.querySelector('.infinite-text-wrapper')
  const infiniteText = infiniteTextWrapper.querySelector('h4')

  const nameText = document.getElementById('name')
  const textContent = nameText.textContent;

  nameText.innerHTML = textContent.split("").map(letter => {
    return letter === " " ? "&nbsp;" : `<span style="display: inline-block; position: relative;">${letter}</span>`;
  }).join("");


  const timelineGSAP = () => {
    tl.fromTo(header, 1, {
      y: -100,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      ease: "power2.out"
    })
      .fromTo(h4Text1, 2, {
        x: 100,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        ease: "power2.out"
      }, "-=.4")
      // Animate each letter individually
      .fromTo("#name span", 1.3,           // Select each created span
        {                  // initial state: zero opacity and down shift
          opacity: 0,
          x: 60
        }, {
        opacity: 1,
        x: 0,
        // delay: 1.5,          // Delay before animation starts
        stagger: 0.2,       // Interval between each letter animation
        ease: "back.out(3)"
      }, "-=1.3")
      .fromTo(h4Text2, 2, {
        x: -200,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        ease: "power2.out"
      }, "-=1.3")
      .fromTo(h2Text2, 2, {
        x: -200,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        stagger: 0.4,
        ease: "power2.out",
        // onComplete: enableScroll
      }, "-=1")
    // .fromTo(infiniteTextWrapper, 25, {
    //   x: '140%',
    // }, {
    //   x: '-350%',
    //   ease: 'linear',
    //   onComplete: () => gsap.to(infiniteTextWrapper, { opacity: 0 })
    // }, '-=1')


    if (isTouchDevice) {
      console.log('mobile')
      tlMobile.fromTo(mainText3, 1.5, {
        opacity: 0,
      }, {
        opacity: 1,
        // ease: "power2.out",
        repeat: 3,
        yoyo: true,
        onComplete: () => {
          gsap.to(mainText3, { opacity: 0 });
        }
      }, "textTouch", "-=1")
        .fromTo(circlesTouchMobile, 1.5, {
          scale: .6
        }, {
          scale: 1,
          // ease: "power2.out",
          repeat: 3,
          yoyo: true,
          onComplete: () => {
            gsap.to(circlesTouchMobile, { opacity: 0 })
          }
        }, "textTouch-=0")
    }

  }
  timelineGSAP()

})



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
  const mainRect = mainSection.getBoundingClientRect()
  const offset = 400 // ajuste este valor conforme necessário

  if (mainRect.bottom <= offset) {
    nav.classList.add('active-header')
  } else {
    nav.classList.remove('active-header')
  }
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
// const backgroundDots = () => {
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const main = document.querySelector('main');
let dots = [];
let mouseX = undefined;
let mouseY = undefined;
let animationFrame = null;

// Configurações
const SPACING = 20;        // Espaço entre os pontos
const DOT_SIZE = 1.5;      // Tamanho dos pontos
const REPEL_DISTANCE = 80; // Distância de repulsão
const DOT_COLOR = '#024978';
const BG_COLOR = '#010E1E';

// Inicialização
function init() {
  setupCanvas();
  createDots();
  addEventListeners();
  startAnimation();

  // Fade in inicial
  gsap.from(canvas, {
    duration: 3,
    opacity: 0,
    ease: "power2.out"
  });
}

// Configurar canvas
function setupCanvas() {
  canvas.width = main.offsetWidth;
  canvas.height = main.offsetHeight;
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  main.appendChild(canvas);
}

// Criar grade de pontos
function createDots() {
  dots = [];
  const columns = Math.floor(canvas.width / SPACING);
  const rows = Math.floor(canvas.height / SPACING);

  for (let i = 0; i <= columns; i++) {
    for (let j = 0; j <= rows; j++) {
      const x = i * SPACING;
      const y = j * SPACING;
      dots.push({
        x: x,
        y: y,
        baseX: x,
        baseY: y,
        originalX: x,
        originalY: y
      });
    }
  }
}

// Adicionar event listeners
function addEventListeners() {
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('touchmove', handleTouchMove, { passive: false });
  window.addEventListener('resize', handleResize);
}

// Remover event listeners
function removeEventListeners() {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('touchmove', handleTouchMove);
  window.removeEventListener('resize', handleResize);
}

// Handlers de eventos
function handleMouseMove(e) {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;

  // Ajustar coordenadas para escala do canvas
  mouseX = (mouseX * canvas.width) / rect.width;
  mouseY = (mouseY * canvas.height) / rect.height;
}

function handleTouchMove(e) {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  mouseX = touch.clientX - rect.left;
  mouseY = touch.clientY - rect.top;

  // Ajustar coordenadas para escala do canvas
  mouseX = (mouseX * canvas.width) / rect.width;
  mouseY = (mouseY * canvas.height) / rect.height;
}

// Função de redimensionamento com debounce
let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);

  // Fade out durante o redimensionamento
  gsap.to(canvas, {
    duration: 0.3,
    opacity: 0,
    ease: "power2.out"
  });

  resizeTimeout = setTimeout(() => {
    stopAnimation();

    // Atualizar dimensões do canvas
    canvas.width = main.offsetWidth;
    canvas.height = main.offsetHeight;

    // Recriar pontos
    createDots();

    // Reiniciar animação
    startAnimation();

    // Fade in após o redimensionamento
    gsap.to(canvas, {
      duration: 0.5,
      opacity: 1,
      ease: "power2.out"
    });
  }, 200);
}

// Controle de animação
function startAnimation() {
  if (!animationFrame) {
    animate();
  }
}

function stopAnimation() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
}

// Loop de animação
function animate() {
  // Limpar canvas
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Atualizar e desenhar pontos
  dots.forEach(dot => {
    let targetX = dot.baseX;
    let targetY = dot.baseY;

    // Se o mouse estiver próximo, calcular repulsão
    if (mouseX !== undefined && mouseY !== undefined) {
      const dx = mouseX - dot.baseX;
      const dy = mouseY - dot.baseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < REPEL_DISTANCE) {
        const force = (1 - distance / REPEL_DISTANCE) * REPEL_DISTANCE;
        targetX = dot.baseX - (dx / distance) * force;
        targetY = dot.baseY - (dy / distance) * force;
      }
    }

    // Atualizar posição com suavização
    dot.x = dot.x + (targetX - dot.x) * 0.1;
    dot.y = dot.y + (targetY - dot.y) * 0.1;

    // Desenhar ponto
    ctx.beginPath();
    ctx.fillStyle = DOT_COLOR;
    ctx.arc(dot.x, dot.y, DOT_SIZE, 0, Math.PI * 2);
    ctx.fill();
  });

  animationFrame = requestAnimationFrame(animate);
}

// Função de limpeza
function cleanup() {
  stopAnimation();
  removeEventListeners();
  canvas.remove();
}

// Iniciar
init();

// Exportar função de limpeza para uso externo se necessário
window.cleanupDots = cleanup;
// }



// Works animation with scrollTrigger

gsap.registerPlugin(ScrollTrigger)

const tlScrollMain = gsap.timeline({
  scrollTrigger: {
    // markers: true,
    trigger: 'main',
    start: "top 0%",
    end: "center 0%",
    scrub: 2,
    pin: true,
  }
})

tlScrollMain.to('.main-item-1', {
  y: '250%',
  x: '-30%',
  scale: 1.5,
})
  .to('.main-item-2', {
    x: '-100%',
    opacity: 0,
    scale: 0.4
  }, '<')


gsap.utils.toArray(".project-single").forEach((project, index, projects) => {

  const tlWorks = gsap.timeline({
    scrollTrigger: {
      // markers: true,
      trigger: project,
      start: "50% 50%",
      end: "bottom 0%",
      scrub: 2.5,
      pin: true,
      // pinSpacing: true
    }
  })

  tlWorks.fromTo(project, {
    scale: 0.4,
    y: '30%',
    x: '50%'
  }, {
    scale: 1,
    y: '0%',
    x: '0%'
  })
    .to(project, {
      scale: 1,
      y: '0%',
      x: '0%'
    })
    .fromTo(project, {
      scale: 1,
      y: '0%',
      x: '0%'
    }, {
      scale: 0.4,
      y: '-50%',
      x: '-50%'
    })
    .to(project, {
      scale: 0.4,
      y: '-60%',
      x: '-60%'
    })
})