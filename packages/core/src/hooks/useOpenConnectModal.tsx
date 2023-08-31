import React, { useContext } from 'react'
import { useConnectModalContext } from '../contexts/ConnectModal'

export const useOpenConnectModal = () => {
  const { setOpenConnectModal, openConnectModalState } = useConnectModalContext()

  return { setOpenConnectModal, openConnectModalState }
}