import React from 'react';
import { H4, P } from 'trezor-ui-components';

const TroubleshootBootloader = () => (
    <React.Fragment>
        <H4>Device in bootloader mode</H4>
        <P>Device is connected in bootloader mode. Plug out the USB cable and connect device again.</P>
    </React.Fragment>
);

export default TroubleshootBootloader;