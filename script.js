function toggleMenu(){
  const d = document.getElementById('drawer');
  const isOpen = d.classList.toggle('open');
  d.setAttribute('aria-hidden', String(!isOpen));
}

const flip = document.getElementById('flipCard');
flip.addEventListener('click', ()=>flip.classList.toggle('flipped'));

// Simple placeholder QR (noise pattern). Replace with real QR later.
function drawFakeQR(el, seed){
  const size = 21, cell = 4;
  const canvas = document.createElement('canvas');
  canvas.width = size*cell; canvas.height = size*cell;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle='#fff'; ctx.fillRect(0,0,canvas.width,canvas.height);
  let s = seed.split('').reduce((a,c)=>a+c.charCodeAt(0),0);
  function rnd(){ s=(1103515245*s+12345)%2147483648; return s/2147483648; }
  ctx.fillStyle='#000';
  function finder(x,y){
    ctx.fillRect(x*cell,y*cell,7*cell,7*cell);
    ctx.fillStyle='#fff'; ctx.fillRect((x+1)*cell,(y+1)*cell,5*cell,5*cell);
    ctx.fillStyle='#000'; ctx.fillRect((x+2)*cell,(y+2)*cell,3*cell,3*cell);
  }
  finder(0,0); finder(size-7,0); finder(0,size-7);
  for(let y=0;y<size;y++){
    for(let x=0;x<size;x++){
      const near=(x<8&&y<8)||(x>size-9&&y<8)||(x<8&&y>size-9);
      if(near) continue;
      if(rnd()>0.62) ctx.fillRect(x*cell,y*cell,cell,cell);
    }
  }
  el.innerHTML=''; el.appendChild(canvas);
}
drawFakeQR(document.getElementById('qr1'),'seed1');
drawFakeQR(document.getElementById('qr2'),'seed2');
function refreshQR(){ drawFakeQR(document.getElementById('qr2'), 'seed'+Date.now()); }
