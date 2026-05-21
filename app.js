/*
=========================================
L'AMBRE BISTRO - CINEMATIC ENGINE (app.js)
=========================================
Author: Antigravity AI
Features: 
  - Smooth Scroll Nav Tracker & Intersection Reveals
  - HTML5 Canvas Heat Steam/Smoke Particle Engine
  - Dynamic Menu Rendering & Elegant Tab Switches
  - Interactive Dish Spotlight Transition Logic
  - Seating Map Selection & Reservation Simulator
*/

document.addEventListener('DOMContentLoaded', () => {

  // =========================================
  // 1. MENU DATASETS & DYNAMIC RENDERING
  // =========================================
  const MENU_DATA = {
    starters: [
      {
        title: "Pecan Wood Smoked Burrata",
        price: "$19",
        desc: "Creamy artisanal burrata infused with soft pecan smoke, blistered heirloom cherry tomatoes, basil-infused olive oil, and toasted sourdough crumbles.",
        tag: "Vegetarian",
        pairing: "Pairing: Chardonnay Reserve"
      },
      {
        title: "Cast Iron Roasted Octopus",
        price: "$24",
        desc: "Tender charred tentacles finished with fingerling potatoes, spicy chorizo crumble, smoked paprika aioli, and wild sea asparagus.",
        tag: "Signature",
        pairing: "Pairing: Dry Spanish Albariño"
      },
      {
        title: "Forest Mushroom Cappuccino",
        price: "$16",
        desc: "Velvety cream of wild chanterelle and porcini mushrooms, crowned with a delicate white truffle oil froth and hazelnut dust.",
        tag: "Gluten-Free",
        pairing: "Pairing: Pinot Noir"
      }
    ],
    mains: [
      {
        title: "Miyazaki A5 Wagyu Ribeye",
        price: "$85",
        desc: "Premium A5 Wagyu seared over pecan wood fire. Glistening with bone-marrow butter, wild rosemary, and smoked Maldon salt flakes.",
        tag: "Signature",
        pairing: "Pairing: Vintage Cabernet Sauvignon"
      },
      {
        title: "Artisanal Truffle Tagliatelle",
        price: "$38",
        desc: "Fresh house-rolled pasta cooked al dente in a velvety emulsion of butter, shaved Italian summer truffles, and aged Pecorino Romano.",
        tag: "Vegetarian",
        pairing: "Pairing: Barolo Riserva"
      },
      {
        title: "Pan-Seared Sea Bass",
        price: "$46",
        desc: "Crispy skin Chilean sea bass resting on a saffron-lobster reduction, roasted baby fennel, and citrus-infused herb oil.",
        tag: "Gluten-Free",
        pairing: "Pairing: Oaky Sauvignon Blanc"
      }
    ],
    desserts: [
      {
        title: "Molten Dark Chocolate Soufflé",
        price: "$18",
        desc: "Decadent 72% Valrhona dark chocolate soufflé with a molten core, dusted with powdered sugar and crowned with an edible 24k gold leaf.",
        tag: "Signature",
        pairing: "Pairing: 20-Year Tawny Port"
      },
      {
        title: "Golden Honey Amber Pear",
        price: "$15",
        desc: "Anjou pear poached in spiced saffron syrup, served with orange blossom mascarpone quenelle and caramelized pistachio honeycomb shards.",
        tag: "Gluten-Free",
        pairing: "Pairing: Sauternes Dessert Wine"
      },
      {
        title: "Tahitian Vanilla Bean Crème Brûlée",
        price: "$14",
        desc: "Velvety egg custard with double vanilla infusion, layered under a perfectly torched, amber glass-sugar top.",
        tag: "Vegetarian",
        pairing: "Pairing: Champagne Brut"
      }
    ],
    cocktails: [
      {
        title: "The Smoky Amber Hearth",
        price: "$21",
        desc: "Premium double-oaked bourbon, maple syrup, Angostura bitters, smoked in a glass bell-jar with dried orange peel and hickory chips.",
        tag: "Signature",
        pairing: "Aroma: Smoked Citrus"
      },
      {
        title: "Golden Hour Empress",
        price: "$18",
        desc: "Empress gin, organic elderflower liqueur, freshly squeezed lemon juice, sparkling tonic, topped with dynamic edible gold glitter.",
        tag: "Visual",
        pairing: "Aroma: Floral & Fresh"
      },
      {
        title: "Rosemary Paloma Infusion",
        price: "$19",
        desc: "Reposado tequila, pink grapefruit juice, agave syrup, topped with a charred sprig of fresh garden rosemary.",
        tag: "Herbaceous",
        pairing: "Aroma: Pine & Grapefruit"
      }
    ]
  };

  const menuItemsGrid = document.getElementById('menuItemsGrid');
  const menuTabBtns = document.querySelectorAll('.menu-tab-btn');

  function renderMenu(category) {
    // Elegant fade out transition
    menuItemsGrid.style.opacity = '0';
    menuItemsGrid.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      menuItemsGrid.innerHTML = '';
      
      const items = MENU_DATA[category] || [];
      items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'menu-item-card glass-panel reveal-element revealed';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
          <div class="menu-item-head">
            <h3 class="menu-item-title">${item.title}</h3>
            <span class="menu-item-dots"></span>
            <span class="menu-item-price">${item.price}</span>
          </div>
          <p class="menu-item-desc">${item.desc}</p>
          <div class="menu-item-footer">
            <span class="menu-item-tag">${item.tag}</span>
            <span class="menu-item-pairing">${item.pairing}</span>
          </div>
        `;
        menuItemsGrid.appendChild(card);
      });
      
      // Elegant fade in transition
      menuItemsGrid.style.opacity = '1';
      menuItemsGrid.style.transform = 'translateY(0)';
    }, 300);
  }

  // Bind Menu Tabs Event Listeners
  menuTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      menuTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-tab');
      renderMenu(category);
    });
  });

  // Initial Menu Render (Starters)
  renderMenu('starters');


  // =========================================
  // 2. SMOOTH SCROLL NAV TRACKER & REVEALS
  // =========================================
  const mainHeader = document.getElementById('mainHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Floating Header Scroll Accent
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
    trackActiveNav();
  });

  // Active Navigation Tracker
  function trackActiveNav() {
    let currentSectionId = 'home';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.includes(currentSectionId)) {
        link.classList.add('active');
      }
    });
  }

  // Intersection Observer for Scroll Reveals
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Let it run once
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  document.querySelectorAll('.reveal-element').forEach(el => {
    revealObserver.observe(el);
  });


  // =========================================
  // 3. CANVAS STEAM / SMOKE PARTICLE ENGINE
  // =========================================
  const canvas = document.getElementById('steamCanvas');
  const ctx = canvas.getContext('2d');
  const steamContainer = document.getElementById('steamContainer');

  let particles = [];
  let animationFrameId;
  let canvasWidth, canvasHeight;
  
  // Custom steam profiles for different dishes
  let steamIntensity = 1.0;
  let steamBaseWidth = 140;
  let steamDrift = 0.2;
  
  // Resize Canvas to fit its absolute container
  function resizeCanvas() {
    canvasWidth = steamContainer.clientWidth;
    canvasHeight = steamContainer.clientHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
      // Randomize initial heights to avoid initial blocky spawn
      this.y = Math.random() * canvasHeight;
    }

    reset() {
      // Spawn particles near the center bottom of the plate
      this.x = canvasWidth / 2 + (Math.random() - 0.5) * steamBaseWidth;
      this.y = canvasHeight * 0.72 + (Math.random() - 0.5) * 15;
      
      // Physics factors - rising upward
      this.vy = -1.2 * (0.8 + Math.random() * 0.7) * steamIntensity;
      this.vx = (Math.random() - 0.5) * 0.5 + steamDrift;
      
      // Visual factors
      this.alpha = 0; // Starts invisible, fades in
      this.maxAlpha = 0.08 + Math.random() * 0.11;
      this.size = 28 + Math.random() * 32; // Fluffy clouds
      this.growth = 0.45 + Math.random() * 0.35;
      this.fadeRate = 0.0025 + Math.random() * 0.0025;
      
      // Swirling turbulence
      this.turbulence = Math.random() * 100;
      this.turbulenceSpeed = 0.01 + Math.random() * 0.02;
    }

    update() {
      this.y += this.vy;
      this.x += this.vx + Math.sin(this.turbulence) * 0.35;
      this.size += this.growth;
      this.turbulence += this.turbulenceSpeed;

      // Handle transparent fade curve (fade in initially, then slowly fade out)
      if (this.y > canvasHeight * 0.45) {
        if (this.alpha < this.maxAlpha) {
          this.alpha += 0.015;
        }
      } else {
        this.alpha -= this.fadeRate;
      }

      // Kill and reset when faded out or out of viewport
      if (this.alpha <= 0 || this.y < canvasHeight * 0.08) {
        this.reset();
      }
    }

    draw() {
      if (this.alpha <= 0) return;
      
      ctx.beginPath();
      // Delicate soft glowing gradient
      const grad = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size
      );
      
      // Cream-amber toned warm steam
      grad.addColorStop(0, `rgba(243, 229, 171, ${this.alpha})`);
      grad.addColorStop(0.3, `rgba(253, 246, 226, ${this.alpha * 0.4})`);
      grad.addColorStop(1, 'rgba(253, 246, 226, 0)');
      
      ctx.fillStyle = grad;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Initialize Particle Stack
  function initSteam() {
    particles = [];
    // 50 soft smoke clouds for highly realistic, lush, organic steam look
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }
  }

  function animateSteam() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    animationFrameId = requestAnimationFrame(animateSteam);
  }

  initSteam();
  animateSteam();


  // =========================================
  // 4. INTERACTIVE FOOD SPOTLIGHT SWITCHER
  // =========================================
  const DISH_DATA = {
    steak: {
      title: "Signature <span>Wagyu Ribeye</span>",
      desc: "Prime graded A5 Miyazaki Wagyu seared over pecan wood fire. Glistening with our signature bone-marrow butter, infused with wild rosemary, and dotted with smoked Maldon sea salt crystals. Served hot on a dark stone slab, unleashing a rich, woody steam.",
      img: "assets/signature_steak.png",
      detail1Title: "The Roast & Fire",
      detail1Desc: "Seared at 800 degrees to lock in internal caramelization and rich woodsmoke juices.",
      detail2Title: "Infusion Craft",
      detail2Desc: "Basted directly with hand-whipped rosemary butter, bringing out complex herbal aromatics.",
      steamIntensity: 1.0,
      steamWidth: 140,
      steamDrift: 0.2
    },
    pasta: {
      title: "Artisanal <span>Truffle Tagliatelle</span>",
      desc: "Fresh house-rolled pasta cooked al dente in a velvety emulsion of double butter, fresh cracked pepper, and aged Pecorino Romano. Showered with paper-thin black truffles and microgreens, lifting aromatic, earthy steam from the table.",
      img: "assets/artisan_pasta.png",
      detail1Title: "Artisanal Pasta Craft",
      detail1Desc: "Hand-rolled daily in our atelier with organic semolina wheat and farm-fresh egg yolks.",
      detail2Title: "Black Gold Infusion",
      detail2Desc: "Freshly sliced black summer truffles shaved directly over the warm pasta for absolute premium aroma.",
      steamIntensity: 0.8,
      steamWidth: 120,
      steamDrift: -0.1
    },
    souffle: {
      title: "Molten <span>Chocolate Soufflé</span>",
      desc: "A breathtaking warm dark chocolate soufflé freshly baked and perfectly risen. The center is warm, gooey, molten chocolate oozing out slowly. Crowned with fine gold leaf and served with a delicate puff of sweet cocoa steam.",
      img: "assets/chocolate_souffle.png",
      detail1Title: "Valrhona Heritage",
      detail1Desc: "Crafted exclusively using single-origin 72% Valrhona dark chocolate for robust sensory depth.",
      detail2Title: "Molten Heart Alchemy",
      detail2Desc: "Engineered to deliver a perfect, slow-flowing center core that balances bitter and sweet tones.",
      steamIntensity: 0.6,
      steamWidth: 80,
      steamDrift: 0.0
    }
  };

  const spotlightSelectors = document.querySelectorAll('.showcase-selector-btn');
  const spotlightMainImg = document.getElementById('spotlightMainImg');
  const spotlightDishTitle = document.getElementById('spotlightDishTitle');
  const spotlightDishDesc = document.getElementById('spotlightDishDesc');
  const spotlightDetail1Title = document.getElementById('spotlightDetail1Title');
  const spotlightDetail1Desc = document.getElementById('spotlightDetail1Desc');
  const spotlightDetail2Title = document.getElementById('spotlightDetail2Title');
  const spotlightDetail2Desc = document.getElementById('spotlightDetail2Desc');
  const spotlightPlate = document.getElementById('spotlightPlate');

  spotlightSelectors.forEach(btn => {
    btn.addEventListener('click', () => {
      spotlightSelectors.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const dishKey = btn.getAttribute('data-dish');
      const dish = DISH_DATA[dishKey];

      if (dish) {
        // Dramatic animation zoom/rotate plate change
        spotlightPlate.style.transform = 'scale(0.8) rotate(-45deg)';
        spotlightPlate.style.opacity = '0.3';

        setTimeout(() => {
          spotlightMainImg.src = dish.img;
          spotlightMainImg.alt = `Cinematic plate of ${dish.title}`;
          spotlightDishTitle.innerHTML = dish.title;
          spotlightDishDesc.textContent = dish.desc;
          spotlightDetail1Title.textContent = dish.detail1Title;
          spotlightDetail1Desc.textContent = dish.detail1Desc;
          spotlightDetail2Title.textContent = dish.detail2Title;
          spotlightDetail2Desc.textContent = dish.detail2Desc;

          // Adjust Canvas steam profile dynamic settings!
          steamIntensity = dish.steamIntensity;
          steamBaseWidth = dish.steamWidth;
          steamDrift = dish.steamDrift;

          // Reset steam simulation instantly to match new dish placement
          initSteam();

          // Recover plate layout
          spotlightPlate.style.transform = 'scale(1) rotate(0deg)';
          spotlightPlate.style.opacity = '1';
        }, 400);
      }
    });
  });


  // =========================================
  // 5. INTERACTIVE CHEF SECTIONS
  // =========================================
  const chefTabBtns = document.querySelectorAll('.chef-tab-btn');
  const chefTabContents = document.querySelectorAll('.chef-tab-content');
  const chefImg = document.getElementById('chefImg');

  // Images detailing chef stages
  const CHEF_IMAGES = {
    philosophy: "assets/signature_steak.png",
    journey: "assets/bistro_interior.png",
    awards: "assets/chocolate_souffle.png"
  };

  chefTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      chefTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const chefKey = btn.getAttribute('data-chef');

      // Update active content tab
      chefTabContents.forEach(content => {
        content.classList.remove('active');
        if (content.getAttribute('id') === `chef-${chefKey}`) {
          content.classList.add('active');
        }
      });

      // Update chef picture dramatically
      if (CHEF_IMAGES[chefKey]) {
        chefImg.style.opacity = '0.4';
        setTimeout(() => {
          chefImg.src = CHEF_IMAGES[chefKey];
          chefImg.style.opacity = '1';
        }, 300);
      }
    });
  });


  // =========================================
  // 6. LIVE RESERVATION BOOKING SYSTEM
  // =========================================
  const seatingCards = document.querySelectorAll('.seating-card');
  const bookingForm = document.getElementById('bookingForm');
  const bookingResult = document.getElementById('bookingResult');
  
  const ticketId = document.getElementById('ticketId');
  const ticketName = document.getElementById('ticketName');
  const ticketZone = document.getElementById('ticketZone');
  const ticketDateTime = document.getElementById('ticketDateTime');
  const ticketGuests = document.getElementById('ticketGuests');
  
  const bookingResetBtn = document.getElementById('bookingResetBtn');
  const bookingSubmitBtn = document.getElementById('bookingSubmitBtn');

  let selectedZone = 'Glasshouse'; // Default

  // Seating Zone Picker Handler
  seatingCards.forEach(card => {
    card.addEventListener('click', () => {
      seatingCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedZone = card.getAttribute('data-zone');
    });
  });

  // Pre-fill date selector with tomorrow's date by default (user comfort)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yyyy = tomorrow.getFullYear();
  let mm = tomorrow.getMonth() + 1;
  let dd = tomorrow.getDate();
  if (mm < 10) mm = '0' + mm;
  if (dd < 10) dd = '0' + dd;
  document.getElementById('bookingDate').value = `${yyyy}-${mm}-${dd}`;
  document.getElementById('bookingDate').min = `${yyyy}-${mm}-${dd}`; // Prevent past bookings

  // Booking Form Submission Handler
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animate Booking Button
    bookingSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Securing Hearth Seating...';
    bookingSubmitBtn.disabled = true;

    // Simulate concierge booking response delay (premium visual polish)
    setTimeout(() => {
      // Collect details
      const name = document.getElementById('bookingName').value;
      const dateVal = document.getElementById('bookingDate').value;
      const timeVal = document.getElementById('bookingTime').value;
      const guestsVal = document.getElementById('bookingGuests').value;

      // Format Date nicely
      const dateObj = new Date(dateVal);
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      const formattedDate = dateObj.toLocaleDateString('en-US', options);

      // Generate simulated ticket confirmation ID
      const randomID = Math.floor(1000 + Math.random() * 9000);
      const confID = `#LMB-${yyyy}-${randomID}`;

      // Set Ticket Details
      ticketId.textContent = confID;
      ticketName.textContent = name;
      ticketZone.textContent = `The ${selectedZone}`;
      ticketDateTime.textContent = `${formattedDate} | ${timeVal}`;
      ticketGuests.textContent = guestsVal;

      // Transition layouts beautifully
      bookingForm.style.display = 'none';
      bookingResult.style.display = 'block';

      // Reset submit button state
      bookingSubmitBtn.innerHTML = 'Secure Seating reservation';
      bookingSubmitBtn.disabled = false;
    }, 1800);
  });

  // Reset Booking Form
  bookingResetBtn.addEventListener('click', () => {
    bookingForm.reset();
    document.getElementById('bookingDate').value = `${yyyy}-${mm}-${dd}`;
    bookingResult.style.display = 'none';
    bookingForm.style.display = 'block';
  });


  // =========================================
  // 7. RESPONSIVE MOBILE NAVIGATION DRAWER
  // =========================================
  const mobileMenuTrigger = document.getElementById('mobileMenuTrigger');
  const desktopNav = document.getElementById('desktopNav');

  mobileMenuTrigger.addEventListener('click', () => {
    const expanded = mobileMenuTrigger.getAttribute('aria-expanded') === 'true';
    mobileMenuTrigger.setAttribute('aria-expanded', !expanded);
    
    if (!expanded) {
      desktopNav.style.display = 'flex';
      desktopNav.style.flexDirection = 'column';
      desktopNav.style.position = 'absolute';
      desktopNav.style.top = '100%';
      desktopNav.style.left = '0';
      desktopNav.style.width = '100%';
      desktopNav.style.background = 'rgba(10, 6, 4, 0.98)';
      desktopNav.style.padding = '40px';
      desktopNav.style.borderBottom = '1px solid rgba(212, 175, 55, 0.15)';
      desktopNav.style.gap = '25px';
      desktopNav.style.boxShadow = '0 30px 40px rgba(0,0,0,0.8)';
    } else {
      desktopNav.removeAttribute('style');
    }
  });

  // Close mobile drawer on navigation click
  const drawerLinks = desktopNav.querySelectorAll('a, .btn-primary');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        mobileMenuTrigger.setAttribute('aria-expanded', 'false');
        desktopNav.removeAttribute('style');
      }
    });
  });

  // Handle window resizing edge case for mobile nav drawer styles
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      mobileMenuTrigger.setAttribute('aria-expanded', 'false');
      desktopNav.removeAttribute('style');
    }
  });
});
