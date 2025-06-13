document.addEventListener('DOMContentLoaded', () => {
  const $ = sel => document.querySelector(sel);
  const $$ = sel => document.querySelectorAll(sel);

  // ===== Mobile Menu Toggle =====
  const hamburger = $('.hamburger');
  const navLinks = $('.nav-links');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  $$('.nav-links a').forEach(link =>
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navLinks?.classList.remove('active');
    })
  );

  // ===== Active Link Highlight =====
  const current = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('active');
  });

  // ===== Smooth Scroll =====
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = $(anchor.getAttribute('href'));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // ===== Lazy Load Images =====
  if ('IntersectionObserver' in window) {
    const lazyImages = $$('img.lazy');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          obs.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => observer.observe(img));
  }

  // ===== Featured Foods (Homepage) =====
  const featured = $('#featuredFoods');
  const foods = [
    { id: 1, name: "Rendang", region: "Sumatera Barat", description: "Daging dimasak dengan santan dan rempah hingga kering dan harum.", image: "rendang.jpg" },
    { id: 2, name: "Gudeg", region: "Yogyakarta", description: "Nangka muda dimasak dengan santan dan gula jawa.", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d" },
    { id: 3, name: "Soto Betawi", region: "Jakarta", description: "Soto dengan kuah santan kental berisi daging sapi.", image: "soto betawi.jpg" }
  ];

  if (featured) {
    featured.innerHTML = foods.map(f => `
      <div class="food-card">
        <img src="${f.image}" alt="${f.name}" class="food-img">
        <div class="food-info">
          <h3>${f.name}</h3>
          <p>${f.region}</p>
          <p>${f.description}</p>
          <a href="menu.html" class="btn btn-primary">Lihat Detail</a>
        </div>
      </div>
    `).join('');
  }

  // ===== Menu Page Filter & Detail =====
  const menuList = $('#menuList');
  const regionFilter = $('#regionFilter');
  const foodDetail = $('#foodDetail');

  const allFoods = [
    ...foods,
    {
      id: 4,
      name: "Coto Makassar",
      region: "Sulawesi Selatan",
      description: "Coto Makassar adalah makanan khas Makassar, Sulawesi Selatan, berupa sup daging sapi yang dimasak dengan bumbu rempah khas dan kuah berbasis kacang tanah yang dihaluskan. Biasanya menggunakan jeroan sapi seperti hati, usus, atau babat, yang direbus lama hingga empuk. Coto Makassar disajikan hangat bersama ketupat atau buras, serta sambal dan jeruk nipis sebagai pelengkap. Rasanya gurih, kaya rempah, dan sedikit creamy, menjadikannya salah satu kuliner ikonik Sulawesi Selatan.",
      image: "coto.jpeg"
    },
    {
      id: 5,
      name: "Kaledo",
      region: "Sulawesi Tengah",
      description: "Kaledo adalah makanan khas Palu, Sulawesi Tengah, yang terdiri dari sup tulang kaki sapi dengan kuah bening yang kaya rasa. Nama kaledo berasal dari singkatan kaki lembu donggala. Hidangan ini disajikan dengan tulang besar berisi sumsum yang dinikmati dengan cara diseruput, ditemani nasi atau ubi rebus. Rasanya gurih, sedikit asam, dan pedas, karena menggunakan bumbu seperti cabai dan asam jawa. Kaledo menjadi simbol kuliner khas Palu yang unik dan menggugah selera.",
      image: "kaledo.jpg"
    },
    {
      id: 6,
      name: "Nasi Padang",
      region: "Sumatera Barat",
      description: "Nasi Padang adalah makanan khas Minangkabau yang terdiri dari nasi putih yang disajikan dengan berbagai macam lauk pauk bercita rasa kuat dan kaya rempah, seperti rendang, gulai ayam, sambal ijo, dan sayur nangka. Ciri khasnya terletak pada penyajian lauk yang melimpah dan penggunaan santan serta cabai dalam masakan. Nasi Padang terkenal di seluruh Indonesia karena rasanya yang gurih, pedas, dan aromatik, serta cara penyajiannya yang unik, yaitu semua hidangan disusun di atas meja dan dipilih sesuai selera.",
      image: "nasi padang.jpg"
    },
    {
      id: 7,
      name: "Pappeda",
      region: "Papua",
      description: "Papeda adalah bubur sagu khas Papua yang menjadi ikon makanan tradisional timur Indonesia. Teksturnya kenyal dan lengket, sering disantap bersama ikan kuah kuning berbumbu rempah yang kaya, menciptakan perpaduan rasa unik dan lezat.",
      image: "onyop.jpg"
    },
    {
      id: 8,
      name: "Ayam Betutu",
      region: "Bali",
      description: "Ayam Betutu adalah makanan khas Bali yang terbuat dari ayam utuh yang dibumbui dengan base genep, yaitu campuran rempah khas Bali seperti bawang, kunyit, jahe, lengkuas, dan cabai. Ayam dibungkus daun pisang lalu dimasak dengan cara dikukus atau dipanggang hingga empuk dan bumbunya meresap sempurna. Rasanya pedas, gurih, dan aromatik. Ayam Betutu biasanya disajikan dalam upacara adat maupun sebagai hidangan istimewa dalam jamuan keluarga di Bali.",
      image: "ayam betutu.jpg"
    },
    {
      id: 9,
      name: "Kerak Telur",
      region: "Jakarta",
      description: "Kerak Telur adalah makanan khas Jakarta yang terbuat dari beras ketan, telur ayam atau bebek, dan ebi (udang kering), yang dimasak di atas wajan tanpa minyak. Hidangan ini dibumbui dengan kelapa parut sangrai dan rempah-rempah, lalu dimasak hingga bagian bawahnya garing seperti kerak. Rasanya gurih dan sedikit manis, dengan tekstur renyah di luar dan lembut di dalam. Kerak Telur sering dijumpai di acara-acara budaya Betawi dan menjadi ikon kuliner tradisional Jakarta.",
      image: "kerak telor.jpg"
    }
  ];

  const renderFoods = (region = 'all') => {
    const filtered = region === 'all' ? allFoods : allFoods.filter(f => f.region === region);
    menuList.innerHTML = filtered.map(f => `
      <div class="food-card">
        <img src="${f.image}" alt="${f.name}" class="food-img">
        <div class="food-info">
          <h3>${f.name}</h3>
          <p>${f.region}</p>
          <button class="btn btn-primary" data-id="${f.id}">Lihat Detail</button>
        </div>
      </div>
    `).join('');
  };

  const showDetail = id => {
    const food = allFoods.find(f => f.id == id);
    if (food) {
      foodDetail.innerHTML = `
        <div class="food-card">
          <img src="${food.image}" class="food-img" alt="${food.name}">
          <div class="food-info">
            <h3>${food.name}</h3>
            <p><strong>Asal:</strong> ${food.region}</p>
            <p>${food.description}</p>
          </div>
        </div>
      `;
      window.scrollTo({ top: foodDetail.offsetTop - 80, behavior: 'smooth' });
    }
  };

  if (menuList && regionFilter) {
    renderFoods();
    regionFilter.addEventListener('change', () => renderFoods(regionFilter.value));
    menuList.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        showDetail(e.target.dataset.id);
      }
    });
  }
});
