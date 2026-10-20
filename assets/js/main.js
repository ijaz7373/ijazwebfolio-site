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
    if(!window.gsap||!window.ScrollTrigger||reduce){root.classList.add('ready');return}
    gsap.registerPlugin(ScrollTrigger);
    if(window.Lenis){
      lenis=new Lenis({lerp:.09,smoothWheel:true});
      lenis.on('scroll',ScrollTrigger.update);
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
  function start3d(){
    var T=window.THREE;if(!T)return;
    var cv=document.createElement('canvas');cv.id='orb3d';cv.width=cv.height=760;document.body.appendChild(cv);
    var r=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true});r.setPixelRatio(1);r.setSize(760,760,false);
    var scene=new T.Scene(),cam=new T.PerspectiveCamera(40,1,.1,50);cam.position.z=4.6;
    var mat=new T.MeshPhysicalMaterial({color:0x7c3aed,metalness:.25,roughness:.18,clearcoat:1,clearcoatRoughness:.08});
    var mesh=new T.Mesh(new T.TorusKnotGeometry(.8,.28,180,28,2,3),mat);scene.add(mesh);
    scene.add(new T.AmbientLight(0xffffff,.7));
    var d=new T.DirectionalLight(0xffffff,1.2);d.position.set(3,4,5);scene.add(d);
    var p1=new T.PointLight(0xf472b6,1.6,20);p1.position.set(-4,-2,3);scene.add(p1);
    var p2=new T.PointLight(0xfbbf24,1.1,20);p2.position.set(4,-3,-2);scene.add(p2);
    var vel=0,mx=0,my=0,vis=true;
    addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
    document.addEventListener('visibilitychange',function(){vis=!document.hidden});
    if(window.ScrollTrigger)ScrollTrigger.create({onUpdate:function(s){vel=s.getVelocity()/2500}});
    (function loop(){
      requestAnimationFrame(loop);if(!vis)return;
      vel*=.92;mesh.rotation.x+=.004+vel*.6;mesh.rotation.y+=.007+vel;
      mesh.rotation.z+=(mx*.5-mesh.rotation.z)*.04;mesh.position.y+=(-my*.4-mesh.position.y)*.05;
      r.render(scene,cam);
    })();
    /* choose a spot per section, alternating sides */
    var secs=$$('main > section'),w=function(){return innerWidth},h=function(){return innerHeight},S=380;
    function target(i){
      if(i===0)return{x:w()*.56,y:h()*.62,scale:.5,rotate:0};
      var left=i%2===0,big=i%3===0;
      return{x:left?-S*.28:w()-S*.72,y:h()*(big?.5:.42)-S/2,scale:big?.95:.62,rotate:left?-12:12};
    }
    gsap.set(cv,Object.assign({opacity:0},target(0)));
    gsap.to(cv,{opacity:1,duration:1.2,delay:1});
    secs.forEach(function(sec,i){
      ScrollTrigger.create({trigger:sec,start:'top 55%',end:'bottom 55%',onToggle:function(s){if(s.isActive)gsap.to(cv,Object.assign({duration:1.6,ease:'power3.inOut'},target(i)))}});
    });
  }
  if(window.gsap&&window.ScrollTrigger)init();
  else{var t=0,iv=setInterval(function(){t++;if(window.gsap&&window.ScrollTrigger){clearInterval(iv);init()}else if(t>40){clearInterval(iv);root.classList.add('ready')}},100)}
})();
