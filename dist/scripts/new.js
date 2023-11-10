const overlay = document.getElementById('overlay');
overlay.style.backdropFilter = 'blur(2px)';
var prevEvent, currentEvent;
document.documentElement.onmousemove = function (event) {
    currentEvent = event;
}
let theme = 0;
let deviceSize = 'desktop'

if (window.screen.width < 600) {
    deviceSize = 'mobile'
}

const deviceSizeSettings = {
    'mobile' : ['top: 52%', 'top: 8%'],
    'desktop' : ['left: 52%', 'left: 8%']
}

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

/* 
if (window.screen.width < 600) {
    themeBox = document.getElementById('theme-box');
    versionContainer = document.getElementById('version-container');
    document.body.removeChild(themeBox);
    versionContainer.appendChild(themeBox);
}
*/

const themeIndicator = document.getElementById('theme-indicator')
const darkIndicator = document.getElementById('dark-indicator')
const lightIndicator = document.getElementById('light-indicator')
const moonElipse = document.getElementById('moon-elipse')
function handleThemeToggle() {
    console.log(deviceSizeSettings[deviceSize])
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
