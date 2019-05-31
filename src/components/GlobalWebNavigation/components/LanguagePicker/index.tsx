import React from 'react';
import styled from 'styled-components';
import colors from 'config/colors';
import ReactSelect from 'react-select';

import LANGUAGE from 'config/languages';
import * as BREAKPOINTS from 'config/breakpoints';

const SelectWrapper = styled.div`
    display: flex;
    color: ${colors.white};
    align-items: center;
    width: 180px;
    max-width: 30vw;

    @media screen and (max-width: ${BREAKPOINTS.MD}) {
        width: 140px;
    }
    
    @media screen and (max-width: ${BREAKPOINTS.XS}) {
        width: 100px;
    }
`;

const SelectIcon = styled.span`
    margin-right: -24px;
    padding-left: 6px;
    display: flex;
`;

const styles = {
    singleValue: base => ({
        ...base,
        color: colors.white,
        paddingLeft: '25px', // flag
    }),
    control: base => ({
        ...base,
        height: '40px',
        border: 'none',
        background: 'transparent',
        boxShadow: 'none',
        cursor: 'pointer',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    container: base => ({
        ...base,
        width: '100%',
    }),
    dropdownIndicator: () => ({
        display: 'block',
        marginTop: '3px',
    }),
    menu: base => ({
        ...base,
        color: colors.white,
        marginTop: '6px',
        boxShadow: 'none',
    }),
    menuList: base => ({
        ...base,
        padding: 0,
        boxShadow: 'none',
        background: colors.white,
        borderLeft: `1px solid ${colors.black}`,
        borderRight: `1px solid ${colors.black}`,
        borderBottom: `1px solid ${colors.black}`,
    }),
    option: (base, { isFocused }) => ({
        ...base,
        color: colors.black,
        background: isFocused ? colors.white : colors.white,
        borderRadius: 0,
        textAlign: 'left',
        '&:hover': {
            cursor: 'pointer',
            background: colors.white,
        },
    }),
};

const buildOption = (langCode) => {
    const lang = LANGUAGE.find(l => l.code === langCode);
    return { value: lang.code, label: lang.name };
};

const LanguagePicker = ({ language, setLocale }) => (
    <SelectWrapper>
        <SelectIcon role="img" aria-label="Select language">
            <svg width="21" height="15">
                <image href={`l10n/flags/${language}.svg`} width="21" height="15" />
            </svg>
        </SelectIcon>
        <ReactSelect
            styles={styles}
            isSearchable={false}
            isClearable={false}
            onChange={option => setLocale(option.value)}
            value={buildOption(language)}
            options={LANGUAGE.map(lang => buildOption(lang.code))}
        />
    </SelectWrapper>
);

export default LanguagePicker;