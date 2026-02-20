<script setup>
import { useGameStore, rarityTiers } from './stores/gameStore'

const store = useGameStore()

const getRarityColor = (rarity) => {
  return rarityTiers[rarity]?.color || 'text-white'
}
</script>

<template>
  <div class="flex h-screen bg-gray-900 text-white font-sans">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 p-6 border-r border-gray-700 flex flex-col gap-8">
      <div>
        <h2 class="text-2xl font-bold mb-4 text-yellow-500">Inventory</h2>
        <div class="bg-gray-700 p-4 rounded-lg shadow-inner">
          <p class="text-sm uppercase tracking-wider text-gray-400">Coins</p>
          <p class="text-3xl font-mono text-yellow-400">{{ store.coins }}</p>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-semibold mb-4 text-blue-400">Stats</h2>
        <ul class="space-y-3">
          <li v-for="(value, stat) in store.characterStats" :key="stat" class="flex justify-between items-center bg-gray-750 p-2 rounded">
            <span class="text-gray-300">{{ stat }}</span>
            <span class="font-bold text-blue-300">{{ value }}</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-semibold mb-4 text-purple-400">Equipment</h2>
        <ul class="text-sm space-y-2">
          <li v-for="(item, slot) in store.equipment" :key="slot" class="flex flex-col border-b border-gray-700 pb-1">
            <span class="text-gray-500 text-xs">{{ slot }}</span>
            <span v-if="item" :class="getRarityColor(item.rarity)">
              [{{ item.rarity }}] +{{ item.value }} {{ item.stat }}
            </span>
            <span v-else class="text-gray-600 italic">Empty</span>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col items-center justify-center p-10 bg-gray-900">
      <h1 class="text-4xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
        Incremental Equipment Game
      </h1>

      <div class="flex flex-col items-center gap-8 w-full max-w-md">
        <button
          @click="store.generateRandomEquipment"
          class="group relative px-8 py-4 bg-yellow-600 hover:bg-yellow-500 text-white rounded-full font-bold text-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="store.coins < 10 || store.newItem"
        >
          <span class="flex items-center gap-2">
            🎴 Flip Card (10 Coins)
          </span>
        </button>

        <!-- New Item Display -->
        <div v-if="store.newItem" class="w-full bg-gray-800 border-2 border-yellow-500 rounded-xl p-6 shadow-2xl animate-bounce-in">
          <div class="text-center mb-6">
            <h3 class="text-sm uppercase tracking-widest text-gray-400 mb-1">You found a new item!</h3>
            <div class="text-3xl font-black mb-2" :class="getRarityColor(store.newItem.rarity)">
              [{{ store.newItem.rarity }}] {{ store.newItem.slot }}
            </div>
            <div class="text-xl text-green-400">
              +{{ store.newItem.value }} {{ store.newItem.stat }}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button
              @click="store.equipItem"
              class="bg-green-600 hover:bg-green-500 py-3 rounded-lg font-bold transition-colors"
            >
              Equip
            </button>
            <button
              @click="store.discardItem"
              class="bg-red-600 hover:bg-red-500 py-3 rounded-lg font-bold transition-colors"
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
