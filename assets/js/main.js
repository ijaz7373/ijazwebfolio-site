(function(){
  var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
  var root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* nav, progress bar */
  var nav=$('.nav'),bar=$('#bar'),lastY=0;
  function onScroll(){
    var y=scrollY,h=root.scrollHeight-innerHeight;
    bar.style.transform='scaleX('+(h>0?y/h:0)+')';
    nav.classList.toggle('hide',y>lastY&&y>400&&!$('.ovl.open'));
    lastY=y;
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  var mbtn=$('.mbtn'),ovl=$('.ovl'),lenis=null;
  function toggleMenu(open){
    ovl.classList.toggle('open',open);mbtn.setAttribute('aria-expanded',open);document.body.classList.toggle('lock',open);
    mbtn.firstChild.nodeValue=open?'Close ':'Menu ';if(lenis)open?lenis.stop():lenis.start();
  }
  mbtn.addEventListener('click',function(){toggleMenu(!ovl.classList.contains('open'))});
  $$('.ovl a').forEach(function(a){a.addEventListener('click',function(){toggleMenu(false)})});
  addEventListener('keydown',function(e){if(e.key==='Escape')toggleMenu(false)});

  var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  /* hero spotlight follows pointer */
  var hero=$('.hero');
  if(hero&&!reduce)hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();hero.style.setProperty('--mx',(e.clientX-r.left)+'px');hero.style.setProperty('--my',(e.clientY-r.top)+'px');hero.style.setProperty('--px',((e.clientX-r.left)/r.width-.5)*2);hero.style.setProperty('--py',((e.clientY-r.top)/r.height-.5)*2)});

  /* hero video: only load on capable connections */
  var v=$('video[data-src]');
  if(v&&innerWidth>760&&!reduce&&!(navigator.connection&&navigator.connection.saveData)){
    var go=function(){v.src=v.dataset.src;v.addEventListener('canplay',function(){v.play().catch(function(){})},{once:true});v.addEventListener('error',function(){v.remove()})};
    'requestIdleCallback'in window?requestIdleCallback(go):setTimeout(go,1200);
  }else if(v)v.remove();

  /* hero letters bulge toward the cursor */
  if(hero&&matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduce)hero.addEventListener('pointermove',function(e){
    $$('.hero h1 .ch').forEach(function(c){var r=c.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),f=Math.max(0,1-Math.hypot(dx,dy)/170);
      c.style.transform=f?'translateY('+(-f*24)+'px) scale('+(1+f*.2)+') rotate('+(dx/-45*f)+'deg)':''});
  });
  /* hero constellation that reacts to the cursor */
  function net(){
    if(!hero||reduce)return;var c=document.createElement('canvas');c.className='net';hero.insertBefore(c,hero.firstChild);
    var x=c.getContext('2d'),W,H,P=[],m={x:-999,y:-999},on=false,dpr=Math.min(devicePixelRatio||1,2);
    function size(){W=hero.clientWidth;H=hero.clientHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);var n=W<900?26:Math.round(W*H/20000);P=[];for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:Math.random()*.5-.25,vy:Math.random()*.5-.25,r:1.5+Math.random()*2})}
    size();addEventListener('resize',size);
    hero.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();m.x=e.clientX-r.left;m.y=e.clientY-r.top});
    hero.addEventListener('pointerleave',function(){m.x=-999});
    new IntersectionObserver(function(en){on=en[0].isIntersecting;if(on)loop()}).observe(hero);
    function loop(){
      if(!on)return;requestAnimationFrame(loop);x.clearRect(0,0,W,H);
      for(var i=0;i<P.length;i++){
        var p=P[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
        var dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy);
        if(d<140){p.x+=dx/d*(140-d)*.04;p.y+=dy/d*(140-d)*.04}
        x.fillStyle='rgba(239,105,39,.55)';x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fill();
        for(var k=i+1;k<P.length;k++){var q=P[k],l=Math.hypot(p.x-q.x,p.y-q.y);if(l<120){x.strokeStyle='rgba(239,105,39,'+(.28*(1-l/120))+')';x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke()}}
        if(d<190){x.strokeStyle='rgba(239,105,39,'+(.5*(1-d/190))+')';x.lineWidth=1.2;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(m.x,m.y);x.stroke();x.lineWidth=1}
      }
    }
  }

  /* cards: spotlight + tilt */
  
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
    $$('a,button,.card,.proj,.tab').forEach(function(el){var t=el.dataset.cursor||'';el.addEventListener('pointerenter',function(){cur.textContent=t;cur.classList.add(t?'txt':'big')});el.addEventListener('pointerleave',function(){cur.textContent='';cur.classList.remove('big','txt')})});
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
    if(!window.gsap||!window.ScrollTrigger||reduce){root.classList.add('ready');var pp=$('.pre');if(pp)pp.style.display='none';$$('.eyebrow').forEach(function(e){e.classList.add('in')});return}
    gsap.registerPlugin(ScrollTrigger);
    if(window.Draggable)gsap.registerPlugin(Draggable);
    /* loader counter, then curtain lifts */
    var pre=$('.pre'),heroDelay=150;
    if(pre&&!root.classList.contains('nopre')){
      heroDelay=1900;var cnt=$('.pre-n'),bar=$('.pre-bar'),o0={n:0};
      gsap.to(o0,{n:100,duration:1.2,ease:'power2.inOut',onUpdate:function(){cnt.textContent=Math.round(o0.n);gsap.set(bar,{scaleX:o0.n/100})},onComplete:function(){
        gsap.to(pre,{yPercent:-100,duration:.9,ease:'power4.inOut',delay:.15,onComplete:function(){pre.remove()}})}});
    }else if(root.classList.contains('wiped')){
      heroDelay=800;gsap.to('.wipe i',{scaleY:0,transformOrigin:'top',stagger:.07,duration:.7,ease:'power3.inOut',delay:.1,onComplete:function(){root.classList.remove('wiped')}});
    }
    /* page wipe transition on internal links */
    document.addEventListener('click',function(e){
      var a=e.target.closest&&e.target.closest('a[href]');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank')return;
      var u=new URL(a.href,location.href);if(u.origin!==location.origin||(u.pathname===location.pathname&&u.hash)||!/(\.html|\/)$/.test(u.pathname))return;
      e.preventDefault();try{sessionStorage.setItem('wipe','1')}catch(_){}
      gsap.set('.wipe i',{transformOrigin:'bottom'});
      gsap.to('.wipe i',{scaleY:1,stagger:.06,duration:.5,ease:'power3.inOut',onComplete:function(){location.href=u.href}});
    });
    addEventListener('pageshow',function(e){if(e.persisted)gsap.set('.wipe i',{scaleY:0})});
    if(window.Lenis){
      lenis=new Lenis({lerp:.09,smoothWheel:true});
      lenis.on('scroll',ScrollTrigger.update);
      lenis.on('scroll',function(e){gsap.to('.band .t',{skewX:Math.max(-10,Math.min(10,e.velocity*-.6)),duration:.35,overwrite:'auto'})});
      gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0);
      $$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var t=$(a.getAttribute('href'));if(t){e.preventDefault();lenis.scrollTo(t)}})});
    }
    /* word-by-word scroll-scrubbed text */
    $$('[data-scrub]').forEach(function(el){
      var words=el.textContent.trim().split(/\s+/);el.textContent='';
      var sp=words.map(function(w){var s=document.createElement('span');s.className='sw';s.textContent=w;el.appendChild(s);el.appendChild(document.createTextNode(' '));return s});
      gsap.fromTo(sp,{opacity:.14},{opacity:1,stagger:.12,ease:'none',scrollTrigger:{trigger:el,start:'top 82%',end:'bottom 52%',scrub:true}});
    });
    /* split headings into masked words */
    $$('[data-split]').forEach(function(el){
      (function wrap(n){
        [].slice.call(n.childNodes).forEach(function(c){
          if(c.nodeType===3){
            var f=document.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach(function(p){
              if(!p.trim()){f.appendChild(document.createTextNode(p));return}
              var w=document.createElement('span');w.className='w';var s=document.createElement('span');if(el.closest('.hero')){p.split('').forEach(function(ch){var c=document.createElement('span');c.className='ch';c.textContent=ch;s.appendChild(c)})}else s.textContent=p;w.appendChild(s);f.appendChild(w);
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
      var go=function(){gsap.to(words,{yPercent:0,rotate:0,duration:1,ease:'power4.out',stagger:.05,onComplete:function(){$$('.w',el).forEach(function(w){w.style.overflow='visible'})}})};
      el.closest('.hero')?setTimeout(go,heroDelay):ScrollTrigger.create({trigger:el,start:'top 88%',once:true,onEnter:go});
    });
    /* varied reveal-on-scroll: each kind of element enters differently */
    var fromFor=function(el,i){
      if(el.matches('.card,.grid-proj>*'))return{y:90,x:i%2?70:-70,rotateX:-30,transformPerspective:900,scale:.9};
      if(el.matches('.checks li'))return{x:i%2?90:-90};
      if(el.matches('.step'))return{x:-90};
      if(el.matches('.stat'))return{y:70,scale:.7};
      if(el.matches('.side>*,form.f'))return{y:60,scale:.96};
      if(el.matches('p.lead,.note,p'))return{y:34,filter:'blur(10px)'};
      return{y:60};
    };
    $$('[data-r]').forEach(function(el,i){var f=fromFor(el,i);f.opacity=0;gsap.set(el,f)});
    ScrollTrigger.batch('[data-r]',{start:'top 91%',once:true,onEnter:function(b){gsap.to(b,{y:0,x:0,rotateX:0,scale:1,opacity:1,filter:'blur(0px)',duration:1.1,ease:'power4.out',stagger:.1,clearProps:'transform,filter'})}});
    /* eyebrow rules draw in */
    $$('.eyebrow').forEach(function(e){ScrollTrigger.create({trigger:e,start:'top 92%',once:true,onEnter:function(){e.classList.add('in')}})});
    /* sections open up like cards as they scroll into view */
    $$('.sec:not(.deck):not(.cta)').forEach(function(sec){
      var prev=sec.previousElementSibling;if(prev&&prev.classList.contains('pin-spacer'))prev=prev.firstElementChild;
      if(prev&&prev.matches('.zoom,.stage,.ring'))return;
      gsap.fromTo(sec,{clipPath:'inset(7% 4% 0% 4% round 56px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'none',clearProps:'clipPath',scrollTrigger:{trigger:sec,start:'top 100%',end:'top 35%',scrub:true}});
    });
    /* zoom through the letter (one per page) */
    $$('.zoom').forEach(function(z){gsap.matchMedia().add('(min-width:861px)',function(){
      var t=$('.zoom-t',z),o=$('span',t),mask=$('.zoom-mask',z),cap=$('.zoom-cap',z),k=$('.zoom-k',z);if(!o)return;
      var tr=t.getBoundingClientRect(),or=o.getBoundingClientRect();
      gsap.set(t,{transformOrigin:(or.left+or.width/2-tr.left)+'px '+(or.top+or.height/2-tr.top)+'px'});
      gsap.set(cap,{scale:.85});
      var tl=gsap.timeline({scrollTrigger:{trigger:z,start:'top top',end:'+=240%',pin:true,scrub:.7,invalidateOnRefresh:true,refreshPriority:9}});
      tl.to(t,{scale:parseFloat(z.dataset.scale)||24,ease:'power3.in',duration:3}).to(k,{opacity:0,duration:.4},0)
        .to(mask,{opacity:0,duration:.7},'-=.7').to(cap,{opacity:1,scale:1,duration:.9,ease:'power2.out'},'-=.3').to({},{duration:.8});
    })});
    /* 3d photo ring spins with the scroll and tilts with the mouse */
    $$('.ring').forEach(function(sec){
      var r=$('.ring-r',sec),scene=$('.ring-scene',sec),mm2=gsap.matchMedia();
      mm2.add('(min-width:861px)',function(){gsap.fromTo(r,{rotationY:0},{rotationY:-360,ease:'none',scrollTrigger:{trigger:sec,start:'top top',end:'+=260%',pin:true,scrub:.8,refreshPriority:8}})});
      mm2.add('(max-width:860px)',function(){gsap.fromTo(r,{rotationY:0},{rotationY:-360,ease:'none',scrollTrigger:{trigger:sec,start:'top bottom',end:'bottom top',scrub:.8}})});
      if(fine)sec.addEventListener('pointermove',function(e){gsap.to(scene,{rotationX:((e.clientY/innerHeight)-.5)*-16,rotationZ:((e.clientX/innerWidth)-.5)*4,duration:.8,ease:'power2.out'})});
    });
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
    /* services deck: earlier cards shrink back as the next one stacks on top */
    var dc=$$('.deck-card');
    dc.forEach(function(c,i){if(i<dc.length-1)gsap.to(c,{scale:.93,ease:'none',scrollTrigger:{trigger:dc[i+1],start:'top 82%',end:'top 22%',scrub:true}})});
    /* photo rows slide in opposite directions */
    $$('.gal-row').forEach(function(t){
      var d=parseFloat(t.dataset.dir),dist=function(){return Math.max(0,t.scrollWidth-innerWidth)};
      gsap.fromTo(t,{x:function(){return d<0?0:-dist()}},{x:function(){return d<0?-dist():0},ease:'none',scrollTrigger:{trigger:t,start:'top bottom',end:'bottom top',scrub:.6,invalidateOnRefresh:true}});
    });
    /* tags fall in and can be dragged around */
    $$('.play').forEach(function(box){
      var pills=$$('.pill-t',box);if(!pills.length||!window.Draggable)return;
      box.classList.add('on');var W=box.clientWidth,H=box.clientHeight,z=10;
      pills.forEach(function(p){gsap.set(p,{x:10+Math.random()*(W-p.offsetWidth-20),y:10+Math.random()*(H-p.offsetHeight-20),rotate:Math.random()*16-8})});
      ScrollTrigger.create({trigger:box,start:'top 75%',once:true,onEnter:function(){gsap.from(pills,{y:-H*1.2,opacity:0,duration:1.4,ease:'bounce.out',stagger:.07})}});
      Draggable.create(pills,{type:'x,y',bounds:box,edgeResistance:.9,
        onPress:function(){this.target.style.zIndex=++z;gsap.to(this.target,{scale:1.14,duration:.2})},
        onDrag:function(){gsap.to(this.target,{rotate:Math.max(-25,Math.min(25,this.deltaX*1.5)),duration:.25})},
        onRelease:function(){gsap.to(this.target,{scale:1,rotate:Math.random()*14-7,duration:.7,ease:'elastic.out(1,.45)'})}});
    });
    /* photo trail follows the cursor over the final call-to-action */
    if(fine)$$('.cta').forEach(function(sec){
      var n=[1,4,6,7,8,5,2,11],k=0,last={x:-999,y:-999};
      sec.addEventListener('pointermove',function(e){
        var r=sec.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
        if(Math.hypot(x-last.x,y-last.y)<110)return;last={x:x,y:y};
        var im=new Image();im.src='assets/img/p'+('0'+n[k++%n.length]).slice(-2)+'.webp';im.className='tr';im.alt='';sec.appendChild(im);
        gsap.set(im,{x:x-60,y:y-80,rotate:Math.random()*20-10});
        gsap.fromTo(im,{scale:.3,opacity:0},{scale:1,opacity:1,duration:.4,ease:'back.out(2)'});
        gsap.to(im,{opacity:0,scale:.6,y:y-130,delay:.75,duration:.5,onComplete:function(){im.remove()}});
      });
    });
    net();
    var mm=gsap.matchMedia();
    /* pinned storytelling */
    mm.add('(min-width:861px)',function(){
      var p=$('.pin');if(!p)return;
      var steps=$$('.pin-step',p),vis=$$('.card-v',p),dots=$$('.dots i',p),n=steps.length;
      var tl=gsap.timeline({scrollTrigger:{trigger:p,start:'top top',end:'+='+(n*70)+'%',pin:true,scrub:.6,refreshPriority:10},defaults:{ease:'none'}});
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
      gsap.to(tr,{x:function(){return-dist()},ease:'none',scrollTrigger:{trigger:h,start:'top 12%',end:function(){return'+='+dist()},pin:true,scrub:.6,invalidateOnRefresh:true,refreshPriority:7}});
    });
    mm.add('(max-width:860px)',function(){var tr=$('.hs-track');if(tr){tr.parentNode.style.overflowX='auto'}});
    addEventListener('load',function(){ScrollTrigger.refresh();load3d()});
  }
  /* floating 3D object that travels with the scroll (desktop only, loaded after everything else) */
  function load3d(){
    if(innerWidth<901||reduce||(navigator.connection&&navigator.connection.saveData))return;
    var go=function(){
      var sc=document.createElement('script');sc.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';sc.onload=start3d;document.head.appendChild(sc);
    };
    'requestIdleCallback'in window?requestIdleCallback(go,{timeout:3000}):setTimeout(go,1500);
  }
  /* three.js scene: scattered dots assemble into a ring, a sphere, then a knot as you scroll */
  function initStage(T){
    var cv=$('.stage-cv'),host=cv.parentNode,sec=$('.stage'),labs=$$('.stage-lab',sec);
    var r=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true});r.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
    var scene=new T.Scene(),cam=new T.PerspectiveCamera(45,1,.1,100);cam.position.set(0,0,12);
    var N=96,inst=new T.InstancedMesh(new T.IcosahedronGeometry(.24,2),new T.MeshStandardMaterial({color:0xffffff,roughness:.22,metalness:.15}),N);scene.add(inst);
    var cols=[0xEF6927,0xEF6927,0xEF6927,0xFF8A4C,0x1b1411,0xffffff],col=new T.Color();
    for(var i=0;i<N;i++)inst.setColorAt(i,col.setHex(cols[i%cols.length]));
    scene.add(new T.AmbientLight(0xffffff,.85));var dl=new T.DirectionalLight(0xffffff,1.3);dl.position.set(4,6,8);scene.add(dl);
    var pl=new T.PointLight(0xEF6927,1.4,30);pl.position.set(-6,-3,5);scene.add(pl);
    var sc=[],rg=[],sp=[],kn=[],ga=Math.PI*(3-Math.sqrt(5));
    for(i=0;i<N;i++){
      sc.push([(Math.random()-.5)*20,(Math.random()-.5)*12,(Math.random()-.5)*10]);
      var a=i/N*6.2832;rg.push([Math.cos(a)*3.8,Math.sin(a)*3.8,Math.sin(a*3)*.6]);
      var y=1-(i/(N-1))*2,rr=Math.sqrt(1-y*y),th=ga*i;sp.push([Math.cos(th)*rr*3.1,y*3.1,Math.sin(th)*rr*3.1]);
      var t=i/N*6.2832,k=Math.cos(3*t)+2;kn.push([k*Math.cos(2*t)*1.35,k*Math.sin(2*t)*1.35,-Math.sin(3*t)*1.35]);
    }
    var sets=[sc,rg,sp,kn],d=new T.Object3D(),P=0,mx=0,my=0,vis=false,tm=0;
    function sm(x){return x*x*(3-2*x)}
    function draw(){
      var seg=Math.min(2.999,P*3),s0=Math.floor(seg),t0=seg-s0,A=sets[s0],B=sets[s0+1];
      for(var i=0;i<N;i++){
        var l=sm(Math.max(0,Math.min(1,t0*1.5-(i/N)*.5)));
        d.position.set(A[i][0]+(B[i][0]-A[i][0])*l,A[i][1]+(B[i][1]-A[i][1])*l,A[i][2]+(B[i][2]-A[i][2])*l);
        d.scale.setScalar(1+Math.sin(tm*2+i)*.12);d.updateMatrix();inst.setMatrixAt(i,d.matrix);
      }
      inst.instanceMatrix.needsUpdate=true;
      inst.rotation.y=P*Math.PI*.9+tm*.06+mx*.5;inst.rotation.x=my*.35;
    }
    function size(){var w=host.clientWidth,h=host.clientHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();inst.position.x=w>1000?2.8:0}
    size();addEventListener('resize',size);
    host.addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
    new IntersectionObserver(function(en){vis=en[0].isIntersecting}).observe(host);
    (function loop(){requestAnimationFrame(loop);if(!vis||document.hidden)return;tm+=.016;draw();r.render(scene,cam)})();
    gsap.matchMedia().add('(min-width:901px)',function(){
      ScrollTrigger.create({trigger:sec,start:'top top',end:'+=320%',pin:true,scrub:true,refreshPriority:8,onUpdate:function(s){P=s.progress;var n=Math.min(2,Math.floor(P*3));labs.forEach(function(l,k){l.classList.toggle('on',k===n)})}});
    });
    ScrollTrigger.refresh();
  }
  function start3d(){
    var T=window.THREE;if(!T)return;
    var cv=document.createElement('canvas');cv.id='orb3d';cv.width=cv.height=480;document.body.appendChild(cv);
    var r=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true});r.setPixelRatio(1);r.setSize(480,480,false);
    var scene=new T.Scene(),cam=new T.PerspectiveCamera(40,1,.1,50);cam.position.z=4.6;
    var mat=new T.MeshPhysicalMaterial({color:0xEF6927,metalness:.25,roughness:.18,clearcoat:1,clearcoatRoughness:.08});
    var mesh=new T.Mesh(new T.TorusKnotGeometry(.8,.28,180,28,2,3),mat);scene.add(mesh);
    scene.add(new T.AmbientLight(0xffffff,.7));
    var d=new T.DirectionalLight(0xffffff,1.2);d.position.set(3,4,5);scene.add(d);
    var p1=new T.PointLight(0xffd2b8,1.6,20);p1.position.set(-4,-2,3);scene.add(p1);
    var p2=new T.PointLight(0xffffff,1.1,20);p2.position.set(4,-3,-2);scene.add(p2);
    var vel=0,mx=0,my=0,vis=true;
    addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
    document.addEventListener('visibilitychange',function(){vis=!document.hidden});
    if(window.ScrollTrigger)ScrollTrigger.create({onUpdate:function(s){vel=s.getVelocity()/2500}});
    (function loop(){
      requestAnimationFrame(loop);if(!vis)return;
      vel*=.92;mesh.rotation.x+=.0014+vel*.12;mesh.rotation.y+=.0024+vel*.22;
      mesh.rotation.z+=(mx*.5-mesh.rotation.z)*.04;mesh.position.y+=(-my*.4-mesh.position.y)*.05;
      r.render(scene,cam);
    })();
    /* choose a spot per section, alternating sides */
    if($('.stage-cv'))initStage(T);
    var secs=$$('main > section'),w=function(){return innerWidth},h=function(){return innerHeight},S=240;
    function target(i){
      if(i===0)return{x:w()*.57,y:h()*.66,scale:.55,rotate:0};
      var left=i%2===0,big=i%3===0;
      return{x:left?-S*.28:w()-S*.72,y:h()*(big?.5:.42)-S/2,scale:big?.8:.6,rotate:left?-12:12};
    }
    gsap.set(cv,Object.assign({opacity:0},target(0)));
    gsap.to(cv,{opacity:1,duration:1.2,delay:1});
    secs.forEach(function(sec,i){
      ScrollTrigger.create({trigger:sec,start:'top 55%',end:'bottom 55%',onToggle:function(s){if(s.isActive)gsap.to(cv,Object.assign({duration:1.6,ease:'power3.inOut',opacity:sec.matches('.zoom,.stage,.ring')?0:1},target(i)))}});
    });
  }
  if(window.gsap&&window.ScrollTrigger)init();
  else{var t=0,iv=setInterval(function(){t++;if(window.gsap&&window.ScrollTrigger){clearInterval(iv);init()}else if(t>40){clearInterval(iv);root.classList.add('ready')}},100)}
})();
