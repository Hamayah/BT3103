<template>
    <h3 id="profit">This is Profit Page</h3>
    <ProfitDisplay />
</template>

<script>
import ProfitDisplay from '@/components/ProfitDisplay.vue';

export default {
    name: 'OnlyProfit',
    components: {
        ProfitDisplay
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