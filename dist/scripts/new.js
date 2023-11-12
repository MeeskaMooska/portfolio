// Page variables
const overlay = document.getElementById('overlay');
var prevEvent, currentEvent;
let theme = 0;
let deviceSize = 'desktop'
const deviceSizeSettings = {
    'mobile': ['top: 52%', 'top: 8%'],
    'desktop': ['left: 52%', 'left: 8%']
}
let activeSlide = 'title-slide';

// Sets the initial blur effect.
overlay.style.backdropFilter = 'blur(2px)';

// Checks screen size on load.
if (window.screen.width < 600) {
    deviceSize = 'mobile'
}

// Tracks the cursor's position.
document.documentElement.onmousemove = function (event) {
    currentEvent = event;
}

// Tracks the speed of the cursor and applies a blur effect to the background based on the speed.
// Credit to: https://codepen.io/zFunx on codepen
setInterval(function () {
    if (prevEvent && currentEvent) {
        var movementX = Math.abs(currentEvent.screenX - prevEvent.screenX);
        var movementY = Math.abs(currentEvent.screenY - prevEvent.screenY);
        var movement = Math.sqrt(movementX * movementX + movementY * movementY);

        //speed=movement/100ms= movement/0.1s= 10*movement/s
        var speed = 10 * movement;//current speed
        const maxSpeed = 1500;
        const maxBlur = 2;
        const minBlur = 0;
        const blur = (maxSpeed - speed) / maxSpeed * (maxBlur - minBlur) + minBlur;

        overlay.style = `filter: blur(${blur}px)`;
    }

    prevEvent = currentEvent;
    prevSpeed = speed;
}, 100);

// Adjusts location of theme toggle on mobile.
if (window.screen.width < 600) {
    // Variables
    lineTwo = document.getElementById('version-line-two');
    themeBox = document.getElementById('theme-box');
    versionContainer = document.getElementById('version-container');

    // Remove and append theme box
    document.body.removeChild(themeBox);
    versionContainer.appendChild(themeBox);

    // Create new element to fill space
    flexLine = document.createElement('div');
    flexLine.className = 'version-line-one';
    versionContainer.appendChild(flexLine);
}

// Variables
const themeIndicator = document.getElementById('theme-indicator')
const darkIndicator = document.getElementById('dark-indicator')
const lightIndicator = document.getElementById('light-indicator')
const moonElipse = document.getElementById('moon-elipse')
function handleThemeToggle() {
    if (theme === 0) {
        document.documentElement.setAttribute('data-theme', 'dark')
        lightIndicator.style.color = 'white'
        darkIndicator.style.color = 'rgb(0, 162, 255)'
        themeIndicator.style = deviceSizeSettings[deviceSize][0]
        moonElipse.style.background = 'lightgrey'
        theme = 1
    } else {
        document.documentElement.setAttribute('data-theme', 'light')
        darkIndicator.style.color = 'black'
        lightIndicator.style.color = 'rgb(0, 162, 255)'
        themeIndicator.style = deviceSizeSettings[deviceSize][1]
        moonElipse.style.background = 'white'
        theme = 0
    }
}

/*function handleSlideChangeRequest(destination) {
    document.getElementById(activeSlide).style.left = '-100%';
    document.getElementById(destination).style.left = '0%';
}*/

const navBox = document.getElementById('nav-box')
const navUnderline = document.getElementById('nav-underline')
const titleSlideSelector = document.getElementById('title-slide-selector')
const aboutSlideSelector = document.getElementById('about-slide-selector')
const projectsSlideSelector = document.getElementById('projects-slide-selector')
const contactSlideSelector = document.getElementById('contact-slide-selector')
const titleSlide = document.getElementById('title-slide')
const aboutSlide = document.getElementById('about-slide')
const projectsSlide = document.getElementById('projects-slide')
const contactSlide = document.getElementById('contact-slide')
const slides = [titleSlide, aboutSlide, projectsSlide, contactSlide]
const underlinePaddingOffset = 4
const slidesInfo = {
    'title-slide': [titleSlideSelector, [0, 100, 200, 300]],
    'about-slide': [aboutSlideSelector, [-100, 0, 100, 200]],
    'projects-slide': [projectsSlideSelector, [-200, -100, 0, 100]],
    'contact-slide': [contactSlideSelector, [-300, -200, -100, 0]],
}
let slidePositionOffset = 0;

navUnderline.style.width = titleSlideSelector.offsetWidth + 'px'
navUnderline.style.transition = '.3s'

function handleSlideChangeRequest(destination) {
    // Re-Position the underline
    navUnderline.style.width = slidesInfo[destination][0].offsetWidth + 'px'
    navUnderline.style.left = calculateNavSelectorPosition(slidesInfo[destination][0]) - underlinePaddingOffset + 'px'

    // Re-Position the slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.left = slidesInfo[destination][1][i] + '%' //+ slidePositionOffset + '%'
    }
}

function calculateNavSelectorPosition(selector) {
    let boxPos = navBox.getBoundingClientRect()
    let selectorPos = selector.getBoundingClientRect()
    return selectorPos.x - boxPos.x
}
