const service = new Service();
let storeImage = "";  //actual image file
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
});


function loadTable() {

    service.showService();
}

loadTable();
