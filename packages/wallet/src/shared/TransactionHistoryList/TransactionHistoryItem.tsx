import React from 'react'
import { ethers } from 'ethers'
import { Transaction, TxnTransfer, TxnTransferType } from '@0xsequence/indexer'
import { Box, Text, Image, SendIcon, ReceiveIcon, TransactionIcon, vars } from '@0xsequence/design-system'
import dayjs from 'dayjs'

import { Skeleton } from '../../shared/Skeleton'
import { useCoinPrices, useSettings } from '../../hooks'
import {
  formatDisplay,
  getNativeTokenInfoByChainId,
  compareAddress,
  getFiatCurrencyById
} from '../../utils'

interface TransactionHistoryItemProps {
  transaction: Transaction
}

export const TransactionHistoryItem = ({
  transaction
}: TransactionHistoryItemProps) => {
  const { fiatCurrency } = useSettings()
  const fiatCurrencyInfo = getFiatCurrencyById(fiatCurrency)

  let tokenContractAddresses: string[] = []
    
  transaction.transfers?.forEach((transfer) => {
    const tokenContractAddress = transfer.contractAddress
    if (!tokenContractAddresses.includes(tokenContractAddress)) {
      tokenContractAddresses.push(tokenContractAddress)
    }
  })

  const {
    data: coinPrices = [],
    isLoading: isLoadingCoinPrices
  } = useCoinPrices({
    tokens: tokenContractAddresses.map((contractAddress) => ({
      contractAddress,
      chainId: transaction.chainId
    }))
  })

  const { transfers } = transaction

  const nativeTokenInfo = getNativeTokenInfoByChainId(transaction.chainId)

  const getTansactionLabelByType = (transferType: TxnTransferType) => {
    switch(transferType) {
      case TxnTransferType.SEND:
        return 'Sent'
      case TxnTransferType.RECEIVE:
        return 'Received'
      case TxnTransferType.UNKNOWN:
      default:
        return 'Transacted'
    }
  }

  const getTransactionIconByType = (transferType: TxnTransferType) => {
    switch(transferType) {
      case TxnTransferType.SEND:
        return <SendIcon style={{ width: '14px' }} />
      case TxnTransferType.RECEIVE:
        return <ReceiveIcon style={{ width: '14px' }} />
      case TxnTransferType.UNKNOWN:
      default:
        return <TransactionIcon style={{ width: '14px' }} />
    }
  }

  const getTransferAmountLabel = (amount: string, symbol: string, transferType: TxnTransferType) => {
    let sign = ''
    if (transferType === TxnTransferType.SEND) {
      sign = '-'
    } else if (transferType === TxnTransferType.RECEIVE) {
      sign = '+'
    }

    let textColor = 'text50'
    if (transferType === TxnTransferType.SEND) {
      textColor = vars.colors.negative
    } else if  (transferType === TxnTransferType.RECEIVE) {
      textColor = vars.colors.positive
    }

    return (
      <Text fontWeight="bold" fontSize="normal" style={{ color: textColor }}>{`${sign}${amount} ${symbol}`}</Text>
    )
  }

  const getTransfer = (transfer: TxnTransfer)  => {
    const { amounts } = transfer
    const date = dayjs(transaction.timestamp).format('MMM DD, YYYY')
    return (
      <Box gap="2" width="full" flexDirection="column" justifyContent="space-between">
        <Box flexDirection="row" justifyContent="space-between">
          <Box color="text50" gap="1" flexDirection="row" justifyContent="center" alignItems="center">
            {getTransactionIconByType(transfer.transferType)}
            <Text fontWeight="medium" fontSize="normal">{getTansactionLabelByType(transfer.transferType)}</Text>
            <Image src={nativeTokenInfo.logoURI} width="3" />
          </Box>
          <Box>
            <Text fontWeight="medium" fontSize="normal" color="text50">{date}</Text>
          </Box>
        </Box>
        {amounts.map((amount, index) => {
          const decimals = transfer.contractInfo?.decimals || 0
          const amountValue = ethers.utils.formatUnits(amount, decimals)
          const symbol = transfer.contractInfo?.symbol || ''
          const tokenLogoUri = transfer.contractInfo?.logoURI || ''

          const fiatConversionRate = coinPrices.find((coinPrice) => compareAddress(coinPrice.token.contractAddress, transfer.contractAddress))?.price?.value

          return (
            <Box key={index} flexDirection="row" justifyContent="space-between">
              <Box flexDirection="row" gap="2" justifyContent="center" alignItems="center">
                <Image src={tokenLogoUri} width="5" alt="token logo" />
                {getTransferAmountLabel(formatDisplay(amountValue), symbol, transfer.transferType)}
              </Box>
              {isLoadingCoinPrices && (
                <Skeleton width="35px" height="20px" />
              )}
              {fiatConversionRate && (
                <Text fontWeight="medium" fontSize="normal" color="text50">
                  {`${fiatCurrencyInfo.symbol}${(Number(amountValue) * fiatConversionRate).toFixed(2)}`}
                </Text>
              )}
            </Box>
          )
        })}
      </Box>
    )
  }

  return (
    <Box
      background="backgroundSecondary"
      borderRadius="md"
      padding="4"
      gap="2"
      alignItems="center"
      justifyContent="center"
    >
      {transfers?.map((transfer, position) => {
        return (
          <Box  key={`${transaction.txnHash}-${position}`} width="full">
            {getTransfer(transfer)}
          </Box>
        )
      })}
    </Box>
  )
}