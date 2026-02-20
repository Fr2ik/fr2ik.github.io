import { defineStore } from 'pinia'

export const rarityTiers = {
  F: { multiplier: 1, color: 'text-gray-400' },
  E: { multiplier: 2, color: 'text-green-500' },
  D: { multiplier: 4, color: 'text-blue-500' },
  C: { multiplier: 8, color: 'text-purple-500' },
  B: { multiplier: 16, color: 'text-orange-500' },
  A: { multiplier: 32, color: 'text-red-500' }
}

export const slots = [
  'Weapon', 'Gloves', 'Boots', 'Helmet',
  'Chestplate', 'Legguards', 'Ring', 'Amulet'
]

export const statsList = ['HP', 'Attack', 'Defense', 'Attack Speed']

export const useGameStore = defineStore('game', {
  state: () => ({
    coins: 100,
    equipment: {
      Weapon: null,
      Gloves: null,
      Boots: null,
      Helmet: null,
      Chestplate: null,
      Legguards: null,
      Ring: null,
      Amulet: null
    },
    baseStats: {
      HP: 100,
      Attack: 10,
      Defense: 5,
      'Attack Speed': 1.0
    },
    newItem: null
  }),
  getters: {
    characterStats: (state) => {
      const totalStats = { ...state.baseStats }
      Object.values(state.equipment).forEach(item => {
        if (item) {
          totalStats[item.stat] += item.value
        }
      })
      // Round values
      return {
        HP: Math.round(totalStats.HP),
        Attack: Math.round(totalStats.Attack),
        Defense: Math.round(totalStats.Defense),
        'Attack Speed': Number(totalStats['Attack Speed'].toFixed(2))
      }
    }
  },
  actions: {
    generateRandomEquipment() {
      if (this.coins < 10) {
        alert("Not enough coins!")
        return
      }
      this.coins -= 10

      const slot = slots[Math.floor(Math.random() * slots.length)]
      const rarityKeys = Object.keys(rarityTiers)
      const rarity = rarityKeys[Math.floor(Math.random() * rarityKeys.length)]
      const stat = statsList[Math.floor(Math.random() * statsList.length)]

      const baseValues = {
        HP: 10,
        Attack: 2,
        Defense: 1,
        'Attack Speed': 0.05
      }

      const multiplier = rarityTiers[rarity].multiplier
      const variance = 0.8 + Math.random() * 0.4
      const value = baseValues[stat] * multiplier * variance

      this.newItem = {
        slot,
        rarity,
        stat,
        value: stat === 'Attack Speed' ? Number(value.toFixed(2)) : Math.round(value)
      }
    },
    equipItem() {
      if (this.newItem) {
        this.equipment[this.newItem.slot] = { ...this.newItem }
        this.newItem = null
      }
    },
    discardItem() {
      this.newItem = null
    }
  }
})
