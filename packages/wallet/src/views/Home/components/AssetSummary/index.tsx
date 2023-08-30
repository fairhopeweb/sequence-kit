import React from 'react'
import { Box, vars } from '@0xsequence/design-system'
import { TokenBalance } from '@0xsequence/indexer'
import { useAccount, useNetwork } from 'wagmi'

import { CoinTile } from './CoinTile'
import { CollectibleTile } from './CollectibleTile'
import { SkeletonTiles } from './SkeletonTiles'

import { sortBalancesByType } from '../../../../utils'
import { useBalancesAssetsSummary, useNavigation, useSettings } from '../../../../hooks'
import * as sharedStyles from '../../../../shared/styles.css'

export const AssetSummary = () => {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { setNavigation } = useNavigation()
  const { hideUnlistedTokens, hideCollectibles } = useSettings()

  const { data: balances = [], isLoading: isLoadingBalances } = useBalancesAssetsSummary({ accountAddress: address || '', chainId: chain?.id || 1 }, { hideUnlistedTokens, hideCollectibles })

  if (isLoadingBalances) {
    return (
      <SkeletonTiles />
    )
  }

  const { nativeTokens, erc20Tokens, collectibles } = sortBalancesByType(balances)

  const onClickItem = (balance: TokenBalance) => {
    if (balance.contractType === 'ERC1155' || balance.contractType === 'ERC721') {
      setNavigation && setNavigation({
        location: 'collectible-details',
        params: {
          contractAddress: balance.contractAddress,
          chainId: balance.chainId,
          tokenId: balance.tokenID,
        }
      })
    } else if (balance.contractType === 'ERC20') {
      setNavigation && setNavigation({
        location: 'coin-details',
        params: {
          contractAddress: balance.contractAddress,
          chainId: balance.chainId,
        }
      })
    } else {
      setNavigation && setNavigation({
        location: 'coin-details',
        params: {
          contractAddress: balance.contractAddress,
          chainId: balance.chainId,
        }
      })
    }
  }

  return (
    <Box flexDirection="row" gap="2" flexWrap="wrap">
      {nativeTokens.map((balance) => {
        return (
          <Box
            key={balance.contractAddress}
            className={sharedStyles.clickable}
            aspectRatio='1/1'
            style={{
              width: `calc(50% - ${vars.space[2]})`
            }}
            onClick={() => onClickItem(balance)}
          >
            <CoinTile balance={balance} />
          </Box>
        )
      })}
      {erc20Tokens.map((balance) => {
        return (
          <Box
            className={sharedStyles.clickable}
            key={balance.contractAddress}
            aspectRatio='1/1'
            style={{
              width: `calc(50% - ${vars.space[2]})`
            }}
            onClick={() => onClickItem(balance)}
          >
            <CoinTile balance={balance} />
          </Box>
        )
      })}
      {collectibles.map((balance) => {
        return (
          <Box
            className={sharedStyles.clickable}
            aspectRatio='1/1'
            key={`${balance.contractAddress}-${balance.tokenID}}`}
            style={{
              width: `calc(50% - ${vars.space[2]})`
            }}
            onClick={() => onClickItem(balance)}
          >
            <CollectibleTile balance={balance} />
          </Box>
        )
      })}
    </Box>
  )
}