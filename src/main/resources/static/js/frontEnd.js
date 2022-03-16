let buttonUp = document.querySelector("#btn-up");

window.onscroll = function() { scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        buttonUp.style.display = "block";
    } else {
        buttonUp.style.display = "none";
    }
}

function topFunction() {
    document.documentElement.scrollTop = 0;
}
