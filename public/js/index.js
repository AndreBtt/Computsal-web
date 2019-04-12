$(document).ready(function() {
    changeImages()
});

function changeImages() {
    let imgs = ["/img/photos/3.jpg", "/img/photos/1.jpg", "/img/photos/2.jpg", 
    "/img/photos/4.jpg", "/img/photos/5.jpg",
    "/img/photos/6.jpg", "/img/photos/7.jpg", "/img/photos/8.jpg",
    "/img/photos/9.jpg", "/img/photos/10.jpg"]

    let cont = 1;

    function changeBg() {
        if (cont == imgs.length) cont = 0;
        let imgUrl = imgs[cont++];
        $('.parallax').css("background-image", "url(" + imgUrl + ")" );
        $('.parallax').fadeIn(1000); //this is new, will fade in smoothly
    }

    function changeBackgroundSmoothly() {
        $('.parallax').fadeOut(1000, changeBg); //this is new, will fade out smoothly
    }
    
    setInterval(changeBackgroundSmoothly,5000);
}