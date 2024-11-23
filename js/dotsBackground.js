window.addEventListener('DOMContentLoaded', () => {
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
  const REPEL_DISTANCE = 100; // Distância de repulsão
  const DOT_COLOR = '#024978';
  const BG_COLOR = '#010E1E';

  // Inicialização
  function init() {
    setupCanvas();
    createDots();
    addEventListeners();
    startAnimation();

    // Fade in inicial
    gsap.from(canvas, 5, {
      opacity: 0
    });
  }

  // Configurar canvas
  function setupCanvas() {
    canvas.width = main.offsetWidth;
    canvas.height = main.offsetHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
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
})