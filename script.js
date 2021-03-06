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

// Double everyone's money
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2}; // ... spreads data array into separate arguments
    });

    updateDOM();
}

// Sort people by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money); // b-a sorts in descending order. a-b would sort in ascending order. default .sort() with no arguments sorts by string value, not number value

    updateDOM();
}

// Filter only millionaires
function showMillionaires() {
    data = data.filter(user => user.money >= 1000000);
    // only keep user in list if user.money is GTE 1000000. otherwise, filter out

    updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0); // acc begins at 0

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}
    </strong></h3>`; // format HTML to be added
    main.appendChild(wealthElement); // add wealthElement to main div on page
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
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);