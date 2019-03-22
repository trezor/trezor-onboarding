/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';

import t1video from 'components/Prompts/videos/trezor-click-1.mp4';
import t2video from 'components/Prompts/videos/trezor-click-2.mp4';

const TrezorConnect = ({ model, height }) => {
    const models = new Map([
        [1, t1video],
        [2, t2video],
    ]);
    return (
        <React.Fragment>
            <video height={height} autoPlay loop>
                <source src={models.get(model)} type="video/mp4" />
            </video>
        </React.Fragment>
    );
};

TrezorConnect.propTypes = {
    model: PropTypes.number.isRequired,
    height: PropTypes.number,
};

TrezorConnect.defaultProps = {
    height: 200,
};

export default TrezorConnect;