'use strict';

const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

function CookieStore(name, minCust, maxCust, avgSale) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSale = avgSale;
  this.custPerHour = [];
  this.cookiesPerHour = [];
}

CookieStore.prototype.calcCustPerHour = function() {
  for (let i = 0; i < hours.length; i++) {
    const customers = randomNum(this.minCust, this.maxCust);
    this.custPerHour.push(customers);
  }
};

CookieStore.prototype.calcCookiesPerHour = function() {
  for (let i = 0; i < hours.length; i++) {
    const cookiesSold = Math.floor(this.custPerHour[i] * this.avgSale);
    this.cookiesPerHour.push(cookiesSold);
  }
};

CookieStore.prototype.render = function() {
  this.calcCustPerHour();
  this.calcCookiesPerHour();

  // Get the table element
  const table = document.getElementById('myTable');

  // Create a table row
  const tr = document.createElement('tr');
  table.appendChild(tr);

  // Create and append the store name cell
  const tdName = document.createElement('td');
  tdName.textContent = this.name;
  tr.appendChild(tdName);

  // Create and append the cookies sold cells for each hour
  for (let i = 0; i < hours.length; i++) {
    const tdCookies = document.createElement('td');
    tdCookies.textContent = this.cookiesPerHour[i];
    tr.appendChild(tdCookies);
  }

  // Create and append the total cell
  const tdTotal = document.createElement('td');
  const total = this.cookiesPerHour.reduce((acc, cur) => acc + cur, 0);
  tdTotal.textContent = total;
  tr.appendChild(tdTotal);
};

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const seattle = new CookieStore('Seattle', 23, 65, 6.3);
const tokyo = new CookieStore('Tokyo', 3, 24, 1.2);
const dubai = new CookieStore('Dubai', 11, 38, 3.7);
const paris = new CookieStore('Paris', 20, 38, 2.3);
const lima = new CookieStore('Lima', 2, 16, 4.6);

const stores = [seattle, tokyo, dubai, paris, lima];

for (let i = 0; i < stores.length; i++) {
  stores[i].render();
}

const form = document.getElementById('new-store-form');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Retrieve form input values
  const name = document.getElementById('name-input').value;
  const minCust = parseInt(document.getElementById('min-cust-input').value);
  const maxCust = parseInt(document.getElementById('max-cust-input').value);
  const avgSale = parseFloat(document.getElementById('avg-cookies-input').value);
  
  // Create a new CookieStore instance with the submitted data
  const newStore = new CookieStore(name, minCust, maxCust, avgSale);
  
  // Render the new store row in the table
  newStore.render();
  
  // Reset the form inputs
  form.reset();
});
