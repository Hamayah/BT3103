<template>
  <h3 id="home">This is Home Page</h3>
  <WelcomeCpp />
  <AddCoin @addedCoin="change" />
  <ProfitDisplay :key="refreshComp" />
</template>
  
<script>
import WelcomeCpp from '@/components/WelcomeCpp.vue';
import AddCoin from '@/components/AddCoin.vue';
import ProfitDisplay from '@/components/ProfitDisplay.vue';

export default {
  name: 'App',
  components: {
    WelcomeCpp,
    AddCoin,
    ProfitDisplay
  },

  data() {
    return {
      refreshComp: 0
    }
  },

  methods: {
    change() {
      this.refreshComp += 1;
    }
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