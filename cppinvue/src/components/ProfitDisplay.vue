<template>
    <!-- Table  -->
    <div class="info-container-table">
        <h2>Current Portfolio</h2>
        <table id="table">
            <tr>
                <th>S. No</th>
                <th>Coin</th>
                <th>Ticker</th>
                <th>Buy Price</th>
                <th>Buy Quantity</th>
                <th>Current Price</th>
                <th>Profit</th>
                <th>Options</th>
            </tr>
        </table>
    </div>

    <!-- Profit -->
    <div class="subheader-container">
        <h2 id="totalProfit">Total Profit: <span id="profitText">$</span></h2>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import ccxt from 'ccxt';

const db = getFirestore(firebaseApp);

export default {
    mounted() {
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

        async function deleteCoinInfo(coinName) {
            alert("You are going to delete " + coinName + " from your portfolio.")
            await deleteDoc(doc(db, "Portfolio", coinName));
            console.log("Document successfully deleted!", coin);

            let tb = document.getElementById("table");

            // Don't delete the header row
            while (tb.rows.length > 1) {
                tb.deleteRow(1);
            }

            document.getElementById("profitText").innerHTML = "";
            displayCoinInfo();
        }
    }
}
</script>

<style scoped>
/*---------------------- Current Portfolio ----------------------*/
.info-container-table {
    margin: 0 auto;
    width: 60%;
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #e9edf0;
    margin-top: 3vh;
}

.info-container-table h2 {
    text-align: center;
    background-color: #2c305d;
    color: white;
    margin: 0;
    padding-top: 1vh;
    padding-bottom: 1vh;
    letter-spacing: 0.05em;
}

.info-container-table #table {
    background-color: #e9edf0;
    color: #1c1c1e;
    width: 100%;
    text-align: center;
    border-collapse: collapse;
}

th {
    color: #2c305d;
    padding-top: 0.5vh;
    padding-bottom: 0.5vh;
}

tr:nth-child(even) {
    background-color: #babfce;
    color: #1c1c1e;
}

td {
    padding-top: 1.5vh;
    padding-bottom: 1.5vh;
}

.bwt {
    background-color: blueviolet;
    color: white;
    padding: 6px 18px;
    border-radius: 30px;
    cursor: pointer;
    background-clip: padding-box;
    transition: 0.3s;
}

.bwt:hover {
    background-color: red;
}
</style>