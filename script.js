// ===== Selectors
const heartShape = document.getElementById('heartShape');
const heartPage  = document.getElementById('heartPage');
const photoPage  = document.getElementById('photoPage');

// ===== Transition: heart -> gallery
heartShape.addEventListener('click', () => {
  heartPage.style.opacity = 0;
  setTimeout(() => {
    heartPage.style.display = 'none';
    photoPage.style.display = 'block';
    spawnHearts();
    glitterOnce();
  }, 800);
});

// ===== Floating heart particles
function spawnHearts() {
  const wrap = document.querySelector('.love-effects');
  const count = 16;
  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.className = 'love-heart';
    span.textContent = '❤';
    span.style.left = Math.random()*100 + '%';
    span.style.bottom = (Math.random()*20) + 'px';
    span.style.animationDelay = (Math.random()*0.6) + 's';
    wrap.appendChild(span);
    setTimeout(() => span.remove(), 1500);
  }
}

// ===== Glitter
function glitterOnce(){
  const g = document.createElement('span');
  g.className = 'glitter'; g.textContent = '✨';
  document.querySelector('.card').appendChild(g);
  setTimeout(()=>g.remove(),1500);
}

// ===== Descriptions on click
const photos = document.querySelectorAll('.photo');
photos.forEach(photo => {
  photo.addEventListener('click', function(){
    const container = this.closest('.image-container');
    const desc = container.querySelector('.description');
    // tutup yg lain
    document.querySelectorAll('.image-container.active').forEach(el=>{
      if(el!==container) el.classList.remove('active');
    });
    desc.textContent = this.dataset.description || '';
    container.classList.toggle('active');
    // extra: percikan hati saat klik
    clickBurst(container);
  });
});

// Little burst near clicked photo
function clickBurst(container){
  const wrap = document.querySelector('.love-effects');
  for(let i=0;i<6;i++){
    const s = document.createElement('span');
    s.className='love-heart'; s.textContent='❤';
    const rect = container.getBoundingClientRect();
    const pageRect = document.querySelector('.card').getBoundingClientRect();
    // posisi relatif ke card
    s.style.left = (rect.left - pageRect.left + rect.width/2 + (Math.random()*40-20)) + 'px';
    s.style.top  = (rect.top  - pageRect.top  + rect.height/2 + (Math.random()*20-10)) + 'px';
    s.style.animationDuration = (0.8 + Math.random()*0.5) + 's';
    wrap.appendChild(s);
    setTimeout(()=>s.remove(),1200);
  }
}
