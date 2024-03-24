<template>
    <div id="logged" v-if="user">
        <div id="nav">
            <router-link to="/home"> Home </router-link> |
            <router-link to="/about"> About </router-link> |
            <router-link to="/profit"> Profit </router-link> |
            <router-link to="/profit2"> Profit 2</router-link> |
            <router-link to="/profile"> Profile </router-link>
        </div>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
export default {
    name: 'NavBar',

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
    }
}
</script>

<style scoped>
#nav {
    padding-top: 1vw;
}

#nav a {
    color: #2c305d;
    padding: 5px;
    text-decoration: none;
}

#nav a.router-link-exact-active {
    color: #2c305d;
    font-weight: bold;
}
</style>