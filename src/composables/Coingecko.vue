<script setup>
import { ref, watch, reactive, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import CryptoPage from "../views/CryptoPage.vue";
import Headline from "../components/Headline.vue";
const state = reactive({
  coins: [],
  pageId: 1
});
async function fetchData() {
  // const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false');
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${state.pageId}&sparkline=false`);
  const data = await response.json();
  state.coins = data;
}
onMounted(fetchData);
// define `coins` as a computed property
const coins = computed(() => state.coins)
// const coins = computed(() => state.coins.filter(coin => coin.name));

const previousPage = () => {
  if (state.pageId <= 1) {
    fetchData()
  } else {
    state.pageId--
    fetchData()
  }
}

const nextPage = () => {
  if (state.pageId >= 5) {
    fetchData()
  } else {
    state.pageId++
    fetchData()
  }
}

</script>

<template>
  <div class="container mx-auto pt-18 pb-48 px-2">

    <Headline />
    
    <!-- Search -->
    <div class="flex justify-end pb-2 ">
      <div class="flex">
        <div class="dropdown btn-info">
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
          class="ml-2 border border-gray-500 rounded p-2 focus:outline-none "
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
        <tr class="text-sm hover:bg-blue-300 transition duration-300" 
          v-for="coin in coins" 
          :key="coin.id" 
          :coin="coin"
          >
          <RouterLink :to="`/crypto/${coin.id}/`" class="p-4 flex items-center">
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
          </RouterLink>
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

    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div class="flex flex-1 justify-between sm:hidden">
        <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
        <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing page
            <span class="font-medium">{{ state.pageId }}</span>
            of
            <span class="font-medium">5</span>
            results
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button href="#" @click="previousPage" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span class="sr-only">Previous</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
              </svg>
            </button>
            <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
            <!-- botoes aqui  -->
            <button href="#" @click="nextPage" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span class="sr-only">Next</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>

  <footer
  class="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
  <div class="p-4 text-center text-neutral-700 dark:text-neutral-200">
    Zuvia
    <a
      class="text-neutral-800 dark:text-neutral-400"
      href="https://tailwind-elements.com/"
      >Crypto Currencies App</a
    >
  </div>
</footer>
</template>
