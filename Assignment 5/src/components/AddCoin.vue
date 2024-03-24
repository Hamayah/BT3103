<template>
    <!-- Add Coins -->
    <div class="info-container-form">
        <form id="userForm">
            <h2>Add Coins</h2>

            <!-- labels are useful for the user to identify -->
            <div class="input-group">
                <label for="coinName">Coin Name:</label>
                <input type="text" id="coinName" required placeholder="Enter Coin" /><br /><br />
            </div>

            <div class="input-group">
                <label for="tickerName">Ticker:</label>
                <input type="text" id="tickerName" required placeholder="Valid Ticker" /><br /><br />
            </div>

            <div class="input-group">
                <label for="buyPrice">Buy Price:</label>
                <input type="number" id="buyPrice" required placeholder="Buy Price" /><br /><br />
            </div>

            <div class="input-group">
                <label for="buyQuantity">Buy Quantity:</label>
                <input type="number" id="buyQuantity" required placeholder="Quantity" /><br /><br />
            </div>

            <button id="savebutton" type="button" v-on:click="saveCoinInfo">
                Save
            </button>
            <span id="errorMessage">Please fill in all fields</span>
        </form>
    </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);


export default {
    methods: {
        async saveCoinInfo() {
            console.log("In Add Coin function");

            let coinName = document.getElementById("coinName").value;
            let tickerName = document.getElementById("tickerName").value;
            let buyPrice = document.getElementById("buyPrice").value;
            let buyQuantity = document.getElementById("buyQuantity").value;
            console.log(coinName, tickerName, buyPrice, buyQuantity);

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
            
            try {
                console.log("In try block");
                const docRef = await setDoc(doc(db, "Portfolio", coinName), {
                    Coin: coinName,
                    Ticker: tickerName,
                    BuyPrice: buyPrice,
                    BuyQuantity: buyQuantity,
                });
                console.log(docRef)
                document.getElementById('userForm').reset();
                this.$emit("addedCoin");
            }
            catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    }
}
</script>

<style scoped>
.subheader-container {
    color: #2c305c;
    text-align: center;
    font-size: 1.3em;
    letter-spacing: 0.05em;
}

.info-container-form {
    margin: 0 auto;
    width: 30%;
    overflow: hidden;
    background-color: #e9edf0;
    color: #2c305c;
    padding-bottom: 1%;
    border-radius: 15px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.info-container-form #userForm h2 {
    background-color: #2c305c;
    color: white;
    width: 100%;
    text-align: center;
    margin: 0;
    padding-top: 1vh;
    padding-bottom: 1vh;
    margin-bottom: 1vh;
    letter-spacing: 0.05em;
}

#userForm {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input-group {
    display: flex;
    align-items: center;
}

input {
    border: none;
    padding: 0.3vw;
    border-radius: 5px;
    margin-left: 0.5vw;
}

label {
    width: 150px;
    margin-right: 10px;
    text-align: right;
}

#savebutton {
    border-radius: 30px;
    border: none;
    background-color: blueviolet;
    color: #e9edf0;
    font-size: large;
    padding: 8px 15px;
    transition: 0.3s;
    margin-top: 1vh;
}

#savebutton:hover {
    background-color: green;
}

#errorMessage {
    color: red;
    display: none;
    margin-top: 1vh;
    font-size: 0.8em;
}
</style>