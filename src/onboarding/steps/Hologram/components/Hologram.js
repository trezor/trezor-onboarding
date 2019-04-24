/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';

import t1Hologram from '../videos/T1_hologram.mp4';
import t2Hologram from '../videos/TT_hologram.mp4';

const Hologram = (props) => {
    const sources = {
        1: t1Hologram,
        2: t2Hologram,
    };
    return (
        <video width="100%" autoPlay loop>
            <source src={sources[props.model]} type="video/mp4" />
        </video>
    );
};

Hologram.propTypes = {
    model: PropTypes.number.isRequired,
};

export default Hologram;