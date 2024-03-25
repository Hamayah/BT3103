<template>
    <div style="text-align:center;" v-if="user">
        <NavBar />
        <div>
            <h3><strong>This is the profile page</strong></h3>
        </div>
        <div v-if="user">
            <div>
                <p>
                    Name: <strong>{{ user.displayName }}</strong><br>
                    Email: <strong>{{ user.email }}</strong><br>
                    UID: <strong>{{ user.uid }}</strong><br>
                    Provider: <strong>{{ user.providerData[0].providerId }}</strong>
                </p>
            </div>
        </div>
        <Logout />
        <br>
    </div>
</template>

<script>
import firebase from '@/firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NavBar from '@/components/NavBar.vue';
import Logout from '@/components/Logout.vue';

export default {
    name: 'Profile',

    components: {
        NavBar,
        Logout,
    },

    data() {
        return {
            user: false,
            useremail: ''
        }
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
h3 {
    color: #2c305d;
    font-size: 1.5em;
    margin-top: 1em;
}
</style>