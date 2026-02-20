import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGameStore } from './gameStore'

describe('Game Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Mock alert
    vi.stubGlobal('alert', vi.fn())
  })

  it('initializes with 100 coins', () => {
    const store = useGameStore()
    expect(store.coins).toBe(100)
  })

  it('deducts 10 coins when generating equipment', () => {
    const store = useGameStore()
    store.generateRandomEquipment()
    expect(store.coins).toBe(90)
    expect(store.newItem).not.toBeNull()
  })

  it('does not generate equipment if coins are insufficient', () => {
    const store = useGameStore()
    store.coins = 5
    store.generateRandomEquipment()
    expect(store.coins).toBe(5)
    expect(store.newItem).toBeNull()
    expect(alert).toHaveBeenCalledWith("Not enough coins!")
  })

  it('equips an item and updates character stats', () => {
    const store = useGameStore()
    store.newItem = {
      slot: 'Weapon',
      rarity: 'F',
      stat: 'Attack',
      value: 10
    }
    const initialAttack = store.characterStats.Attack
    store.equipItem()
    expect(store.equipment.Weapon).toEqual({
      slot: 'Weapon',
      rarity: 'F',
      stat: 'Attack',
      value: 10
    })
    expect(store.characterStats.Attack).toBe(initialAttack + 10)
  })

  it('discards a new item', () => {
    const store = useGameStore()
    store.newItem = {
      slot: 'Weapon',
      rarity: 'F',
      stat: 'Attack',
      value: 10
    }
    expect(store.newItem).not.toBeNull()
    store.discardItem()
    expect(store.newItem).toBeNull()
  })
})
