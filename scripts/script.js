// simple email validator
const isValidEmail = (email)=>{
    const trimmed = (email || '').trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

// handling logging and signup
const loginButton = ()=>{
    const headerSection = document.getElementById('header');
    const learnSection = document.getElementById('learn');
    const faqSection = document.getElementById('faq');
    const footerSection = document.getElementById('footer');
    const bannerSection = document.getElementById('banner');
    const bannerEmail = document.getElementById('bannerEmail');
    const bannerPassword = document.getElementById('bannerPassword');
    const bannerButton = document.getElementById('bannerButton');
    if(!bannerButton) return;
    bannerButton.addEventListener('click', function () {
        const email = bannerEmail.value.trim();
        const password = bannerPassword.value;

        if(!isValidEmail(email)){
            alert('Please enter a valid email address');
            bannerEmail.focus();
            return;
        }
        if(password === '12345'){
            headerSection.classList.remove('hidden');
            learnSection.classList.remove('hidden');
            faqSection.classList.remove('hidden');
            footerSection.classList.remove('hidden');
        }else{
            alert('Invalid password');
        }
        bannerEmail.value = '';
        bannerPassword.value = '';
    });
}
loginButton();

// function for logout
document.addEventListener('DOMContentLoaded', function () {
    const logoutBtn = document.getElementById('logoutBtn');
    if (!logoutBtn) return;

    logoutBtn.addEventListener('click', function () {
        const headerSection = document.getElementById('header');
        const learnSection = document.getElementById('learn');
        const faqSection = document.getElementById('faq');
        const footerSection = document.getElementById('footer');
        const bannerSection = document.getElementById('banner');
        const bannerEmail = document.getElementById('bannerEmail');
        const bannerPassword = document.getElementById('bannerPassword');

        if (headerSection) headerSection.classList.add('hidden');
        if (learnSection) learnSection.classList.add('hidden');
        if (faqSection) faqSection.classList.add('hidden');
        if (footerSection) footerSection.classList.add('hidden');
        if (bannerSection) bannerSection.classList.remove('hidden');

        if (bannerEmail) bannerEmail.value = '';
        if (bannerPassword) bannerPassword.value = '';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

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

