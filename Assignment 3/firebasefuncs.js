const firebaseConfig = {
  apiKey: "AIzaSyBKvjrTOZLs8uGhzMPfSPo4cfE9QMlpBcw",
  authDomain: "democpp-8becc.firebaseapp.com",
  projectId: "democpp-8becc",
  storageBucket: "democpp-8becc.appspot.com",
  messagingSenderId: "963991744184",
  appId: "1:963991744184:web:5c460d1aebf678f025ce4d",
  measurementId: "G-4YRNWXJEMD",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

/* Saving coin information to firebase */
async function saveCoinInfo() {
  let coinName = document.getElementById("coinName").value.trim();
  let tickerName = document.getElementById("tickerName").value.trim();
  let buyPrice = document.getElementById("buyPrice").value.trim();
  let buyQuantity = document.getElementById("buyQuantity").value.trim();

  if (
    coinName === "" ||
    tickerName === "" ||
    buyPrice === "" ||
    buyQuantity === ""
  ) {
    console.log("All details are not filled")
    document.getElementById("errorMessage").style.display = "block";
    return;
  }

  alert("Saved data for Coin: " + coinName);

  await db.collection("Portfolio").doc(coinName).set({
    Coin: coinName,
    Ticker: tickerName,
    BuyPrice: buyPrice,
    BuyQuantity: buyQuantity,
  });

  console.log("Data written with ID: " + coinName);
  window.location.reload();
}

/* Deleting coin information from firebase */
async function deleteCoinInfo(coinName) {
  alert("You are going to delete the entry for " + coinName);

  await db.collection("Portfolio").doc(coinName).delete();
  console.log("Data deleted for: " + coinName);
  window.location.reload();
}

/* Display coin information */
async function displayCoinInfo() {
  let allDocuments = await db.collection("Portfolio").get();

  index = 1;
  let totalProfit = 0;
  allDocuments.forEach((docs) => {
    let documentData = docs.data();

    let coinName = documentData.Coin;
    let tickerName = documentData.Ticker;
    let buyPrice = documentData.BuyPrice;
    let buyQuantity = documentData.BuyQuantity;

    /* Row and cell creation */
    let table = document.getElementById("table");
    let row = table.insertRow(index);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    let cell7 = row.insertCell(6);
    let cell8 = row.insertCell(7);

    cell1.innerHTML = index;
    cell2.innerHTML = coinName;
    cell3.innerHTML = tickerName;
    cell4.innerHTML = buyPrice;
    cell5.innerHTML = buyQuantity;
    cell6.innerHTML = 0;
    cell7.innerHTML = 0;

    cell7.className = "Profits";

    /* Delete button creation properties*/
    let deleteButton = document.createElement("deleteButton");
    deleteButton.id = String(coinName);
    deleteButton.className = "bwt";
    deleteButton.innerHTML = "Delete";

    cell8.appendChild(deleteButton);
    deleteButton.onclick = function () {
      deleteCoinInfo(coinName);
    };

    /* Calculate profit from CCXT data */
    profitCalculator(tickerName);

    async function profitCalculator(ticker) {
      let binance = new ccxt.binance();
      let tickerData = await binance.fetchTicker(ticker);
      cell6.innerHTML = tickerData.last.toFixed(2);
      cell7.innerHTML = (
        (parseFloat(cell6.innerHTML) - parseFloat(buyPrice)) *
        buyQuantity
      ).toFixed(2);

      if (cell7.innerHTML < 0) {
        cell7.style.color = "red";
      } else {
        cell7.style.color = "green";
      }

      totalProfit += parseFloat(cell7.innerHTML);

      if (totalProfit < 0) {
        document.getElementById("profitText").style.color = "red";
        document.getElementById("profitText").innerHTML =
          "-$" + String(totalProfit.toFixed(2).slice(1));
      } else {
        document.getElementById("profitText").style.color = "green";
        document.getElementById("profitText").innerHTML =
          "$" + String(totalProfit.toFixed(2));
      }

      console.log("Ticker:", tickerName);
      console.log("Current Price:", cell6.innerHTML);
      console.log("Buy Price:", buyPrice);
      console.log("Buy Quantity:", buyQuantity);
      console.log("Profit:", cell7.innerHTML);
      console.log("\n\n");
    }

    index += 1;
  });
}

displayCoinInfo();
