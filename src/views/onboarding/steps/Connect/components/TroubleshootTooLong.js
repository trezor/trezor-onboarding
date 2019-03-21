import React from 'react';
import { P, Link } from 'trezor-ui-components';

import { UnorderedList } from 'components/Lists';
import { SUPPORT_URL } from 'config/urls';

const TroubleshootSearchingTooLong = () => (
    <React.Fragment>
        <P />
        <P>Searching for your device takes too long, you might want to try to:</P>
        <UnorderedList
            items={[{
                component: <P>Reconnect your device and wait for a while</P>,
                key: '1',
            }, {
                component: <P>Refresh your internet browser window</P>,
                key: '2',
            }, {
                component: <P>Try using another cable</P>,
                key: '3',
            }, {
                component: <P>If nothing helps, <Link href={SUPPORT_URL}> contact Trezor support</Link></P>,
                key: '4',
            }]}
        />
    </React.Fragment>
);

export default TroubleshootSearchingTooLong;