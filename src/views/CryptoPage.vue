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

     <div class="box-content h-42 w-42 p-4 border-4 ...">
      <h1> Rank in Market Cap: {{ coins.market_cap_rank || 'Loading...' }} </h1>
      <h2> Crypto: {{ coins.name || 'Loading...'  }}</h2>
      <p> Symbol: {{ coins.symbol || 'Loading...'  }}  </p>
      <p> Current Price: {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format( coins.market_data?.current_price?.usd || 'Loading...') }}  </p>
      <p> Price change % (past 24 hours): {{ coins.market_data?.market_cap_change_percentage_24h + "%" || 'Loading...' }}  </p>
      <p v-if="coins.hashing_algorithm"> Hashing Algorithm: {{  coins.hashing_algorithm || 'Loading...' }} </p>
      <h1> {{  coins.description?.en || 'No description' }} </h1>

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



