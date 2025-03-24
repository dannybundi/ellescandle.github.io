
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM loaded");
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline();

    tl.from(".navbar", {
        top: "-60px",
        duration: 2.1,
        ease: "back"
    }, "first")

    tl.from(".hero-center", {
        top: "-900px",
        duration: 2,
        ease: "back"
    }, "first+=1")

    tl.from(".this h2", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "back"
    })

    tl.from(".services li", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.3, // Delay between each list item
        ease: "power2.out"
    })

    tl.to(".cover-img", {
        scale: "1.1",
        duration: 2,
        ease: "power1.inOut",
        delay: 1
    }, "first+=1")

    tl.from("#hText", {
        x: "1000px",
        duration: 1.5,
        ease: "power2.inOut"
    }, "first+=1")

    gsap.from("footer", {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
            trigger: ".about-us", // Trigger when About Us section is in view
            start: "top bottom",  // Footer animation starts when About Us reaches the bottom of the screen
            end: "bottom top",    // Footer animation ends when About Us section leaves the screen
            scrub: true
        }
    })

    const elements = gsap.utils.toArray([".about-intro p", ".about-intro h2", ".main-about img", ".main-about h3", ".main-about p", ".why-products", ".why-products img", ".why-products h3", ".why-products p"]);

    elements.forEach((element) => {
    gsap.from(element, {
        opacity: 0,
        y: 20, // Moves slightly up
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
            trigger: element, // Each element has its own trigger
        start: "top 80%",
        end: "top 40%"
        }
    });
})
})