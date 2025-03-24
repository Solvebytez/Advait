
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

// Function to start counting when the element is in view
const startCounting = (counter) => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        // Lower inc to slow and higher to slow
        const inc = target / speed;

        // Check if target is reached
        if (count < target) {
            // Add inc to count and output in counter
            counter.innerText = Math.ceil(count + inc);
            // Call function every ms
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
        }
    };

    updateCount();
};

// IntersectionObserver to trigger counter start when visible
const observerOptions = {
    threshold: 0.5 // This means 50% of the element should be visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Start counting when the element is in view
            startCounting(entry.target);
            observer.unobserve(entry.target); // Stop observing after counting starts
        }
    });
}, observerOptions);

// Observe each counter element
counters.forEach(counter => {
    observer.observe(counter);
});
