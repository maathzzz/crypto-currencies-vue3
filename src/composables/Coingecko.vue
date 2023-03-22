<script setup>
import { ref, watch, reactive, onMounted, computed } from 'vue';

const state = reactive({
  coins: []
});

async function fetchData() {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false');
  const data = await response.json();
  state.coins = data;
}

onMounted(fetchData);

const quizes = ref(state.coins)
const search = ref("");

// define `coins` as a computed property
const coins = computed(() => state.coins)
</script>

<template>
  <div class="container mx-auto pt-18 pb-48 px-2">
    
    <section class="relative isolate overflow-hidden bg-white py-24 px-6 sm:py-32 lg:px-8">
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
    <div class="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
    <div class="mx-auto max-w-2xl lg:max-w-4xl">
      <img class="mx-auto h-12" src="https://zuviapay.com.br/img/logo.png" alt="" />
      <figure class="mt-10">
        <blockquote class="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
          <p>Top 50 Crypto in Market Value.</p>
        </blockquote>
        <figcaption class="mt-10">
          <!-- <img class="mx-auto h-10 w-10 rounded-full" src="../assets/img/daniels.jpg" alt="" /> -->
          <div class="mt-4 flex items-center justify-center space-x-3 text-base">
            <div class="font-semibold text-gray-900">Powered by</div>
            <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" class="fill-gray-900">
              <circle cx="1" cy="1" r="1" />
            </svg>
            <div class="text-gray-600">Zuvia Technology</div>
          </div>
        </figcaption>
      </figure>
    </div>
  </section>

    <!-- search -->
    <div class="flex justify-end pb-2 ">
      <div class="flex">

        <div class="dropdown">
            <button class="visible btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Cotation
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">USD</a>
              <a class="dropdown-item" href="#">BRL</a>
            </div>
        </div>

        <input
          type="text"
          placeholder="Search Crypto..."
          class="ml-2 border border-gray-500 rounded p-2 focus:outline-none focus:ring focus:ring-gray-300"
          v-model="search"
        />
        <fa
          icon="search"
          class="text-gray-500 absolute right-2 top-2/4 transform -translate-y-1/2"
        />
      </div>
    </div>
    <!-- table -->
    <table class="table-fixed cursor-pointer">
      <!-- head -->
      <thead class="bg-gray-200">
        <tr class="text-left text-gray-600 text-sm" >
          <th class="w-1/4 p-4">Crypto Name</th>
          <th class="w-1/4">Current Price</th>
          <th class="w-1/4">1h%</th>
          <th class="w-1/4 hidden sm:table-cell">Market Cap</th>
          <th class="w-1/4 hidden sm:table-cell">Volume</th>
        </tr>
      </thead>
      <!-- body -->
      <tbody class="divide-y">
        <!-- 1 -->
        <tr class="text-sm hover:bg-blue-300 transition duration-300"  v-for="coin in coins" :key="coin.id">
          <td class="p-4 flex items-center">
            <p class="mr-2">{{ coin.market_cap_rank }}</p>
            <img
              :src=coin.image
              alt="coin logo"
              class="w-6 h-6 rounded-full mr-1"
            />
            <p class="font-bold mr-1">{{ coin.name }}</p>
            <p class="uppercase text-gray-500 hidden sm:table-cell">
              {{ coin.symbol }}
            </p>
          </td>
          <td class="font-bold">
            {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(coin.current_price) }}
          </td>
          <td class="font-bold">
            <div class="text-green-500">
              <fa icon="caret-up" class="mr-1" />
              {{ coin.price_change_percentage_24h }}%
            </div>
          </td>
          <td class="hidden sm:table-cell">
            {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(coin.market_cap) }}
          </td>
          <td class="pr-4 hidden sm:table-cell">
            {{ coin.total_volume }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
