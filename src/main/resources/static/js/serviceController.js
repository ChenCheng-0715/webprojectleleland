const createHTMLList = (index, name, price, imageUrl) =>
`
    <div class="col-md-4">
        <a id="${index}" href="#" data-bs-toggle="modal" data-bs-target="#serviceModal">
            <div class="card mb-5">
                <img class="img-fluid" src=${imageUrl} alt="">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">from $${price}</p>
                </div>
            </div>
        </a>
    </div>

`;


function displayServiceDetails(item){

    document.getElementById('itemName').innerText = item.name;
    document.getElementById('itemDescription').innerText = item.description;
    document.getElementById('itemImage').src = item.imageUrl;
    document.getElementById('itemPrice').innerText = "from $" + item.price;

} //End of displayServiceDetails function


function displayUpdateDetails(item){

    document.getElementById('updateItemNameInput').value = item.name;
    document.getElementById('updateItemDescription').value = item.description;
    document.getElementById('updateServiceImg').src = item.imageUrl;
    document.getElementById('updateItemPrice').value = item.price;
    document.getElementById('updateServiceId').innerText = item.id;

} //End of displayUpdateDetails function

class Service {

    //properties
    //constructor
    constructor() {
        this.serviceItems = [];

    }

    //methods
    addService(name, description, imageUrl, price, imageObject) {


        let service = this;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('imageUrl', imageUrl);
        formData.append('price', price);
        formData.append('imageFile', imageObject);

        fetch('https://lelelandccversion.herokuapp.com/item/add', {
            method: 'POST',
            body: formData
            })
            .then(function(response) {
                console.log(response.status);
                if (response.ok) {
                    alert("Successfully Added Service!")}
                service.showService();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert("Error adding service!")
            });
    }

    updateService(id, name, description, imageUrl, price, imageObject) {

        let service = this;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        //console.log(imageObject);
        //if (imageObject != null) {
            formData.append('imageFile', imageObject);
        //}
        formData.append('price', price);
        formData.append('imageUrl', imageUrl);

            const updateUrl = "https://lelelandccversion.herokuapp.com/item/" + id;
            fetch(updateUrl, {
                method: 'PATCH',
                body: formData
                })
                .then(function(response) {
                    console.log(response.status);
                    if (response.ok) {
                        alert("Successfully Updated Service!");
                    }
                    service.showService();
                    //window.location.reload();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert("Error updating service!")
                });

    }

    displayService() {


        let service = this;
        service.serviceItems = [];


        fetch('https://lelelandccversion.herokuapp.com/item/all')
            .then((resp) => resp.json())
            .then(function(data) {
                console.log("2. receive data");
                console.log(data);
                data.forEach(function (item, index) {

                    const itemObj = {
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        imageUrl: item.imageUrl,
                        price: item.price
                    };

                    service.serviceItems.push(itemObj);
                });

                service.renderProductPage();

            })
            .catch(function(error) {
                console.log(error);
            });
    }


    renderProductPage() {
        let productHTMLList = [];

        for (let i = 0; i < this.serviceItems.length; i++) {
            const item = this.serviceItems[i];

            const productHTML = createHTMLList(i, item.name, item.price, item.imageUrl);

            productHTMLList.push(productHTML);
        }

        const pHTML = productHTMLList.join('\n');
        document.querySelector('#serviceRow').innerHTML = pHTML;

        for (let i = 0; i < this.serviceItems.length; i++) {
            const item = this.serviceItems[i];
            document.getElementById(i).addEventListener("click", function() {
                displayServiceDetails(item);});
        }

    }


    // use at upload page service management
    showService() {
        let service = this;
        service.serviceItems = [];

        fetch('https://lelelandccversion.herokuapp.com/item/all')
            .then((resp) => resp.json())
            .then(function(data) {
                console.log("2. receive data");
                console.log(data);
                data.forEach(function (item, index) {

                    const itemObj = {
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        imageUrl: item.imageUrl,
                        price: item.price
                    };

                    service.serviceItems.push(itemObj);
                });

                service.showTable();

            })
            .catch(function(error) {
                console.log(error);
            });

    }

    // use at upload page service management, to loop data received from db and display in table
    showTable() {
        let tableHTMLList = [];
        let index = 0;
        let deleteBtnId = "";
        let updateBtnId = "";

        for (let i = 0; i < this.serviceItems.length; i++) {
            const item = this.serviceItems[i];
            deleteBtnId = "delete" + index;
            updateBtnId = "update" + index;

            const tableHTML = `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td><img src="${item.imageUrl}" class="img-fluid" width="300px"></td>
                    <td>${item.price}</td>
                    <td><button id="${deleteBtnId}" type="button" class="btn btn-danger">Delete</button></td>
                    <td><button id="${updateBtnId}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal">Update</button></td>
                </tr>
            `;


            tableHTMLList.push(tableHTML);
            index++;
        }

        document.querySelector("#tbody").innerHTML = tableHTMLList.join('\n');


        index = 0;
        for (let i = 0; i < this.serviceItems.length; i++) {
            const item = this.serviceItems[i];

            console.log(item.id);

            deleteBtnId = "delete" + index;
            updateBtnId = "update" + index;
            document.querySelector(`#${deleteBtnId}`).
                    addEventListener("click", function(){deleteService(item.id);});
            document.querySelector(`#${updateBtnId}`).
                                addEventListener("click", function(){
                                displayUpdateDetails(item);
                                //updateService(item);
                                });
            index++;
        }
    }



} //End of Service Class


function deleteService(id) {

    let deleteUrl = "https://lelelandccversion.herokuapp.com/item/" + id;
    fetch(deleteUrl, {
        method: 'DELETE',
        })
        .then(function(response) {
            console.log(response.status);
            if (response.ok) {
                alert("Successful Delete");
            }
            service.showService();
            //window.location.reload();
        })
        .catch((error) => {
            console.log('Error:', error);
            alert("Error delete");
        });
}