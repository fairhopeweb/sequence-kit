import { Chain } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { GoogleLogo } from './GoogleLogo'

window.Buffer = window.Buffer || require("buffer").Buffer;

export interface GoogleOptions {
  chains: Chain[];
}

export const google = ({ chains }: GoogleOptions) => ({
  id: 'google',
  logoDark: GoogleLogo,
  logoLight: GoogleLogo,
  // iconBackground: '#fff',
  name: 'Google',
  createConnector: () => {
    const connector = new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: true,
      },
    });
    return connector
  }
})