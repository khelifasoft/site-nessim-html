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
// ===== animations =====
(function(){
  document.documentElement.classList.add('js');
  var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // apparition au défilement
  var els=document.querySelectorAll('.reveal,.prose>*,.prod,.card,.zoom');
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
  var slides=[].slice.call(sl.querySelectorAll('.slide')),dots=[].slice.call(sl.querySelectorAll('.dot')),
      tn=[].slice.call(sl.querySelectorAll('.tnav')),iv=+sl.dataset.interval||5000,cur=0,t,paused=false;
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
