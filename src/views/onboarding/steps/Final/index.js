import React from 'react';
import styled from 'styled-components';
import {
    H1, H4, P, H6,
} from 'trezor-ui-components';
import { OptionsList } from 'components/Options';

import {
    StepWrapper, ControlsWrapper,
} from '../../components/Wrapper';

const OptionBody = styled.div`
    margin-bottom: auto;
`;

const OptionDesc = styled(P)`
    font-size: 0.9rem;
`;

const WalletOption = () => (
    <OptionBody>
        <H6>Trezor stable wallet</H6>
        <OptionDesc>Web wallet with support of Bitcoin, Dash, Zcash and other coins.</OptionDesc>
    </OptionBody>
);

const PasswordManagerOption = () => (
    <OptionBody>
        <H6>Trezor Password Manager</H6>
        <OptionDesc>A safe way how to manage your credentials with Trezor.</OptionDesc>
    </OptionBody>
);

const EthereumBetaWalletOption = () => (
    <OptionBody>
        <H6>Ethereum beta wallet</H6>
        <OptionDesc>New wallet with support of Ethereum and Ripple</OptionDesc>
    </OptionBody>


);

const FinalStep = () => (
    <StepWrapper>
        <H1>Good job! All done</H1>
        <H4>Now you are ready to enjoy bleeding edge security with Trezor.</H4>

        <ControlsWrapper>
            <OptionsList
                options={[{
                    content: <WalletOption />,
                    // value: '1',
                    key: 1,
                    onClick: () => {},
                }, {
                    content: <PasswordManagerOption />,
                    // value: '2',
                    key: 2,
                    onClick: () => {},
                }, {
                    content: <EthereumBetaWalletOption />,
                    // value: '3',
                    key: 3,
                    onClick: () => {},
                }]}
                selected={null}
                // selectedAccessor="value" // todo: maybe not needed
            />
        </ControlsWrapper>
    </StepWrapper>
);

export default FinalStep;
