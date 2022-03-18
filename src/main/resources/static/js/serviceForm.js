const service = new Service();
let storeImage = "";  //actual image file
let storeImage1 = "";
const max_size = 1*1024*1024;  // 1MB


const input = document.querySelector('#newItemImageFile');
input.addEventListener('change', () => {
    storeImage = input.files[0];
        console.log(storeImage);

    if (storeImage != null) {
        if (storeImage.size > max_size) {
            document.querySelector('#newItemImageFile').setCustomValidity("File must not exceed 1MB!");
            document.querySelector('#newItemImageFile').reportValidity();
        } else {
            document.querySelector('#newItemImageFile').setCustomValidity("");
            document.querySelector('#newItemImageFile').reportValidity();
        }
    }
});


newItemForm.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log(storeImage);


    const newItemNameInput = document.querySelector('#newItemNameInput');
    const newItemDescription = document.querySelector('#newItemDescription');
    const newItemImageUrl = document.querySelector('#newItemImageFile');
    const newItemPrice = document.querySelector('#newItemPrice');

//    // Validation
//    if (storeImage.size > max_size) {
//        //alert("Please upload image less than 1MB")
//        newItemImageUrl.setCustomValidity("File must not exceed 1MB!");
//        newItemImageUrl.reportValidity();
//        return false;
//    }
//



    const name = newItemNameInput.value;
    const description = newItemDescription.value;
    const imageUrl = newItemImageUrl.value.replace("C:\\fakepath\\", "");
    const price = newItemPrice.value;

    newItemNameInput.value = '';
    newItemDescription.value = '';
    newItemImageUrl.value = '';
    newItemPrice.value = '';

    service.addService(name, description, imageUrl, price, storeImage);

    // reset char count
    serviceCharNum.innerHTML = 200 - newItemNameInput.value.length;
    descriptionCharNum.innerHTML = 2000 - newItemDescription.value.length;

});

const input1 = document.querySelector('#updateItemImageFile');
    input1.addEventListener('change', () => {
        storeImage1 = input1.files[0];
            console.log(storeImage1);

        if (storeImage1 != null) {
            if (storeImage1.size > max_size) {
                document.querySelector('#updateItemImageFile').setCustomValidity("File must not exceed 1MB!");
                document.querySelector('#updateItemImageFile').reportValidity();
            } else {
                document.querySelector('#updateItemImageFile').setCustomValidity("");
                document.querySelector('#updateItemImageFile').reportValidity();
            }
        }
    });

updateItemForm.addEventListener('submit', (event) => {
    event.preventDefault();

    //console.log(storeImage);

    const updateItemNameInput = document.querySelector('#updateItemNameInput');
    const updateItemDescription = document.querySelector('#updateItemDescription');
    const updateItemPrice = document.querySelector('#updateItemPrice');
    const updateItemId = document.querySelector('#updateServiceId');
    let updateItemImageUrl;

    const name = updateItemNameInput.value;
    const description = updateItemDescription.value;
    const price = updateItemPrice.value;
    const id = updateItemId.innerText;

    if (input1.files[0] == null) {
        updateItemImageUrl = document.querySelector('#updateServiceImg').src;
        imageUrl = updateItemImageUrl.substring(updateItemImageUrl.lastIndexOf('/')+1);
    }
    else {
        updateItemImageUrl = document.querySelector('#updateItemImageFile');
        imageUrl = updateItemImageUrl.value.replace("C:\\fakepath\\", "");
    }

    console.log(imageUrl);

    updateItemNameInput.value = '';
    updateItemDescription.value = '';
    updateItemImageUrl.value = '';
    updateItemPrice.value = '';

    service.updateService(id, name, description, imageUrl, price, storeImage1);

});

function loadTable() {

    service.showService();
}

loadTable();

//Scroll to top function
let buttonUp = document.querySelector("#btn-up");

window.onscroll = function() { scrollFunction()};
//Set scroll top button appear when screen body greater than 600px
function scrollFunction() {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        buttonUp.style.display = "block";
    } else {
        buttonUp.style.display = "none";
    }
}
//Click button to scroll up to top
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