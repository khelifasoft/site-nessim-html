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
