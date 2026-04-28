export const Animations = {
  revealDashboard: () => {
    const tl = gsap.timeline({
      defaults: { ease: "back.out(1.7)", duration: 0.8 },
    });

    tl.to("#app-container", { opacity: 1, duration: 0.5, ease: "power1.out" })
      .from(".logo", { x: -50, opacity: 0 }, "-=0.3")
      .from(".balance-card", { x: 50, opacity: 0 }, "-=0.8")
      .from(
        ".card",
        {
          y: 30,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
        },
        "-=0.5",
      );

    return tl;
  },

  animateBalance: (oldValue, newValue) => {
    const obj = { value: oldValue };
    gsap.to(obj, {
      value: newValue,
      duration: 1.5,
      ease: "power3.out",
      onUpdate: () => {
        document.getElementById("balance-counter").innerText =
          `$${obj.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      },
    });
  },

  animateNewTransaction: (element) => {
    gsap.from(element, {
      x: -20,
      opacity: 0,
      backgroundColor: "#d1fae5",
      duration: 0.6,
      ease: "power2.out",
    });
  },

  toggleRealityView: (isAlternative) => {
    const tl = gsap.timeline();
    const items = document.querySelectorAll(".amount");

    tl.to(items, {
      scale: 0.8,
      opacity: 0,
      duration: 0.2,
      stagger: 0.05,
    }).to(items, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      stagger: 0.05,
      ease: "back.out(2)",
    });

    gsap.to(".list-panel", {
      backgroundColor: isAlternative ? "#f0fff4" : "rgba(220, 220, 220, 0.959)",
      duration: 0.5,
    });
  },

  animateAILoading: () => {
    return gsap.to("#ai-text", {
      text: "Analyzing your spending habits...",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  },

  animateAIResult: (content) => {
    gsap.to("#ai-text", {
      text: content,
      duration: 3,
      ease: "none",
    });
  },

  animateDeleteTransaction: (element) => {
    return gsap.to(element, {
      x: 50,
      opacity: 0,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 0,
      marginBottom: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => element.remove(),
    });
  },
};
