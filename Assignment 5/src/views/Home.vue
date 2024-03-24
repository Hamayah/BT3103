<template>
  <NavBar />
  <h3 id="home">This is Home Page</h3>
  <WelcomeCpp />
  <AddCoin @addedCoin="change" />
  <ProfitDisplay :key="refreshComp" />
  <Logout />
</template>

<script>
import firebase from '@/firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NavBar from '@/components/NavBar.vue';
import WelcomeCpp from '@/components/WelcomeCpp.vue';
import AddCoin from '@/components/AddCoin.vue';
import ProfitDisplay from '@/components/ProfitDisplay.vue';
import Logout from '@/components/Logout.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    WelcomeCpp,
    AddCoin,
    ProfitDisplay,
    Logout
  },

  data() {
    return {
      refreshComp: 0,
      user: false,
      useremail: ''
    }
  },

  methods: {
    change() {
      this.refreshComp += 1;
    }
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.change();
        this.useremail = auth.currentUser.email;
        this.user = user;
      }
    });
  }
}
</script>

<style>
#home {
  color: #2c305d;
  font-size: 1.5em;
  margin-top: 1em;
}
</style>