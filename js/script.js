// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
   const hamburger = document.querySelector('.hamburger');
   const navLinks = document.querySelector('.nav-links');
   
   // Create overlay element if it doesn't exist
   let overlay = document.querySelector('.nav-overlay');
   if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      document.body.appendChild(overlay);
   }
   
   if (hamburger && navLinks) {
      function toggleMenu() {
         const isActive = navLinks.classList.contains('active');
         hamburger.classList.toggle('active');
         navLinks.classList.toggle('active');
         overlay.classList.toggle('active');
         document.body.classList.toggle('menu-open', !isActive);
      }
      
      function closeMenu() {
         hamburger.classList.remove('active');
         navLinks.classList.remove('active');
         overlay.classList.remove('active');
         document.body.classList.remove('menu-open');
      }
      
      hamburger.addEventListener('click', toggleMenu);
      
      // Close menu when clicking on overlay
      overlay.addEventListener('click', closeMenu);
      
      // Close menu when clicking on a link
      const navLinksItems = navLinks.querySelectorAll('a');
      navLinksItems.forEach(link => {
         link.addEventListener('click', closeMenu);
      });
   }
});

