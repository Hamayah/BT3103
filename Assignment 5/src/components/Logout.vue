<template>
    <button id="btn" @click="signOut()" v-if="user">Logout</button>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default {
    name: 'Logout',

    data() {
        return {
            user: false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        });
    },

    methods: {
        signOut() {
            const auth = getAuth();
            const user = auth.currenqtUser;
            signOut(auth, user) /* firebaseAuth signout method */
            this.$router.push({name: 'Login'});
        }
    }
}
</script>

<style scoped>
#btn {
    font-family: 'Poppins', sans-serif;
    background-color: #2c305d;
    color: white;
    padding: 8px 20px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

#btn:hover {
    background-color: red;
}
</style>