// simple email validator
const isValidEmail = (email) => {
    const trimmed = (email || '').trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

//handle loading show
const showLoader=()=>{
    document.getElementById('loader').classList.remove('invisible');
    document.getElementById('voc_container').classList.add('invisible');

}

//handle loading hide
const hideLoader=()=>{
    document.getElementById('loader').classList.add('invisible');
    document.getElementById('voc_container').classList.remove('invisible');
}

// handling logging and signup
const loginButton = () => {
    const headerSection = document.getElementById('header');
    const learnSection = document.getElementById('learn');
    const faqSection = document.getElementById('faq');
    const footerSection = document.getElementById('footer');
    const bannerSection = document.getElementById('banner');
    const bannerEmail = document.getElementById('bannerEmail');
    const bannerPassword = document.getElementById('bannerPassword');
    const bannerButton = document.getElementById('bannerButton');
    if (!bannerButton) return;
    bannerButton.addEventListener('click', function () {
        const email = bannerEmail.value.trim();
        const password = bannerPassword.value;

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            bannerEmail.focus();
            return;
        }
        if (password === '12345') {
            headerSection.classList.remove('hidden');
            learnSection.classList.remove('hidden');
            faqSection.classList.remove('hidden');
            footerSection.classList.remove('hidden');
        } else {
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

// load data from api for all level lessons
const loadData = async () => {
    showLoader();
    const response = await fetch(`https://openapi.programming-hero.com/api/levels/all`);
    const data = await response.json();
    displayAllBtn(data.data);
}
loadData();



// load all button from api for all level lessons
const displayAllBtn = (allData) => {
    const voc_button_container = document.getElementById('voc_btn_container');
    if (!voc_button_container) return;
    voc_button_container.classList.add('flex', 'gap-4', 'justify-center', 'my-7');
    allData.forEach(data => {
        const div = document.createElement('div');
        div.innerHTML = `
            <button onclick="loadDataByLevelId(${data.level_no})" class="btn btn-outline btn-primary lesson-btn" data-level="${data.level_no}">
                <i class="fa-solid fa-book-open"></i>  Lesson - ${data.level_no}
            </button>
        `;
        voc_button_container.appendChild(div);
    });
    hideLoader();
}

// Function to update active lesson button
const updateActiveLesson = (levelNo) => {
    // Remove active class from all lesson buttons
    const allLessonButtons = document.querySelectorAll('.lesson-btn');
    allLessonButtons.forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
    });
    
    // Add active class to clicked button
    const activeButton = document.querySelector(`[data-level="${levelNo}"]`);
    if (activeButton) {
        activeButton.classList.remove('btn-outline');
        activeButton.classList.add('btn-primary');
    }
}


// load data by level id 
const loadDataByLevelId = async (id) => {
    updateActiveLesson(id); // Update active button first
    showLoader(); // Show loader while fetching data
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/level/${id}`);
        const data = await response.json();
        displayDataByLevelId(data.data);
    } catch (error) {
        console.error('Error loading data:', error);
        hideLoader();
    }
};


// display data by level id 
const displayDataByLevelId = (data) => {
    const voc_container = document.getElementById('voc_content');
    const voc_container_text = document.getElementById('voc_content_text');
    
    // Clear previous data first
    voc_container.innerHTML = '';
    
    // Add styling and hide text
    voc_container.classList.add('grid','gap-5','grid-cols-3','p-5');
    voc_container_text.classList.add('hidden');
    
    // Hide error container when data is found
    const voc_container_error = document.getElementById('voc_content_error');
    if (voc_container_error) {
        voc_container_error.classList.add('hidden');
    }
    
    if (data.length > 0) {
        const sixData = data.slice(0, 6);
        sixData.forEach(data => {
            console.log(data);
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="card bg-base-100  shadow-sm">
                    <div class="card-body text-center">
                        <h2 class="text-2xl font-bold">${data.word}</h2>
                        <p>Meaning : ${data.meaning}</p>
                        <p>pronunciation : ${data.pronunciation}</p>
                        <div class="card-actions  flex justify-between">
                            <div>
                                <button onclick="loadDataByWordId(${data.id})" class="btn bg-[#e8f4ff]">
                                    <i class="fa-solid fa-circle-info"></i>
                                </button>
                            </div>
                            <div>
                                <button class="btn bg-[#e8f4ff]">
                                    <i class="fa-solid fa-volume-high"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
            voc_container.appendChild(div);
        });
        hideLoader(); // Hide loader after all cards are created
    } else {
        // console.log('data not found ');
        const voc_container_error = document.getElementById('voc_content_error');
        voc_container_error.classList.remove('hidden');
        hideLoader();
    }
}
// load data when view word details is clicked 
const loadDataByWordId=(id)=>{
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(res=> res.json())
    .then(data=>displayByWordId(data.data))
}

// display data by word id 
const displayByWordId=(data)=>{
console.log(data)
hideLoader();
}