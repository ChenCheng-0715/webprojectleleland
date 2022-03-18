let buttonUp = document.querySelector("#btn-up");

window.onscroll = function() { scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        buttonUp.style.display = "block";
    } else {
        buttonUp.style.display = "none";
    }
}

function topFunction() {
    document.documentElement.scrollTop = 0;
}

// Count the number of character in the service name
let formCharNum = document.querySelector("#serviceCharNum");
let newItemNameInput = document.querySelector("#newItemNameInput");

newItemNameInput.onkeyup = function() {
    // Max character 200 subtract numbers of keypress enter in service name.
    serviceCharNum.innerHTML = 200 - newItemNameInput.value.length;
};

// Count the number of character in the description
let descriptionCharNum = document.querySelector("#descriptionCharNum");
let newItemDescription = document.querySelector("#newItemDescription");

newItemDescription.onkeyup = function() {
    // Max character 200 subtract numbers of keypress enter in description
    descriptionCharNum.innerHTML = 2000 - newItemDescription.value.length;
};