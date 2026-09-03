/**
 * Oli's Bakehouse - Script Interactivo (script.js)
 * Manejo de:
 * 1. Navbar con alternancia de clase sólida/transparente al hacer scroll
 * 2. Menú móvil interactivo con atributos de accesibilidad
 * 3. Cierre automático del menú móvil al seleccionar enlace o hacer click fuera
 * 4. Desplazamiento suave (Smooth Scroll)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elementos del DOM
  const mainHeader = document.getElementById('main-header');
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const menuIcon = document.getElementById('menu-icon');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  const allSections = document.querySelectorAll('section[id]');

  /**
   * 1. ALTERNANCIA DE CLASE NAVBAR EN SCROLL
   * Agrega fondo sólido con glassmorphism cuando el usuario se desplaza más de 20px
   */
  const handleScroll = () => {
    if (window.scrollY > 20) {
      mainHeader.classList.add('nav-scrolled');
    } else {
      mainHeader.classList.remove('nav-scrolled');
    }
  };

  // Escuchar el evento scroll con throttle pasivo
  window.addEventListener('scroll', handleScroll, { passive: true });
  // Ejecución inicial por si la página carga con scroll previo
  handleScroll();

  /**
   * 2. MENÚ HAMBURGUESA MÓVIL
   * Alterna apertura/cierre, cambia icono (bars / xmark) y actualiza ARIA
   */
  const toggleMobileMenu = () => {
    const isExpanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;

    menuToggleBtn.setAttribute('aria-expanded', String(nextState));

    if (nextState) {
      // Abrir menú
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.remove('fa-bars');
      menuIcon.classList.add('fa-xmark');
      menuToggleBtn.setAttribute('aria-label', 'Cerrar menú de navegación');
    } else {
      // Cerrar menú
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('fa-xmark');
      menuIcon.classList.add('fa-bars');
      menuToggleBtn.setAttribute('aria-label', 'Abrir menú de navegación');
    }
  };

  const closeMobileMenu = () => {
    menuToggleBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
    menuToggleBtn.setAttribute('aria-label', 'Abrir menú de navegación');
  };

  if (menuToggleBtn && mobileMenu) {
    menuToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Cerrar menú móvil al hacer click en cualquier enlace interno
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Cerrar menú móvil al hacer click fuera del menú
    document.addEventListener('click', (e) => {
      const isExpanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded && !mobileMenu.contains(e.target) && !menuToggleBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Cerrar con tecla Escape por accesibilidad
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggleBtn.getAttribute('aria-expanded') === 'true') {
        closeMobileMenu();
        menuToggleBtn.focus();
      }
    });
  }

  /**
   * 3. HIGHLIGHT ACTIVO DE NAVEGACIÓN BASADO EN SCROLL (IntersectionObserver)
   */
  if ('IntersectionObserver' in window && allSections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          desktopNavLinks.forEach((link) => {
            if (link.getAttribute('href') === ('#' + currentId)) {
              link.classList.add('text-raspberry', 'active');
            } else {
              link.classList.remove('text-raspberry', 'active');
            }
          });
        }
      });
    }, observerOptions);

    allSections.forEach((section) => sectionObserver.observe(section));
  }
});
