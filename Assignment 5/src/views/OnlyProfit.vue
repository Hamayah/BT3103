<template>
    <NavBar />
    <h3 id="profit">This is Profit Page</h3>
    <ProfitDisplay />
    <Logout />
</template>

<script>
import firebase from '@/firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NavBar from '@/components/NavBar.vue';
import ProfitDisplay from '@/components/ProfitDisplay.vue';
import Logout from '@/components/Logout.vue';

export default {
    name: 'OnlyProfit',

    data() {
        return {
            user: false,
            useremail: ''
        }
    },

    components: {
        NavBar,
        ProfitDisplay,
        Logout
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.useremail = auth.currentUser.email;
                this.user = user;
            }
        });
    }
}
</script>

<style>
#profit {
    color: #2c305d;
    font-size: 1.5em;
    margin-top: 1em;
}
</style>