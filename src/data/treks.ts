import type { Trek } from '../types'

// How to add treks:
// - Push a new Trek object to the `treks` array with fields id, name, location, description, year(optional).

export const treks: Trek[] = [
  {
    id: 't1',
    name: 'Misty Ridge Loop',
    location: 'Western Ghats, India',
    description: 'A 3-day ridge trek with lush forests, monsoon streams, and ridge-top views.',
    year: '2024'
  },
  {
    id: 't2',
    name: 'High Pass Traverse',
    location: 'Himalayas, India',
    description: 'A challenging traverse with alpine meadows and panoramic peaks.',
    year: '2023'
  },
  {
    id: 't3',
    name: 'Sunrise Crater',
    location: 'Iceland',
    description: 'A short but dramatic hike to a volcanic crater for sunrise.',
    year: '2022'
  }
]
