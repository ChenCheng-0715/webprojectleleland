/* 
1) Store the inputs into an Array of Object 
2) Setup the min and max date selection limit for Appointment Date
*/
const bookingReservationList = [];
const hourList = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];

function serviceReservation() {

    const serviceName = document.querySelector('#itemName').innerText;
    const petType = document.querySelector('#petType').value;
    const apptDate = document.querySelector('#apptDate').value;
    const apptTime = document.querySelector('#apptTime').value;
    const email = document.querySelector('#emailInput').value;

    const form = document.querySelector('.serviceDetail');

    if(validateEmail(email)) {

        const bookingDetails = {
                serviceName: serviceName,
                petType: petType,
                apptDate: apptDate,
                apptTime: apptTime,
                email: email
            }

            bookingReservationList.push(bookingDetails);
            console.log(bookingReservationList);

            alert("Thank you for your submission");

            form.reset();

    }
    
}

function setDate() {

    //set min date to tomorrow, max date to 1 month later from tomorrow

    const currDate = new Date();

    //Set Min
    const minYear = currDate.getFullYear();
    let minMonth = currDate.getMonth() + 1;
    let minDay = currDate.getDate() + 1;
    

    //Set Max
    const maxDate = new Date(currDate.getFullYear(), currDate.getMonth() + 1, currDate.getDate() + 1);

    const maxYear = maxDate.getFullYear();
    let maxMonth = maxDate.getMonth() + 1;
    let maxDay = maxDate.getDate();
    

    //Function to setDateFormat
    const setDateFormat = (dateInput) => {
        if(dateInput <= 9){
            dateInput = "0" + dateInput;
        }
        return dateInput;
    }

    //call the setDateFormat function
    minMonth = setDateFormat(minMonth);
    minDay = setDateFormat(minDay);
    maxMonth = setDateFormat(maxMonth);
    maxDay = setDateFormat(maxDay);

    //Set Date variables to format YYYY-MM-DD (e.g. 2022-02-09)
    const todayDate = `${minYear}-${minMonth}-${minDay}`;
    const futureDate = `${maxYear}-${maxMonth}-${maxDay}`;

    //console.log(todayDate);
    //console.log(futureDate);
    
    //SetAttribute on booking form
    document.querySelector('#apptDate').setAttribute("min", todayDate);
    document.querySelector('#apptDate').setAttribute("max", futureDate);

}

setDate();

function displayHour() {

    let hourOption = `<option value="">Select Time</option>`;
    hourList.forEach(item => {

        hourOption += 
        `
        <option value="${item}">${item}</option>
        `;
    });

    document.querySelector('#apptTime').innerHTML = hourOption;
}

displayHour();

function validateEmail(input) {

    const validFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(input.match(validFormat)) {
        return true;
    }
    else {
        alert("Invalid email address!");
        return false;
    }
}