import React from 'react'
import { Box, Button } from '@0xsequence/design-system'

import { useNavigation } from '../hooks'

export const AllCollections = () => {
  const { setNavigation } = useNavigation()

  const onClickBack = () => {
    setNavigation && setNavigation({
      location: 'home'
    })
  }

  const getContent = () => {
    return (
      <Box>
        Content goes here for all collections....
      </Box>
    )
  }

  return (
    <Box paddingX="4" paddingBottom="4">
      <Box alignItems="center" style={{ height: '60px' }}>
        <Button onClick={onClickBack} label="back" />
      </Box>

      {getContent()}
    </Box>
  )
}