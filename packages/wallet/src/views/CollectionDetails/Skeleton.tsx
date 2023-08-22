import React from 'react'
import { Box, vars } from '@0xsequence/design-system'

import { NetworkBadge } from '../../shared/NetworkBadge'
import { Skeleton } from '../../shared/Skeleton'

interface CollectionDetailsSkeletonProps {
  chainId: number
}

export const CollectionDetailsSkeleton = ({
  chainId
}: CollectionDetailsSkeletonProps) => {
  return (
    <Box
      padding="5"
      paddingTop="3"
      marginTop="8"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="10"
    >
      <Box
        flexDirection="column"
        gap="2"
        justifyContent="center"
        alignItems="center"
      >
        <Skeleton width="32px" height="32px" />
        <Skeleton width="100px" height="24px" />
        <NetworkBadge chainId={chainId} />
        <Skeleton width="142px" height="17px" />
      </Box>
      <Box width="full">
        <Skeleton width="168px" height="20px" />
        <Box
          flexDirection="row"
          gap="2"
          flexWrap="wrap"
          width="full"
          marginTop="3"
        >
          {Array(8).fill(null).map((_, i) => (
            <Skeleton width={`calc(50% - ${vars.space[2]})`} height="211px" />
          ))}
        </Box>
      </Box>
    </Box>
  )
}