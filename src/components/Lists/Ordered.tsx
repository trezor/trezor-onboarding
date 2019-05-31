import React from 'react';
import styled from 'styled-components';

import colors from 'config/colors';

const ListItem = styled.li`
    margin-bottom: 14px;
    &:before {
        content: counter(custom-counter);
        border: 1.5px solid ${colors.gray};
        border-radius: 50%;
        padding: 7px;
        margin-right: 14px;
        color: ${colors.grayDark};
        height: 2.2em;
        width: 2.2em;
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }
    & > * {
        display: inline;
    }
`;

const OrderedListWrapper = styled.ol`
    counter-reset: custom-counter;
    list-style: none;
    ${ListItem} {
        counter-increment: custom-counter;
    }
`;


type Item = string | number;

interface Props {
    items: Array<Item>
}

const OrderedList = ({ items }: Props) => (
    <OrderedListWrapper>
        {
            items.map((item: Item) => <ListItem key={item}>{item}</ListItem>)
        }
    </OrderedListWrapper>
);

export default OrderedList;