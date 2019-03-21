/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';

import t1video from 'components/Prompts/videos/trezor-click-1.mp4';
import t2video from 'components/Prompts/videos/trezor-click-2.mp4';

const TrezorConnect = ({ model, height }) => {
    const models = new Map([
        ['1', t1video],
        ['2', t2video],
    ]);
    return (
        <React.Fragment>
            {
                model === '1' && (
                    <video height={height} autoPlay loop>
                        <source src={models.get('1')} type="video/mp4" />
                    </video>
                )
            }
            {
                model === '2' && (
                    <video height={height} autoPlay loop>
                        <source src={models.get('2')} type="video/mp4" />
                    </video>
                )
            }
        </React.Fragment>

    );
};

TrezorConnect.propTypes = {
    model: PropTypes.string.isRequired,
    height: PropTypes.number,
};

TrezorConnect.defaultProps = {
    height: 200,
};

export default TrezorConnect;