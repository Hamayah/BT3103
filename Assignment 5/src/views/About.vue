<template>
    <NavBar />
    <h3 id="about">This is an About Page</h3>
    <h2 id="header">Welcome to CPP</h2>
    <p id="desc">CPP Description: Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Suscipit eum
        natus illo ipsam eveniet in ullam, quisquam
        recusandae tenetur voluptates earum iusto non
        nulla porro? Perferendis quos dignissimos
        recusandae veritatis?</p>
    <Logout />
</template>

<script>
import firebase from '@/firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NavBar from '@/components/NavBar.vue';
import Logout from '@/components/Logout.vue';

export default {
    name: "About",

    data() {
        return {
            user: false,
            useremail: ''
        }
    },

    components: {
        NavBar,
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
#about {
    color: #2c305d;
    font-size: 1.5em;
    margin-top: 1em;
}

#header {
    color: #2c305d;
    font-size: 2em;
    margin-top: 1em;
}

#desc {
    color: #2c305d;
    font-size: 1em;
    padding: 0 20%;
}
</style>