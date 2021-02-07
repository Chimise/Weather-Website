const form = document.querySelector('#my-form');
const inputAddress = document.querySelector('#address-input');
const error = document.querySelector('#error');
const address = document.querySelector('#address');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = inputAddress.value;
    error.innerHTML = 'Loading...';
    address.innerHTML = '';

    fetch('/weather?address=' + inputValue).then(response => response.json()).then((data) => {

        error.innerHTML = '';
        address.innerHTML = '';

        if (data.error) {

            error.innerHTML = data.error;
        } else {;

            address.innerHTML = `<ul class="list-group py-3">
                <li class="list-group-item">Location: ${data.location}</li>
                <li class="list-group-item">Forecast: ${data.forecast}</li>

                </ul>`
        }

        if (data.location) {
            inputAddress.value = '';
            error.innerHTML = '';
        }



    }).catch(error => console.log(error));


})