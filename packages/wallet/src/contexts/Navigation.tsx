import React, { createContext } from 'react'

export interface AllCollectiblesParams {
  collectionAddress: string
}

export interface AllCollectiblesNavigation {
  location: 'all-collectibles',
  params: AllCollectiblesParams
}

export interface CoinDetailsParams {
  contractAddress: string
  chainId: number
  backLocation: Navigation
}

export interface CoinDetailsNavigation {
  location: 'coin-details',
  params: CoinDetailsParams
}

export interface CollectibleDetailsParams {
  contractAddress: string
  chainId: number
  tokenId: string
  backLocation: Navigation
}

export interface CollectibleDetailsNavigation {
  location: 'collectible-details',
  params: CollectibleDetailsParams
}

export interface BasicNavigation {
  location:
    'home' |
    'all-coins' |
    'all-collections' |
    'send' |
    'receive' |
    'history' |
    'receive' |
    'history-details' |
    'settings' |
    'settings-general' |
    'settings-currency' |
    'settings-networks', 
}

export type Navigation =
  BasicNavigation |
  AllCollectiblesNavigation |
  CoinDetailsNavigation |
  CollectibleDetailsNavigation

type NavigationContext = {
  setNavigation?: (navigation:Navigation) => void,
  navigation?: Navigation,
}

export const NavigationContext = createContext<NavigationContext>({})