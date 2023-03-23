<script setup>
  import { defineProps } from 'vue';
  import { useRoute } from "vue-router";
  import { ref, watch, reactive, onMounted, computed } from 'vue';
  import { RouterLink } from 'vue-router';
  import Coingecko from "../composables/Coingecko.vue";

  const route = useRoute();

  console.log(route.params)

  const coinId = route.params.id
   
   const state = reactive({
      coins: []
  });

  async function fetchData() {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    const data = await response.json();
    state.coins = data;
  }

onMounted(fetchData);

// define `coins` as a computed property
const coins = computed(() => state.coins)
// const coins = computed(() => state.coins.filter(coin => coin.name));
</script>
   
<template>
     <div>
       <h2> Crypto Name: {{ coins.name }}</h2>
       <p> Symbol: {{ coins.symbol }}  </p>
     </div>
</template>

<!-- <template>
  <div>
    <p>{{ coin.name }}</p>
    <p>{{ coin.current_price }}</p>
  </div>
</template>

<script setup>
  const props = defineProps({
    coin: Object,
  });
</script> -->



