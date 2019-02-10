function htmlRem(){
    var width=document.documentElement.offsetWidth;
    var rem=width/10
    document.documentElement.style.fontSize=rem+"px"
}

htmlRem()

window.addEventListener('resize',htmlRem)
window.addEventListener('orientationchange',htmlRem)
