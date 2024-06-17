import { Tabs, TabsItem } from '@gobob/ui';
import { Key, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ChainId } from '@gobob/chains';

import { Main } from '../../components';
import { L1_CHAIN, L2_CHAIN, RoutesPath } from '../../constants';

import { StyledCard, StyledFlex } from './Bridge.style';
import { BannerCarousel, BridgeForm, TransactionList } from './components';

enum BridgeOrigin {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL'
}

const Bridge = () => {
  const location = useLocation();
  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit');
  const [bridgeOrigin, setBridgeOrigin] = useState<BridgeOrigin>(BridgeOrigin.INTERNAL);
  const [chain, setChain] = useState<ChainId | 'BTC'>(L1_CHAIN);

  const [searchParams, setSearchParams] = useSearchParams(new URLSearchParams('action=deposit'));

  const navigate = useNavigate();

  const handleChangeTab = useCallback(
    (key: any) => {
      setType(key as any);
      setBridgeOrigin(key === 'deposit' ? BridgeOrigin.INTERNAL : BridgeOrigin.EXTERNAL);
      setChain(L1_CHAIN);

      setSearchParams(() => {
        const newParams = new URLSearchParams();

        newParams.set('type', key as string);

        return newParams;
      });
    },
    [setSearchParams]
  );

  const handleChangeNetwork = useCallback(
    (network: Key) => {
      if (network === 'BTC') {
        return setBridgeOrigin(BridgeOrigin.INTERNAL);
      }

      if (type === 'deposit' ? network !== L1_CHAIN : network !== L2_CHAIN) {
        setBridgeOrigin(BridgeOrigin.EXTERNAL);
      } else {
        setBridgeOrigin(BridgeOrigin.INTERNAL);
      }
    },
    [type]
  );

  const handleChangeOrigin = useCallback((origin: BridgeOrigin) => setBridgeOrigin(origin), []);

  const handleChangeChain = useCallback((chain: ChainId | 'BTC') => setChain(chain), []);

  const handlePressEcosystemBanner = useCallback(
    () => navigate(RoutesPath.FUSION, { state: { scrollEcosystem: true } }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handlePressOnrampBanner = useCallback(
    () => {
      setChain('BTC');
      setBridgeOrigin(BridgeOrigin.INTERNAL);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const selectedTabKey = searchParams.get('type') || undefined;

    setType(selectedTabKey as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Main maxWidth='5xl' padding='md'>
      <BannerCarousel
        onPressEcosystemBanner={handlePressEcosystemBanner}
        onPressOnrampBanner={handlePressOnrampBanner}
      />
      <StyledFlex alignItems='flex-start' direction={{ base: 'column', md: 'row' }} gap='2xl' marginTop='xl'>
        <StyledCard>
          <Tabs fullWidth selectedKey={type} size='lg' onSelectionChange={handleChangeTab}>
            <TabsItem key='deposit' title='Deposit'>
              <></>
            </TabsItem>
            <TabsItem key='withdraw' title='Withdraw'>
              <></>
            </TabsItem>
          </Tabs>
          <BridgeForm
            bridgeOrigin={bridgeOrigin}
            chain={chain}
            ticker={location.state?.ticker}
            type={type}
            onChangeChain={handleChangeChain}
            onChangeNetwork={handleChangeNetwork}
            onChangeOrigin={handleChangeOrigin}
          />
        </StyledCard>
        <TransactionList />
      </StyledFlex>
    </Main>
  );
};

export { Bridge, BridgeOrigin };
