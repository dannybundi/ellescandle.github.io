document.addEventListener("DOMContentLoaded", (event) => {
    console.log("here");
    gsap.registerPlugin(ScrollTrigger) 

    gsap.to(".item", {
        filter: "blur(10px)", // Adjust blur intensity
        duration: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".navbar", // The section to apply the effect
            start: "top 100px", // Start blurring when products reach near the navbar
            end: "top 60px", // Maximum blur before it reaches the navbar
            scrub: true, // Smooth effect as you scroll
        }
    });
})