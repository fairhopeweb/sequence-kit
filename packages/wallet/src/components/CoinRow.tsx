import { Box, Image, Text } from '@0xsequence/design-system'

import React from 'react'
import { Skeleton } from './Skeleton'
import { ethers } from 'ethers'

import { formatDisplay } from '../utils'

interface CoinRowProps {
  name: string,
  symbol: string,
  decimals: number,
  balance: string,
  imageUrl: string,
}

export const CoinRowSkeleton = () => {
  return (
    <Box height="12" alignItems="center" justifyContent="space-between" background="backgroundSecondary" borderRadius="md" paddingY="2" paddingX="3">
      <Box justifyContent="center" alignItems="center" gap="2">
        <Skeleton width={30} height={30} borderRadius="circle" />
        <Skeleton width={100} height={20} />
      </Box>
      <Skeleton width={100} height={20} />
    </Box>
  )
}

export const CoinRow = ({ imageUrl, name, decimals, balance, symbol }: CoinRowProps) => {
  const formattedBalance = ethers.utils.formatUnits(balance, decimals)
  const balanceDisplayed = formatDisplay(formattedBalance)

  return (
    <Box height="12" alignItems="center" justifyContent="space-between" background="backgroundSecondary" borderRadius="md" paddingY="2" paddingX="3">
      <Box justifyContent="center" alignItems="center" gap="2">
        <Image src={imageUrl} borderRadius="circle" style={{ width: '30px' }} />
        <Text variant="medium">{name}</Text>
      </Box>
      <Text variant="normal"> {`${balanceDisplayed} ${symbol}`}</Text>
    </Box>
  )
}