// scroll reveal animation
const revealElements = document.querySelectorAll("[data-reveal]");
const scrollReveal = function(){
    for (let i = 0; i < revealElements.length; i++){
        const elementsonScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;
        if(elementsonScreen){
            revealElements[i].classList.add("revealed");
        } else {
            revealElements[i].classList.remove("revealed");
        }
    }
}
window.addEventListener("scroll", scrollReveal);
scrollReveal();

// back to top
const backtoTop = document.querySelector("[data-back-top]");
window.addEventListener("scroll", function (){
    const bodyHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollEndPos = bodyHeight - windowHeight;
    const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;
    backtoTop.textContent = `${totalScrollPercent.toFixed(0)}%`;

    if (totalScrollPercent > 5){
        backtoTop.classList.add('show');
    } else {
        backtoTop.classList.remove('show');
    }
});

// HEADER NAVBAR
const ul = document.querySelector('.hex_navbar ul');
const overlay = document.querySelector('.overlay');
const icon = document.querySelector('.nav_toggle i');
const items = ul.querySelectorAll('li');

//close navbar function
function closeNavbar(){
    items.forEach(item => {
        item.style.transform = 'translateY(-20px)';
    });
    setTimeout(() => {
        ul.classList.remove('show');
        overlay.classList.remove('show');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-close');
    }, 500);
}

// toggle navbar
document.querySelector('.nav_toggle').addEventListener('click', function(){
    if (ul.classList.contains('show')){
        closeNavbar();
    } else {
        ul.classList.add('show');
        overlay.classList.add('show');
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-close');
        items.forEach((item, index) => {
            item.style.transform = `translateY(${index * 60}px)`;
        });
    }
});

//scroll to section and close navbar
document.querySelector('.hex_navbar').addEventListener('click', function(e){
    if(e.target.tagName === 'A'){
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
        setTimeout(closeNavbar, 800);
    }
});

//close navbar on clicking outside 
document.addEventListener('click', function(event){
    const isClickInsideNav = event.target.closest('.hex_navbar') || 
    event.target.closest('.nav_toggle');
    if (!isClickInsideNav && ul.classList.contains('show')){
        closeNavbar();
    }
})

// HOME SECTION SLIDER
document.getElementById('next').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
}
document.getElementById('prev').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(lists[lists.length - 1]);
}
