gsap.registerPlugin(ScrollTrigger);
 
gsap.from("header", {
    y: -20,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
});
 
const tl = gsap.timeline();
 
tl.from("#titulo", {
    scale: 1,
    opacity: 0,
    duration: 0.8,
    ease: "sine.inOut"
})
 
.from(".hero-text", {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out"
})
 
.from("#titulo2", {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "sine.inOut"
})
 
.from("#info_inicial p", {
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: "sine.inOut"
})
 
.from("#buttons_inicial .btn", {
    y: 30,
    opacity: 1,
    duration: 0.6,
    stagger: 0.2,
    ease: "power2.out"
});
 
gsap.from("#img-hero", {
    scrollTrigger: {
        trigger: "#img-hero",
        start: "top 85%",
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
});
 
gsap.from(".animais", {
    scrollTrigger: {
        trigger: ".animais",
        start: "top 85%",
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
});
 
gsap.from(".caixas", {
    scrollTrigger: {
        trigger: ".caixas",
        start: "top 85%",
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
});
 
gsap.from(".rodape-conteudo", {
    scrollTrigger: {
        trigger: ".rodape-conteudo",
        start: "top 85%",

    },
    y: 40,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out"
});
