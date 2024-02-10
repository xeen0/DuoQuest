import { atomWithStorage  } from 'jotai/utils'

export const playersAtom = atomWithStorage('players', {})
export const currentPlayerIdAtom = atomWithStorage('currentPlayerId', null)