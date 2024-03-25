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
            <tr v-for="(row, index) in tableRows" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ row.Coin }}</td>
                <td>{{ row.Ticker }}</td>
                <td>{{ row.BuyPrice }}</td>
                <td>{{ row.BuyQuantity }}</td>
                <td>{{ row.currentPrice }}</td>
                <td :class="{ 'profit-positive': row.profit >= 0, 'profit-negative': row.profit < 0 }">{{ row.profit }}
                </td>
                <td><button @click="deleteCoinInfo(row.Coin, this.useremail)" class="bwt">Delete</button></td>
            </tr>
        </table>
    </div>

    <!-- Profit -->
    <div class="subheader-container">
        <h2>Total Profit: <span :class="{ 'profit-positive': totalProfit >= 0, 'profit-negative': totalProfit < 0 }">$
                {{ totalProfit.toFixed(2) }}</span></h2>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import ccxt from 'ccxt';

const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            useremail: '',
            tableRows: [],
            totalProfit: 0,
        };
    },

    async mounted() {
        const auth = getAuth();
        this.useremail = auth.currentUser ? auth.currentUser.email : 'default_user';
        await this.displayCoinInfo(this.useremail);
    },

    methods: {
        async displayCoinInfo(useremail) {
            const allDocuments = await getDocs(collection(db, useremail));
            let index = 1;
            let localTotalProfit = 0;

            this.tableRows = [];

            for (const doc of allDocuments.docs) {
                let documentData = doc.data();
                let currentPrice = 0;
                let profit = 0;

                try {
                    let binance = new ccxt.binance();
                    let tickerData = await binance.fetchTicker(documentData.Ticker);
                    currentPrice = tickerData.last;
                    profit = (currentPrice - documentData.BuyPrice) * documentData.BuyQuantity;
                    localTotalProfit += profit;
                } catch (error) {
                    console.error("Error fetching ticker data: ", error);
                }

                this.tableRows.push({
                    ...documentData,
                    currentPrice: currentPrice.toFixed(2),
                    profit: profit.toFixed(2)
                });

                console.log("Displaying Data for: ", documentData.Ticker)

                index++;
            }

            this.totalProfit = localTotalProfit;
        },

        async deleteCoinInfo(coinName, useremail) {
            if (confirm("Are you sure you want to delete " + coinName + " from your portfolio?")) {
                await deleteDoc(doc(db, useremail, coinName));
                this.displayCoinInfo(useremail);
            }
        }
    }
}
</script>

<style scoped>
/*---------------------- Current Portfolio ----------------------*/
.subheader-container {
    color: #2c305c;
    text-align: center;
    font-size: 1.3em;
    letter-spacing: 0.05em;
}

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
    border: none;
    border-radius: 30px;
    cursor: pointer;
    background-clip: padding-box;
    transition: 0.3s;
}

.bwt:hover {
    background-color: red;
}

.profit-positive {
    color: green;
}

.profit-negative {
    color: red;
}
</style>