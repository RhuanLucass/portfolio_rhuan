// Initializing AOS library
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
    onStart: disableScroll, // Disable scroll events on start
    onComplete: enableScroll // Enable scroll events on complete
  })

  const header = document.querySelector('header')
  const h3Text1 = document.querySelector('.main-item-1 h3')
  const h3Text2 = document.querySelector('.main-item-2 h3')
  const h2Text2 = document.querySelectorAll('.main-item-2 h2')
  const textTouchMobile = document.querySelector('.text-touch-mobile')
  const circlesTouchMobile = document.querySelectorAll('.circles-wrapper span')

  const nameText = document.getElementById('name')
  const textContent = nameText.textContent;

  nameText.innerHTML = textContent.split("").map(letter => {
    return letter === " " ? "&nbsp;" : `<span style="display: inline-block; position: relative;">${letter}</span>`;
  }).join("");


  tl.fromTo(header, 1, {
    y: -100,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    ease: "power2.out"
  })
    .fromTo(h3Text1, 2, {
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
    .fromTo(h3Text2, 2, {
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
      ease: "power2.out"
    }, "-=1")


  if (isTouchDevice) {
    tl.fromTo(textTouchMobile, 1, {
      opacity: 0,
    }, {
      opacity: 1,
      // ease: "power2.out",
      repeat: 4,
      yoyo: true,
      onComplete: () => {
        gsap.to(textTouchMobile, { opacity: 0 });
      }
    }, "textTouch", "-=1")
      .fromTo(circlesTouchMobile, 1, {
        opacity: 0,
        scale: .6
      }, {
        opacity: .7,
        scale: 1,
        // ease: "power2.out",
        repeat: 4,
        yoyo: true,
        onComplete: () => {
          gsap.to(circlesTouchMobile, { opacity: 0 });
        }
      }, "textTouch-=0")
  }

})



// // Setting fixed main height on page load
const main = document.querySelector('main')
function setFixedMainHeight() {
  main.style.height = `${window.innerHeight}px`
}

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
function setFixedMainHeightResize() {
  if (!isTouchDevice) {
    setFixedMainHeight()
  }
  setFixedMainHeight()
}

window.addEventListener('load', setFixedMainHeight)
window.addEventListener('resize', setFixedMainHeightResize)
window.addEventListener('orientationchange', setFixedMainHeight);



// Active header on scroll
const nav = document.getElementById('header')
scrollHeader = () => {

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
const spacing = 15 // Spacing between dots
const dotSize = 2.5 // Size of the dots
const repelDistance = 80 // Distance at which dots are repelled
let isMouseMoved = false // Variable to track initial mouse movement
let touchCount = 0 // Variable to track touch count

function setup() {
  const main = document.querySelector('main')
  const canvas = createCanvas(main.offsetWidth, main.offsetHeight)
  canvas.parent(main)

  gsap.from(canvas.elt, {
    duration: 3,
    opacity: 0,
    ease: "power2.out"
  })

  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      dots.push({ x: x, y: y, baseX: x, baseY: y, isRepelled: false })
    }
  }

  // Touch events for mobile devices
  main.addEventListener('touchstart', (e) => {
    touchCount = e.touches.length // Update touch count

    if (touchCount > 1) {
      e.preventDefault() // Prevent scrolling when multiple touches are detected
    }
  })

  main.addEventListener('touchmove', (e) => {
    if (touchCount > 1) {
      e.preventDefault()
      isMouseMoved = true // Set isMouseMoved to true when a touch event occurs
      mouseX = e.touches[0].clientX // Update mouseX and mouseY when a touch event occurs
      mouseY = e.touches[0].clientY // Update mouseX and mouseY when a touch event occurs
    }
  })

  main.addEventListener('touchend', (e) => {
    touchCount = e.touches.length // Update touch count
  })
}

function draw() {
  background('#010E1E') // Dark background
  noStroke()
  fill('#024978') // Dot color

  dots.forEach(dot => {
    if (isMouseMoved) {
      const distance = dist(mouseX, mouseY, dot.baseX, dot.baseY)
      if (distance < repelDistance) {
        dot.isRepelled = true
        const angle = atan2(dot.baseY - mouseY, dot.baseX - mouseX)
        dot.x = lerp(dot.x, dot.baseX + cos(angle) * repelDistance, 0.2)
        dot.y = lerp(dot.y, dot.baseY + sin(angle) * repelDistance, 0.2)
      } else if (dot.isRepelled) {
        dot.x = lerp(dot.x, dot.baseX, 0.1)
        dot.y = lerp(dot.y, dot.baseY, 0.1)
        if (abs(dot.x - dot.baseX) < 0.1 && abs(dot.y - dot.baseY) < 0.1) {
          dot.isRepelled = false // Stops moving when in original position
        }
      }
    }
    ellipse(dot.x, dot.y, dotSize)
  });
}

// Function to track initial mouse movement
function mouseMoved() {
  isMouseMoved = true
}

// Adjust canvas as the browser window changes size
function windowResized() {
  const main = document.querySelector('main');
  resizeCanvas(main.offsetWidth, main.offsetHeight);
  dots = []
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      dots.push({ x: x, y: y, baseX: x, baseY: y, isRepelled: false })
    }
  }
}

