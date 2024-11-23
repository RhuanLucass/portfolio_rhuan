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
  const mainTextContainer = document.getElementById('main-text-container')
  const initialText = document.getElementById('initial-text')
  // const nameText = document.getElementById('name-text')
  const workText = document.getElementById('work-text')
  const circlesTouchMobile = document.querySelectorAll('.circles-wrapper span')
  const infiniteTextWrapper = document.querySelector('.infinite-text-wrapper')
  const infiniteText = infiniteTextWrapper.querySelector('h4')

  const nameText = document.getElementById('name-text')
  const textContent = nameText.textContent;

  nameText.innerHTML = textContent.split("").map(letter => {
    return letter === " " ? "&nbsp;" : `<span style="display: inline-block; position: relative; /*opacity: 0;*/">${letter}</span>`;
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
      .fromTo("#name-text span", 1,
        {
          opacity: 0,
          x: 50,
          scale: 0.8
        }, {
        opacity: 1,
        x: 0,
        scale: 1,
        stagger: 0.2,
        // ease: "back.out(3)"
      })
      .fromTo(initialText, .5, {
        y: 50,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        ease: "back.out(3)"
      }, "-=.2")
      .fromTo(workText, 2, {
        x: -150,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        stagger: 0.4,
      }, "-=.3")


    // if (isTouchDevice) {
    //   console.log('mobile')
    //   tlMobile.fromTo(mainText3, 1.5, {
    //     opacity: 0,
    //   }, {
    //     opacity: 1,
    //     // ease: "power2.out",
    //     repeat: 3,
    //     yoyo: true,
    //     onComplete: () => {
    //       gsap.to(mainText3, { opacity: 0 });
    //     }
    //   }, "textTouch", "-=1")
    //     .fromTo(circlesTouchMobile, 1.5, {
    //       scale: .6
    //     }, {
    //       scale: 1,
    //       repeat: 3,
    //       yoyo: true,
    //       onComplete: () => {
    //         gsap.to(circlesTouchMobile, { opacity: 0 })
    //       }
    //     }, "textTouch-=0")
    // }

  }
  // timelineGSAP()

  const ScrollTriggerMain = () => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(mainTextContainer, {
      x: 0,
    }, {
      x: 500,
      scrollTrigger: {
        trigger: mainTextContainer,
        start: '80% 50%',
        end: 'top 0%',
        // toggleClass: 'blue',
        scrub: 2,
        // pin: true,
        pinSpacing: false,
        markers: true
      }
    })

    gsap.fromTo(workText, {
      x: 0,
    }, {
      x: -500,
      scrollTrigger: {
        trigger: workText,
        start: '-115% 50%',
        end: '-350% 0%',
        // toggleClass: 'blue',
        scrub: 2,
        pin: true,
        pinSpacing: false,
        markers: true
      }
    })
  }
  ScrollTriggerMain()


  // Works animation with scrollTrigger
  const timelineScrollSmoother = () => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.utils.toArray(".project-single").forEach((project, index, projects) => {

      const tlWorks = gsap.timeline({
        scrollTrigger: {
          markers: true,
          trigger: project,
          start: "40% 50%",
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
  }
})