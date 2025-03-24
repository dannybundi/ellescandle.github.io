

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM loaded");

    let originaltext = document.getElementById("hText").innerHTML;
    document.getElementById("hText").innerHTML = "";
    gsap.registerPlugin(TextPlugin, ScrollTrigger);

    gsap.from(".nav", {
        opacity: 0,
        duration: 3,
        ease: "smooth"
    });

    window.addEventListener("load", () => {
        gsap.to("#hText", {
          text: originaltext,
          duration: 3,        // Duration of the animation
          ease: "power1.inOut",
          scrub: true
        });
    });

    gsap.to(".about_usText", {
        duration: 6,
        text: "Elle's Corner is a self-care brand dedicated to crafting all-natural products that deliver effective results while reducing the risks associated with chemical ingredients. Our product range includes nourishing solutions for skin, lips, hair, and beards, such as lip balm, body butter, beard oil, and hair oil, all designed to enhance your natural beauty and promote holistic care.",
        ease: "power1.inOut",
        color: "white",
        scrollTrigger: {
            trigger: "about_usText",
            start: "top 10%",
            scrub: true
        }
    })

    gsap.to('.img_1', {
        opacity: 1,
        duration: 2,
        rotation: -45,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.img_1',
          start: 'top 60%',
          scrub: true
        }
    })

    gsap.to('.img_2', {
        x: "20px",
        opacity: 1,
        duration: 1,
        rotation: 45,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.img_2',
          start: 'top 60%',
          scrub: true
        }
    })

})