"use strict";

console.log("The cookie store is open!");

const container = document.getElementById("container");

const hours = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"];

const seattle = {
  storeName: "Seattle",
  minCustPerHour: 23,
  maxCustPerHour: 65,
  avgCookiesPerCust: 6.3,
  customersEachHour: [],
  cookiesSoldPerHour: [],
  totalDailyCookies: 0,

  calcCustomersEachHour: function() {
    for (let i = 0; i < hours.length; i++) {
      const randomCustomers = Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour;
      this.customersEachHour.push(randomCustomers);
    }
  },

  calcCookiesEachHour: function() {
    this.calcCustomersEachHour();

    for (let i = 0; i < hours.length; i++) {
      const cookiesSold = Math.round(this.customersEachHour[i] * this.avgCookiesPerCust);
      this.cookiesSoldPerHour.push(cookiesSold);
      this.totalDailyCookies += cookiesSold;
    }
  },

  render: function() {
    this.calcCookiesEachHour();

    const article = document.createElement("article");

    const h3 = document.createElement("h3");
    h3.textContent = this.storeName;
    article.appendChild(h3);

    const ul = document.createElement("ul");
    for (let i = 0; i < hours.length; i++) {
      const li = document.createElement("li");
      li.textContent = `${hours[i]}: ${this.cookiesSoldPerHour[i]} cookies`;
      ul.appendChild(li);
    }
    article.appendChild(ul);

    container.appendChild(article);
  },
};

seattle.customersEachHour = [];
seattle.cookiesSoldPerHour = [];
seattle.totalDailyCookies = 0;

seattle.render();
