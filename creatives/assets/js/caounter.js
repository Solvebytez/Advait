  document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounter = (counter) => {
      const target = +counter.getAttribute('data-target');
      let count = 0;

      const updateCount = () => {
        const increment = target / speed;
        if (count < target) {
          count += increment;
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target); // Animate only once
        }
      });
    }, {
      threshold: 0.5 // You can adjust this value
    });

    counters.forEach(counter => {
      observer.observe(counter);
    });
  });
