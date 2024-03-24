<template>
    <div v-if="user">
        <NavBar />
        <h3>Page not found!</h3>
        <h4>Please click on the available options above</h4>
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
    name: 'NotFound',

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