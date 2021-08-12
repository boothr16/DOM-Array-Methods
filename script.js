const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
// async/await replaces .then(res => res.json()).then(data => )
async function getRandomUser() {
    const resp = await fetch('https://randomuser.me/api'); 
    // fetch is asynchronous, need to wait for fetch to execute to get response as a promise

    const data = await resp.json(); // resp is a promise in JSON format

    const user = data.results[0]; // data is a Javascript object

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

// Add new object to data array
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
    // Clear main DIV
    main.innerHTML = '<h2><strong>Person </strong>Wealth</h2>'; // default HTML with no users

    // for each item in array "data"
    providedData.forEach(item => {
        const element = document.createElement('div'); // create new div element
        element.classList.add('person'); // add .person as a class to the new div
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`; // edit HTML
        main.appendChild(element); // append the new div as a child of the main tag
    });
}

// Format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // regex

}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser); // call getRandomUser when btn is clicked