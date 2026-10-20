(function(){
  var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
  var root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* nav, progress bar */
  var nav=$('.nav'),bar=$('#bar'),lastY=0;
  function onScroll(){
    var y=scrollY,h=root.scrollHeight-innerHeight;
    bar.style.transform='scaleX('+(h>0?y/h:0)+')';
    nav.classList.toggle('solid',y>40);
    nav.classList.toggle('hide',y>lastY&&y>400&&!$('.menu.open'));
    lastY=y;
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  var burger=$('.burger'),menu=$('.menu');
  if(burger)burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});

  /* hero spotlight follows pointer */
  var hero=$('.hero');
  if(hero&&!reduce)hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();hero.style.setProperty('--mx',(e.clientX-r.left)+'px');hero.style.setProperty('--my',(e.clientY-r.top)+'px');hero.style.setProperty('--px',((e.clientX-r.left)/r.width-.5)*2);hero.style.setProperty('--py',((e.clientY-r.top)/r.height-.5)*2)});

  /* hero video: only load on capable connections */
  var v=$('video[data-src]');
  if(v&&innerWidth>760&&!reduce&&!(navigator.connection&&navigator.connection.saveData)){
    var go=function(){v.src=v.dataset.src;v.addEventListener('canplay',function(){v.play().catch(function(){})},{once:true});v.addEventListener('error',function(){v.remove()})};
    'requestIdleCallback'in window?requestIdleCallback(go):setTimeout(go,1200);
  }else if(v)v.remove();

  /* cards: spotlight + tilt */
  var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  if(fine&&!reduce){
    $$('.card').forEach(function(c){
      c.addEventListener('pointermove',function(e){
        var r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
        c.style.setProperty('--x',x+'px');c.style.setProperty('--y',y+'px');
        c.style.transform='perspective(900px) rotateX('+((y/r.height-.5)*-6)+'deg) rotateY('+((x/r.width-.5)*6)+'deg) translateY(-4px)';
      });
      c.addEventListener('pointerleave',function(){c.style.transform=''});
    });
    /* magnetic buttons */
    $$('.btn').forEach(function(b){
      b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.25)+'px,'+((e.clientY-r.top-r.height/2)*.35)+'px)'});
      b.addEventListener('pointerleave',function(){b.style.transform=''});
    });
    /* cursor */
    var cur=$('#cur'),cx=0,cy=0,tx=0,ty=0;
    addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;cur.style.opacity=1},{passive:true});
    (function loop(){cx+=(tx-cx)*.22;cy+=(ty-cy)*.22;cur.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(loop)})();
    $$('a,button,.card,.proj,.tab').forEach(function(el){el.addEventListener('pointerenter',function(){cur.classList.add('big')});el.addEventListener('pointerleave',function(){cur.classList.remove('big')})});
  }

  /* case-study tabs */
  $$('.tabs').forEach(function(t){
    var tabs=$$('.tab',t),panels=$$('.panel',t);
    tabs.forEach(function(tab,i){tab.addEventListener('click',function(){
      tabs.forEach(function(x,j){x.setAttribute('aria-selected',i===j);panels[j].hidden=i!==j});
      if(window.gsap)gsap.fromTo(panels[i],{y:20,opacity:0},{y:0,opacity:1,duration:.5});
    })});
  });

  /* contact form (add your endpoint below to receive submissions) */
  var FORM_ENDPOINT='';
  $$('form.f').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();var ok=true;
      $$('[required]',f).forEach(function(el){var bad=!el.value.trim()||(el.type==='email'&&!/^\S+@\S+\.\S+$/.test(el.value));el.parentNode.classList.toggle('err',bad);if(bad)ok=false});
      if(!ok)return;
      var done=function(){f.classList.add('done')};
      if(FORM_ENDPOINT)fetch(FORM_ENDPOINT,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}}).then(done,done);else done();
    });
  });

  /* GSAP animations */
  function init(){
    if(!window.gsap||!window.ScrollTrigger||reduce){root.classList.add('ready');return}
    gsap.registerPlugin(ScrollTrigger);
    /* split headings into masked words */
    $$('[data-split]').forEach(function(el){
      (function wrap(n){
        [].slice.call(n.childNodes).forEach(function(c){
          if(c.nodeType===3){
            var f=document.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach(function(p){
              if(!p.trim()){f.appendChild(document.createTextNode(p));return}
              var w=document.createElement('span');w.className='w';var s=document.createElement('span');s.textContent=p;w.appendChild(s);f.appendChild(w);
            });
            n.replaceChild(f,c);
          }else if(c.nodeType===1)wrap(c);
        });
      })(el);
    });
    root.classList.add('ready');
    $$('[data-split]').forEach(function(el){
      var words=$$('.w>span',el);
      gsap.set(words,{yPercent:115,rotate:6});
      var go=function(){gsap.to(words,{yPercent:0,rotate:0,duration:1,ease:'power4.out',stagger:.05})};
      el.closest('.hero')?setTimeout(go,150):ScrollTrigger.create({trigger:el,start:'top 88%',once:true,onEnter:go});
    });
    /* fade-up reveals */
    gsap.set('[data-r]',{y:50,opacity:0});
    $$('.cards .card,.grid-proj>*').forEach(function(c,i){gsap.set(c,{x:i%2?80:-80,rotate:i%2?5:-5,scale:.9})});
    $$('.checks li').forEach(function(c,i){gsap.set(c,{x:i%2?60:-60})});
    ScrollTrigger.batch('[data-r]',{start:'top 90%',once:true,onEnter:function(b){gsap.to(b,{y:0,x:0,rotate:0,scale:1,opacity:1,duration:1,ease:'back.out(1.4)',stagger:.12,clearProps:'transform'})}});
    /* image curtain reveal + inner parallax */
    $$('.media').forEach(function(m){
      var img=$('img',m);
      gsap.fromTo(img,{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{trigger:m,scrub:true}});
      gsap.fromTo(m,{clipPath:'inset(0 100% 0 0 round 24px)'},{clipPath:'inset(0 0% 0 0 round 24px)',duration:1.3,ease:'power4.inOut',scrollTrigger:{trigger:m,start:'top 85%',once:true}});
      gsap.from(img,{scale:1.5,duration:1.6,ease:'power3.out',scrollTrigger:{trigger:m,start:'top 85%',once:true}});
    });
    /* floating objects drift at different speeds while scrolling */
    $$('[data-speed]').forEach(function(el){
      var sp=parseFloat(el.dataset.speed),rot=parseFloat(el.dataset.rot||0),host=el.closest('section')||el.parentNode;
      gsap.fromTo(el,{y:-sp*160,rotate:0},{y:sp*160,rotate:rot,ease:'none',scrollTrigger:{trigger:host,start:'top bottom',end:'bottom top',scrub:.8}});
    });
    /* big text bands slide sideways with scroll */
    $$('.band .t').forEach(function(t){
      var d=parseFloat(t.dataset.dir),dist=function(){return Math.max(0,t.scrollWidth-innerWidth)};
      gsap.fromTo(t,{x:function(){return d<0?0:-dist()}},{x:function(){return d<0?-dist():0},ease:'none',scrollTrigger:{trigger:t.parentNode,start:'top bottom',end:'bottom top',scrub:.6,invalidateOnRefresh:true}});
    });
    /* hero copy drifts away as you leave */
    if(hero)gsap.to('.hero-copy',{y:-60,opacity:.15,ease:'none',scrollTrigger:{trigger:hero,start:'center top',end:'bottom top',scrub:true}});
    if(hero)gsap.to('.hero-vis .frame',{y:90,scale:.92,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:true}});
    /* counters */
    $$('[data-count]').forEach(function(el){
      var end=parseFloat(el.dataset.count),suf=el.dataset.suf||'',o={n:0};
      ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:function(){gsap.to(o,{n:end,duration:1.8,ease:'power2.out',onUpdate:function(){el.textContent=Math.round(o.n)+suf}})}});
    });
    /* timeline */
    $$('.steps').forEach(function(s){
      var fill=$('.fill',s),items=$$('.step',s);
      var orb=document.createElement('i');orb.className='orb';s.appendChild(orb);
      gsap.to(fill,{scaleY:1,ease:'none',scrollTrigger:{trigger:s,start:'top 60%',end:'bottom 70%',scrub:true,onUpdate:function(self){gsap.set(orb,{y:self.progress*(s.offsetHeight-30)+5})}}});
      items.forEach(function(it){ScrollTrigger.create({trigger:it,start:'top 62%',onToggle:function(t){it.classList.toggle('on',t.isActive||t.progress>0)},onEnter:function(){it.classList.add('on')},onLeaveBack:function(){it.classList.remove('on')}})});
    });
    var mm=gsap.matchMedia();
    /* pinned storytelling */
    mm.add('(min-width:861px)',function(){
      var p=$('.pin');if(!p)return;
      var steps=$$('.pin-step',p),vis=$$('.card-v',p),dots=$$('.dots i',p),n=steps.length;
      var tl=gsap.timeline({scrollTrigger:{trigger:p,start:'top top',end:'+='+(n*70)+'%',pin:true,scrub:.6},defaults:{ease:'none'}});
      for(var i=1;i<n;i++){
        tl.to(steps[i-1],{opacity:0,y:-40,duration:.5},'s'+i).to(vis[i-1],{opacity:0,scale:.92,duration:.5},'s'+i)
          .fromTo(steps[i],{opacity:0,y:40},{opacity:1,y:0,duration:.5},'s'+i+'+=.3').fromTo(vis[i],{opacity:0,scale:1.08},{opacity:1,scale:1,duration:.5},'s'+i+'+=.3')
          .call(function(k){return function(){dots.forEach(function(d,j){d.classList.toggle('on',j===k)})}}(i),null,'s'+i+'+=.4');
      }
      tl.to({},{duration:.4});
    });
    /* horizontal work scroll */
    mm.add('(min-width:861px)',function(){
      var h=$('.hs');if(!h)return;var tr=$('.hs-track',h);
      var dist=function(){return tr.scrollWidth-innerWidth};
      gsap.to(tr,{x:function(){return-dist()},ease:'none',scrollTrigger:{trigger:h,start:'top 12%',end:function(){return'+='+dist()},pin:true,scrub:.6,invalidateOnRefresh:true}});
    });
    mm.add('(max-width:860px)',function(){var tr=$('.hs-track');if(tr){tr.parentNode.style.overflowX='auto'}});
    addEventListener('load',function(){ScrollTrigger.refresh()});
  }
  if(window.gsap&&window.ScrollTrigger)init();
  else{var t=0,iv=setInterval(function(){t++;if(window.gsap&&window.ScrollTrigger){clearInterval(iv);init()}else if(t>40){clearInterval(iv);root.classList.add('ready')}},100)}
})();
