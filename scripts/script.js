// function for moving to other section by click on button
document.addEventListener('DOMContentLoaded', function () {
    const faqButton = document.getElementById('faqBtn');
    const faqSection = document.getElementById('faq');
    const learnButton = document.getElementById('learnBtn');
    const learnSection = document.getElementById('learn');

    if (faqButton && faqSection) {
        faqButton.addEventListener('click', function () {
            faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    if (learnButton && learnSection) {
        learnButton.addEventListener('click', function () {
            learnSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});

