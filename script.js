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
    // fetch is asynchronous, need to wait for response (resp)

    const data = await resp.json();

    console.log(data);
}