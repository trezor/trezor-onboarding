import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
    ButtonPin,
} from 'trezor-ui-components';


const Wrapper = styled.div`
    max-width: 260px;
    margin-left: auto;
    margin-right: auto;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 8px;
`;

class BlindMatrix extends React.Component {
    componentWillMount() {
        this.keyboardHandler = this.keyboardHandler.bind(this);
        window.addEventListener('keydown', this.keyboardHandler, false);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyboardHandler, false);
    }

    keyboardHandler(event) {
        const { onSubmit, count } = this.props;

        event.preventDefault();
        if (count === 9) {
            switch (event.keyCode) {
                // numeric and numpad
                case 49:
                case 97:
                    onSubmit(1);
                    break;
                case 50:
                case 98:
                    onSubmit(2);
                    break;
                case 51:
                case 99:
                    onSubmit(3);
                    break;
                case 52:
                case 100:
                    onSubmit(4);
                    break;
                case 53:
                case 101:
                    onSubmit(5);
                    break;
                case 54:
                case 102:
                    onSubmit(6);
                    break;
                case 55:
                case 103:
                    onSubmit(7);
                    break;
                case 56:
                case 104:
                    onSubmit(8);
                    break;
                case 57:
                case 105:
                    onSubmit(9);
                    break;
                default: break;
            }
        } else {
            switch (event.keyCode) {
                case 49:
                case 97:
                    onSubmit(1);
                    break;
                case 51:
                case 99:
                    onSubmit(3);
                    break;
                case 52:
                case 100:
                    onSubmit(4);
                    break;
                case 54:
                case 102:
                    onSubmit(6);
                    break;
                case 55:
                case 103:
                    onSubmit(7);
                    break;
                case 57:
                case 105:
                    onSubmit(9);
                    break;
                default: break;
            }
        }
    }

    render() {
        const { onSubmit } = this.props;

        return (
            <Wrapper>
                {
                    this.props.count === 9 && (
                        <React.Fragment>
                            <Row>
                                <ButtonPin type="button" data-value="7" onClick={() => onSubmit(7)}>&#8226; </ButtonPin>
                                <ButtonPin type="button" data-value="8" onClick={() => onSubmit(8)}>&#8226;</ButtonPin>
                                <ButtonPin type="button" data-value="9" onClick={() => onSubmit(9)}>&#8226;</ButtonPin>
                            </Row>
                            <Row>
                                <ButtonPin type="button" data-value="4" onClick={() => onSubmit(4)}>&#8226; </ButtonPin>
                                <ButtonPin type="button" data-value="5" onClick={() => onSubmit(5)}>&#8226;</ButtonPin>
                                <ButtonPin type="button" data-value="6" onClick={() => onSubmit(6)}>&#8226;</ButtonPin>
                            </Row>
                            <Row>
                                <ButtonPin type="button" data-value="1" onClick={() => onSubmit(1)}>&#8226; </ButtonPin>
                                <ButtonPin type="button" data-value="2" onClick={() => onSubmit(2)}>&#8226;</ButtonPin>
                                <ButtonPin type="button" data-value="3" onClick={() => onSubmit(3)}>&#8226;</ButtonPin>
                            </Row>
                        </React.Fragment>
                    )
                }

                {
                    this.props.count === 6 && (
                        <React.Fragment>
                            <Row>
                                <ButtonPin type="button" data-value="8" onClick={() => onSubmit(7)}>&#8226;</ButtonPin>
                                <ButtonPin type="button" data-value="9" onClick={() => onSubmit(9)}>&#8226;</ButtonPin>
                            </Row>
                            <Row>
                                <ButtonPin type="button" data-value="5" onClick={() => onSubmit(4)}>&#8226; </ButtonPin>
                                <ButtonPin type="button" data-value="6" onClick={() => onSubmit(6)}>&#8226;</ButtonPin>
                            </Row>
                            <Row>
                                <ButtonPin type="button" data-value="2" onClick={() => onSubmit(1)}>&#8226; </ButtonPin>
                                <ButtonPin type="button" data-value="3" onClick={() => onSubmit(3)}>&#8226;</ButtonPin>
                            </Row>
                        </React.Fragment>
                    )
                }
            </Wrapper>
        );
    }
}

BlindMatrix.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default BlindMatrix;