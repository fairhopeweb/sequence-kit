import { Chain } from 'wagmi'
import type { ConnectOptions } from '@0xsequence/provider';
import { SequenceConnector } from '@0xsequence/wagmi-connector';

import { SequenceLogo } from './SequenceLogo'

export interface SequenceOptions {
  chains: Chain[];
  connect?: ConnectOptions
}

export const sequence = ({ chains, connect }: SequenceOptions) => ({
  id: 'sequence',
  logo: SequenceLogo,
  // iconBackground: '#777',
  name: 'Sequence',
  createConnector: () => {
    const connector = new SequenceConnector({
      chains,
      options: {
        connect
      },
    });
    return connector
  }
})