(function(){
  var burger=document.querySelector('.burger'),nav=document.getElementById('nav');
  if(burger){burger.addEventListener('click',function(){var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o)})}
  document.querySelectorAll('.sub-toggle').forEach(function(b){b.addEventListener('click',function(){
    var li=b.parentElement,o=li.classList.toggle('open');b.setAttribute('aria-expanded',o)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){document.querySelectorAll('.has-sub.open').forEach(function(x){x.classList.remove('open')})}});
  // catalogue
  var grid=document.getElementById('grid');
  if(grid){
    var q=document.getElementById('q'),chips=document.querySelectorAll('.chip'),cat='',none=document.getElementById('none');
    function apply(){var t=q.value.trim().toLowerCase(),n=0;
      grid.querySelectorAll('.prod').forEach(function(p){
        var ok=(!cat||p.dataset.cat===cat)&&(!t||p.dataset.name.indexOf(t)>-1||p.dataset.cat.toLowerCase().indexOf(t)>-1);
        p.hidden=!ok;if(ok)n++});none.hidden=n>0}
    q.addEventListener('input',apply);
    chips.forEach(function(c){c.addEventListener('click',function(){chips.forEach(function(x){x.classList.remove('on')});c.classList.add('on');cat=c.dataset.cat;apply()})});
  }
  // formulaire de contact -> mailto (site statique, sans serveur)
  var f=document.getElementById('cform');
  if(f){f.addEventListener('submit',function(e){e.preventDefault();
    var d=new FormData(f),body='Name: '+d.get('n')+'\nE-mail: '+d.get('e')+'\n\n'+d.get('m');
    location.href='mailto:'+f.dataset.to+'?subject='+encodeURIComponent(d.get('s'))+'&body='+encodeURIComponent(body)})}
})();
// ===== panneaux latéraux (infos + panier de demande) =====
(function(){
  var ov=document.querySelector('.sp-overlay'),cur=null,opener=null;
  if(!ov)return;
  function open(btn){var p=document.getElementById(btn.dataset.panel);if(!p)return;if(cur)close(true);cur=p;opener=btn;ov.hidden=false;
    requestAnimationFrame(function(){ov.classList.add('on');p.classList.add('on')});p.setAttribute('aria-hidden','false');btn.setAttribute('aria-expanded','true');
    document.body.classList.add('sp-lock');p.querySelector('.sp-close').focus()}
  function close(quick){if(!cur)return;cur.classList.remove('on');cur.setAttribute('aria-hidden','true');opener.setAttribute('aria-expanded','false');
    if(!quick){ov.classList.remove('on');document.body.classList.remove('sp-lock');setTimeout(function(){if(!cur)ov.hidden=true},350);opener.focus()}cur=null}
  document.querySelectorAll('[data-panel]').forEach(function(b){b.addEventListener('click',function(){open(b)})});
  ov.addEventListener('click',function(){close()});
  document.querySelectorAll('.sp-close').forEach(function(b){b.addEventListener('click',function(){close()})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  // panier = liste de demande (stockée localement)
  var cp=document.getElementById('cartpanel');if(!cp)return;
  var list=cp.querySelector('.cart-list'),empty=cp.querySelector('.cart-empty'),foot=cp.querySelector('.cart-foot'),
      badge=document.querySelector('.cart-n'),send=cp.querySelector('.cart-send'),items=[];
  try{items=JSON.parse(localStorage.getItem('profis-cart')||'[]')}catch(e){}
  function save(){try{localStorage.setItem('profis-cart',JSON.stringify(items))}catch(e){}}
  function render(){
    list.innerHTML='';items.forEach(function(n,i){var li=document.createElement('li'),s=document.createElement('span'),b=document.createElement('button');
      s.textContent=n;b.type='button';b.textContent=cp.dataset.rm;b.onclick=function(){items.splice(i,1);save();render()};li.appendChild(s);li.appendChild(b);list.appendChild(li)});
    empty.hidden=items.length>0;foot.hidden=!items.length;badge.hidden=!items.length;badge.textContent=items.length;
    document.querySelectorAll('.padd').forEach(function(p){var on=items.indexOf(p.dataset.name)>-1;p.classList.toggle('on',on);if(!p._t)p._t=p.textContent;p.textContent=on?p.dataset.added+' ✓':p._t});
    send.href='mailto:'+cp.dataset.mail+'?subject='+encodeURIComponent(cp.dataset.subject)+'&body='+encodeURIComponent(items.map(function(n){return '- '+n}).join('\n'));
  }
  document.querySelectorAll('.padd').forEach(function(p){p.addEventListener('click',function(){var i=items.indexOf(p.dataset.name);if(i>-1)items.splice(i,1);else items.push(p.dataset.name);save();render()})});
  render();
})();
// ===== fenêtre de langue =====
(function(){
  var b=document.querySelector('.lang-open'),m=document.getElementById('langmodal');if(!b||!m)return;
  function open(){m.hidden=false;requestAnimationFrame(function(){m.classList.add('on')});m.setAttribute('aria-hidden','false');b.setAttribute('aria-expanded','true');document.body.classList.add('sp-lock');m.querySelector('.lm-close').focus()}
  function close(){m.classList.remove('on');m.setAttribute('aria-hidden','true');b.setAttribute('aria-expanded','false');document.body.classList.remove('sp-lock');setTimeout(function(){if(!m.classList.contains('on'))m.hidden=true},350);b.focus()}
  b.addEventListener('click',open);m.querySelector('.lm-close').addEventListener('click',close);
  m.addEventListener('click',function(e){if(e.target===m||e.target.classList.contains('lm-in'))close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&m.classList.contains('on'))close()});
})();
// ===== carrousel de logos =====
(function(){
  var car=document.querySelector('.lcar');if(!car)return;
  var tr=car.querySelector('.ltrack'),items=tr.children,pos=0,t;
  function vis(){return innerWidth<=700?2:4}
  function go(p){var max=Math.max(0,items.length-vis());pos=p>max?0:(p<0?max:p);tr.style.transform='translateX(-'+(pos*items[0].getBoundingClientRect().width)+'px)'}
  car.querySelector('.lnext').onclick=function(){go(pos+1);rst()};car.querySelector('.lprev').onclick=function(){go(pos-1);rst()};
  function rst(){clearInterval(t);t=setInterval(function(){go(pos+1)},3200)}
  car.addEventListener('mouseenter',function(){clearInterval(t)});car.addEventListener('mouseleave',rst);
  addEventListener('resize',function(){go(0)});rst();
})();
// ===== animations =====
(function(){
  document.documentElement.classList.add('js');
  var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // apparition au défilement
  var els=document.querySelectorAll('.reveal,.prose>*,.prod,.zoom');
  if('IntersectionObserver' in window&&!rm){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){
      var d=(e.target.dataset.d||0);e.target.style.transitionDelay=d+'ms';e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    var n=0;els.forEach(function(el){el.dataset.d=(n++%4)*90;io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('in')})}
  // ombre de l'en-tête
  var h=document.querySelector('.site-header');
  addEventListener('scroll',function(){h.classList.toggle('stuck',scrollY>10)},{passive:true});
  // diaporama
  var sl=document.querySelector('.slider');
  if(!sl)return;
  var slides=[].slice.call(sl.querySelectorAll('.slide')),dots=[],
      tn=[].slice.call(document.querySelectorAll('.tnav')),iv=+sl.dataset.interval||5000,cur=0,t,paused=false;
  sl.style.setProperty('--iv',iv+'ms');
  function go(i){
    cur=(i+slides.length)%slides.length;
    slides.forEach(function(s,k){s.classList.toggle('on',k===cur)});
    dots.forEach(function(s,k){s.classList.toggle('on',k===cur)});
    tn.forEach(function(s,k){s.classList.toggle('on',k===cur)});
    sl.classList.remove('run');void sl.offsetWidth;if(!paused&&!rm)sl.classList.add('run');
    clearTimeout(t);if(!paused&&!rm)t=setTimeout(function(){go(cur+1)},iv);
  }
  sl.querySelector('.prev').onclick=function(){go(cur-1)};
  sl.querySelector('.next').onclick=function(){go(cur+1)};
  dots.forEach(function(d,k){d.onclick=function(){go(k)}});tn.forEach(function(d,k){d.onclick=function(){go(k)}});
  sl.addEventListener('mouseenter',function(){paused=true;clearTimeout(t);sl.classList.remove('run')});
  sl.addEventListener('mouseleave',function(){paused=false;go(cur)});
  document.addEventListener('visibilitychange',function(){if(document.hidden){clearTimeout(t)}else{go(cur)}});
  // balayage tactile
  var x0=null;sl.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  sl.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>50)go(cur+(dx<0?1:-1));x0=null});
  sl.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')go(cur-1);if(e.key==='ArrowRight')go(cur+1)});
  // parallaxe
  if(!rm)addEventListener('scroll',function(){var y=scrollY;if(y<900)sl.querySelectorAll('.slide.on .sbg').forEach(function(b){b.style.marginTop=(y*.25)+'px'})},{passive:true});
  go(0);
})();
