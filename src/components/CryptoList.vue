<template>
    <div class="relative inline-block">
      <button
        class="px-4 py-2 rounded-md bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        @click="isOpen = !isOpen"
      >
        Currency
      </button>
      <ul v-if="isOpen" class="absolute z-10 bg-white rounded-md shadow-md">
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">BRL</a>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">USD</a>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
    let isOpen = false;
  </script>