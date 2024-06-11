import { Avatar, Button, Card, DocumentDuplicate, Flex, P, Power, Span, Strong, UnstyledButton } from '@gobob/ui';
import { truncateBtcAddress, truncateEthAddress } from '@gobob/utils';
import { useCopyToClipboard } from 'react-use';

import { WalletType } from '../../types';
import { WalletIcon } from '../WalletIcon';

type ConnectedWalletSectionProps = {
  type: WalletType;
  address: string;
  icon?: string;
  wallet: string;
  onDisconnect: () => void;
};

const ConnectedWalletSection = ({ type, icon, onDisconnect, address, wallet }: ConnectedWalletSectionProps) => {
  const [, copy] = useCopyToClipboard();

  return (
    <Card
      alignItems='center'
      background='grey-800'
      direction='row'
      gap='s'
      justifyContent='space-between'
      paddingX='xl'
      paddingY='lg'
      rounded='md'
    >
      <Flex alignItems='center' gap='lg'>
        {icon ? <Avatar rounded='none' size='2xl' src={icon} /> : <WalletIcon name={wallet} size='xl' />}
        <Flex alignItems='flex-start' direction='column'>
          <P size='s'>
            Connected with <Strong size='s'>{wallet}</Strong>
          </P>
          <UnstyledButton onPress={() => copy(address)}>
            <Flex alignItems='center' elementType='span' gap='md'>
              <Span size='s' weight='bold'>
                {type === 'evm' ? truncateEthAddress(address) : truncateBtcAddress(address)}
              </Span>
              <DocumentDuplicate color='light' size='s' />
            </Flex>
          </UnstyledButton>
        </Flex>
      </Flex>
      <Button isIconOnly size='s' variant='outline' onPress={onDisconnect}>
        <Power size='s' />
      </Button>
    </Card>
  );
};

export { ConnectedWalletSection };
