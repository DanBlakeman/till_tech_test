var priceList = [
  {
    "shopName": "The Coffee Connection",
    "address": "123 Lakeside Way",
    "phone": "16503600708",
    "prices": [
      {
        "Cafe Latte": 4.75,
        "Flat White": 4.75,
        "Cappucino": 3.85,
        "Single Espresso": 2.05,
        "Double Espresso": 3.75,
        "Americano": 3.75,
        "Cortado": 4.55,
        "Tea": 3.65,
        "Choc Mudcake": 6.40,
        "Choc Mousse": 8.20,
        "Affogato": 14.80,
        "Tiramisu": 11.40,
        "Blueberry Muffin": 4.05,
        "Chocolate Chip Muffin": 4.05,
        "Muffin Of The Day": 4.55
      }
    ]
  }
];


var Till = function () {
  this._priceList = priceList;
  this._taxRate = 8.64;
  this._currentOrder = {};
  this._applyMuffinDiscount = false;
  this._applyOver50Discount = false;
};

Till.prototype.add = function (item) {
  if (this._currentOrder[item]) { this._currentOrder[item] += 1;
    } else {
    this._currentOrder[item] = 1;
  }
};

Till.prototype.getTotal = function () {
  var total = this._sumCurrentOrder() - this._applyAnyDiscounts();
  return total.toFixed(2);
};

Till.prototype.pay = function (amount) {
  return (amount - this.getTotal()).toFixed(2);
};

Till.prototype.muffinDiscount = function () {
  this._applyMuffinDiscount = true;
};

Till.prototype.over50Discount = function () {
  this._applyOver50Discount = true;
};

Till.prototype._applyAnyDiscounts = function () {
  var totalDiscount = 0;
  if (this._applyMuffinDiscount) {
    totalDiscount += this._calculateMuffinDiscount();
  }
  if (this.over50Discount) {
    totalDiscount += this._calculateOver50Discount();
  }
  return totalDiscount;
};

Till.prototype._sumCurrentOrder = function () {
  var key;
  var total = 0;
  for (key in this._currentOrder) {
    total += this._priceList[0].prices[0][key] * this._currentOrder[key];
  }
  return total;
};

Till.prototype._calculateMuffinDiscount = function () {
  var itemTotal;
  var key;
  var totalDiscount = 0;

  for (key in this._currentOrder) {
    if (key.includes("Muffin")) {
      itemTotal = this._priceList[0].prices[0][key] * this._currentOrder[key];
      totalDiscount += (itemTotal / 100) * 10;
    }
  }
  return totalDiscount;
};

Till.prototype._calculateOver50Discount = function () {
  var total = this._sumCurrentOrder();
  if (total > 50) {
    return (total / 100) * 5;
  }
  return 0;
};

Till.prototype._getTax = function () {
  var tax = (this.getTotal() / 100) * this._taxRate;
  return tax.toFixed(2);
};

Till.prototype._getLineTotals = function () {
  var key;
  var returnString = "";
  for (key in this._currentOrder) {
    returnString += key + " " + this._currentOrder[key] + " x " + this._priceList[0].prices[0][key].toFixed(2) + "\n";
  }
  return returnString;
};