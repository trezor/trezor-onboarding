import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link, P, Prompt } from 'trezor-ui-components';
import { CSSTransition } from 'react-transition-group';
import { hot } from 'react-hot-loader/root';

import { OnboardingReducer, OnboardingActions } from 'types/onboarding';
import { ConnectReducer, ConnectActions } from 'types/connect';
import { FetchReducer, FetchActions } from 'types/fetch';
import { FirmwareUpdateReducer, FirmwareUpdateActions } from 'types/firmwareUpdate';
import { RecoveryReducer, RecoveryActions } from 'types/recovery';
import { NewsletterReducer, NewsletterActions } from 'types/newsletter';
import { AnyStepId, Step } from 'types/steps';

import { isDevelopment } from 'support/build';
import * as EVENTS from 'actions/constants/events';
import colors from 'config/colors';
import { SM } from 'config/breakpoints';
import { TOS_URL } from 'config/urls';
import {
    PROGRESSBAR_HEIGHT,
    PROGRESSBAR_HEIGHT_UNIT,
    STEP_HEIGHT,
    STEP_HEIGHT_UNIT,
    NAVBAR_HEIGHT,
    NAVBAR_HEIGHT_UNIT,
} from 'config/layout';
import { STEP_ANIMATION_DURATION } from 'constants/constants';
import ProgressSteps from 'components/ProgressSteps';

import * as STEP from 'constants/steps';
import { getFnForRule } from 'utils/rules';

import UnexpectedState from 'components/UnexpectedState';
import BackupStep from 'onboarding/steps/Backup';
import BookmarkStep from 'onboarding/steps/Bookmark';
import BridgeStep from 'onboarding/steps/Bridge';
import FinalStep from 'onboarding/steps/Final';
import FirmwareStep from 'onboarding/steps/Firmware';
import HologramStep from 'onboarding/steps/Hologram';
import NewsletterStep from 'onboarding/steps/Newsletter';
import SelectDeviceStep from 'onboarding/steps/SelectDevice';
import SetPinStep from 'onboarding/steps/Pin';
import StartStep from 'onboarding/steps/Start';
import SecurityStep from 'onboarding/steps/Security';
import WelcomeStep from 'onboarding/steps/Welcome';
import NameStep from 'onboarding/steps/Name';
import ConnectStep from 'onboarding/steps/Connect';

import background2 from './background2.jpg';

const BORDER_RADIUS = 12;
const TRANSITION_PROPS = {
    timeout: STEP_ANIMATION_DURATION,
    classNames: 'step-transition',
    unmountOnExit: true,
};

const backgroundAnimation = keyframes`
    0% { opacity: 0 }
    100% { opacity: 1 }
`;

interface WrapperOutsideProps extends React.HTMLAttributes<HTMLDivElement> {
    animate: boolean;
}

const WrapperOutside = styled.div<WrapperOutsideProps>`
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - ${NAVBAR_HEIGHT}${NAVBAR_HEIGHT_UNIT});
    max-width: 100vw;
    overflow-x: hidden;

    @media only screen and (min-width: ${SM}px) {
        ${props => (props.animate && css`animation: ${backgroundAnimation} 1s linear`)};
        ${props => (
        props.animate && css`
            background-image: url(${background2});
            background-size: cover;
        `)};
    }
`;

interface WrapperInsideProps extends React.HTMLAttributes<HTMLDivElement> {
    isGlobalInteraction: boolean;
}

const WrapperInside = styled.div<WrapperInsideProps>`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: ${colors.white};
    border-radius: ${BORDER_RADIUS}px;
    z-index: 0;
    max-height: ${({ isGlobalInteraction }) => (isGlobalInteraction ? `calc(100vh - ${PROGRESSBAR_HEIGHT}${PROGRESSBAR_HEIGHT_UNIT} - ${NAVBAR_HEIGHT}${NAVBAR_HEIGHT_UNIT})` : 'none')};

    @media only screen and (min-width: ${SM}px) {
        width: calc(55vw + 150px) ;
        margin: 50px auto;
        overflow: hidden;
    } 
`;

const ProgressStepsWrapper = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${colors.grayLight};
`;

const ProgressStepsSlot = styled.div`
    height: ${PROGRESSBAR_HEIGHT}${PROGRESSBAR_HEIGHT_UNIT};
`;

const ComponentWrapper = styled.div`
    display: flex;
    min-height: ${STEP_HEIGHT}${STEP_HEIGHT_UNIT}
`;

const TrezorActionOverlay = styled.div`
    position: absolute;
    margin-top: auto;
    margin-bottom: auto;
    width: 100%;
    height: calc(100vh - ${PROGRESSBAR_HEIGHT}${PROGRESSBAR_HEIGHT_UNIT} - ${NAVBAR_HEIGHT}${NAVBAR_HEIGHT_UNIT});
    display: flex;
    justify-content: center;
    background-color: ${colors.white};
    z-index: 405;
    border-radius: ${BORDER_RADIUS}px;
`;

const UnexpectedStateOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${colors.white};
    z-index: 405;
    display: flex
`;

interface Props {
    activeStepId: OnboardingReducer['activeStepId'];
    steps: OnboardingReducer['steps'];
    activeSubStep: OnboardingReducer['activeSubStep'];
    selectedModel: OnboardingReducer['selectedModel'];
    deviceCall: ConnectReducer['deviceCall'];
    uiInteraction: ConnectReducer['uiInteraction'];
    deviceInteraction: ConnectReducer['deviceInteraction'];
    transport: ConnectReducer['transport'];
    connectError: ConnectReducer['connectError'];
    prevDeviceId: ConnectReducer['prevDeviceId'];
    device: ConnectReducer['device'];
    newsletter: NewsletterReducer;
    fetchCall: FetchReducer;
    recovery: RecoveryReducer;
    firmwareUpdate: FirmwareUpdateReducer;
   
    recoveryActions: RecoveryActions;
    connectActions: ConnectActions;
    fetchActions: FetchActions;
    newsletterActions: NewsletterActions;
    onboardingActions: OnboardingActions;
    firmwareUpdateActions: FirmwareUpdateActions;

}

class Onboarding extends React.PureComponent<Props> {
    componentDidMount() {
        if (!isDevelopment) {
            window.onbeforeunload = () => {
                if (this.props.activeStepId !== STEP.ID_FINAL_STEP) {
                    return 'Are you sure want to leave onboarding without saving?';
                }
                return null;
            };
        }

        this.props.connectActions.init();
    }

    getStep(activeStepId: OnboardingReducer['activeStepId']) {
        return this.props.steps.find(step => step.id === activeStepId);
    }

    getScreen() {
        return this.props.activeStepId;
    }

    handleErrors() {
        const {
            device,
            prevDeviceId,
            activeStepId,
            connectError,
            uiInteraction,
        } = this.props;

        if (!this.getStep(activeStepId).disallowedDeviceStates) {
            return [];
        }

        const errorStates = [];
        this.getStep(activeStepId).disallowedDeviceStates.forEach((state) => {
            const fn = getFnForRule(state);
            if (fn({ device, prevDeviceId, uiInteraction }) === true) {
                errorStates.push(state);
            }
        });
        // we can also have error from deviceCall
        // todo: maybe distinguish between deviceCall unexpected state errors (which go here) and other errors;
        if (connectError) {
            errorStates.push(`Failed to establish connection with Trezor servers. Please check your internet connection. [Error: ${connectError}]`);
        }
        return errorStates;
    }

    isGlobalInteraction() {
        const { deviceInteraction, deviceCall } = this.props;
        const globals = [
            EVENTS.BUTTON_REQUEST__PROTECT_CALL,
            EVENTS.BUTTON_REQUEST__WIPE_DEVICE,
            EVENTS.BUTTON_REQUEST__RESET_DEVICE,
            EVENTS.BUTTON_REQUEST__MNEMONIC_WORD_COUNT,
            EVENTS.BUTTON_REQUEST__MNEMONIC_INPUT,
            EVENTS.BUTTON_REQUEST__OTHER,
        ];
        return deviceInteraction && globals.includes(deviceInteraction.name) && deviceCall.isProgress;
    }

    isStepResolved(stepId: AnyStepId) {
        return Boolean(this.props.steps.find((step: Step) => step.id === stepId).resolved);
    }

    shouldDisplaySkipSecurity() {
        const displayOn = [STEP.ID_BACKUP_STEP, STEP.ID_SET_PIN_STEP, STEP.ID_NAME_STEP, STEP.ID_BOOKMARK_STEP, STEP.ID_NEWSLETTER_STEP];
        return displayOn.includes(this.props.activeStepId);
    }

    shouldDisplayGoBack() {
        const doNotDisplayOn = [STEP.ID_WELCOME_STEP, STEP.ID_FINAL_STEP];
        return !doNotDisplayOn.includes(this.props.activeStepId);
    }

    render() {
        const {
            onboardingActions,
            connectActions,
            recoveryActions,
            firmwareUpdateActions,
            newsletterActions,
            selectedModel,
            transport,
            activeStepId,
            activeSubStep,
            device,
            deviceCall,
            deviceInteraction,
            uiInteraction,
            steps,
            fetchCall,
            recovery,
            firmwareUpdate,
            newsletter,
            connectError,
        } = this.props;
        // todo: refactor model to selectedModel;
        const model = selectedModel;

        // todo: solve how to handle cases we fail to init connect;
        const errorStates = this.handleErrors();
        // todo: wrap this up to separete component probably
        let TrezorActionText;
        if (activeStepId === STEP.ID_START_STEP) {
            // StartStep call require custom text
            TrezorActionText = () => <P>Complete action on your device. By clicking continue you agree with <Link target="_blank" href={TOS_URL}>Terms of services</Link></P>;
        } else {
            TrezorActionText = () => <P>Complete action on your device.</P>;
        }

        return (
            <WrapperOutside
                animate={![STEP.ID_WELCOME_STEP, STEP.ID_FINAL_STEP].includes(activeStepId)}
            >
                <WrapperInside isGlobalInteraction={this.isGlobalInteraction()}>
                    {
                        errorStates.length > 0 && (
                            <UnexpectedStateOverlay>
                                <UnexpectedState
                                    caseType={errorStates[0]}
                                    model={model}
                                    connectActions={connectActions}
                                    onboardingActions={onboardingActions}
                                    uiInteraction={uiInteraction}
                                />
                            </UnexpectedStateOverlay>
                        )
                    }
                    <ProgressStepsSlot>
                        { this.getStep(activeStepId).title && this.getStep(activeStepId).title !== 'Basic setup' && (
                            <ProgressStepsWrapper>
                                <ProgressSteps
                                    steps={steps}
                                    activeStep={this.getStep(activeStepId)}
                                    onboardingActions={onboardingActions}
                                    isDisabled={deviceCall.isProgress}
                                />
                            </ProgressStepsWrapper>
                        )}
                    </ProgressStepsSlot>
                    <ComponentWrapper>
                        {
                            this.isGlobalInteraction() && (
                                <TrezorActionOverlay>
                                    <Prompt model={model} size={100}>
                                        <TrezorActionText />
                                    </Prompt>
                                </TrezorActionOverlay>
                            )
                        }

                        <CSSTransition in={activeStepId === STEP.ID_WELCOME_STEP} {...TRANSITION_PROPS}>
                            <WelcomeStep
                                onboardingActions={onboardingActions}
                                transport={transport}
                                connectError={connectError}
                            />
                        </CSSTransition>

                        <CSSTransition in={activeStepId === STEP.ID_SELECT_DEVICE_STEP} {...TRANSITION_PROPS}>
                            <SelectDeviceStep
                                model={model}
                                onboardingActions={onboardingActions}
                                device={device}
                            />
                        </CSSTransition>

                        <CSSTransition in={activeStepId === STEP.ID_UNBOXING_STEP} {...TRANSITION_PROPS}>
                            <HologramStep
                                onboardingActions={onboardingActions}
                                model={model}
                                activeSubStep={activeSubStep}
                                device={device}
                            />
                        </CSSTransition>

                        <CSSTransition in={activeStepId === STEP.ID_BRIDGE_STEP} {...TRANSITION_PROPS}>
                            <BridgeStep
                                onboardingActions={onboardingActions}
                                activeSubStep={activeSubStep}
                                transport={transport}
                            />
                        </CSSTransition>

                        <CSSTransition in={activeStepId === STEP.ID_CONNECT_STEP} {...TRANSITION_PROPS}>
                            <ConnectStep
                                onboardingActions={onboardingActions}
                                connectActions={connectActions}
                                model={model}
                                device={device}
                                deviceCall={deviceCall}
                                activeSubStep={activeSubStep}
                                isResolved={this.isStepResolved(STEP.ID_CONNECT_STEP)}
                            />
                        </CSSTransition>

                        <CSSTransition in={activeStepId === STEP.ID_FIRMWARE_STEP} {...TRANSITION_PROPS}>
                            <FirmwareStep
                                onboardingActions={onboardingActions}
                                firmwareUpdateActions={firmwareUpdateActions}
                                device={device}
                                fetchCall={fetchCall}
                                deviceCall={deviceCall}
                                firmwareUpdate={firmwareUpdate}
                            />
                        </CSSTransition>

                        <CSSTransition in={activeStepId === STEP.ID_START_STEP} {...TRANSITION_PROPS}>
                            <StartStep
                                onboardingActions={onboardingActions}
                                connectActions={connectActions}
                                deviceCall={deviceCall}
                                isResolved={this.isStepResolved(STEP.ID_START_STEP)}
                                activeSubStep={activeSubStep}
                                recoveryActions={recoveryActions}
                                recovery={recovery}
                                device={device}
                                uiInteraction={uiInteraction}

                            />
                        </CSSTransition>

                        <CSSTransition in={activeStepId === STEP.ID_SECURITY_STEP} {...TRANSITION_PROPS}>
                            <SecurityStep
                                onboardingActions={onboardingActions}
                            />
                        </CSSTransition>

                        <CSSTransition in={activeStepId === STEP.ID_BACKUP_STEP} {...TRANSITION_PROPS}>
                            <BackupStep
                                onboardingActions={onboardingActions}
                                connectActions={connectActions}
                                device={device}
                                deviceCall={deviceCall}
                                deviceInteraction={deviceInteraction}
                                activeSubStep={activeSubStep}
                            />
                        </CSSTransition>

                        <CSSTransition in={activeStepId === STEP.ID_SET_PIN_STEP} {...TRANSITION_PROPS}>
                            <SetPinStep
                                device={device}
                                onboardingActions={onboardingActions}
                                connectActions={connectActions}
                                deviceCall={deviceCall}
                                uiInteraction={uiInteraction}
                                activeSubStep={activeSubStep}
                            />
                        </CSSTransition>

                        <CSSTransition in={activeStepId === STEP.ID_NAME_STEP} {...TRANSITION_PROPS}>
                            <NameStep
                                onboardingActions={onboardingActions}
                                connectActions={connectActions}
                                deviceCall={deviceCall}
                                device={device}
                            />
                        </CSSTransition>

                        <CSSTransition in={activeStepId === STEP.ID_NEWSLETTER_STEP} {...TRANSITION_PROPS}>
                            <NewsletterStep
                                connectActions={connectActions}
                                newsletterActions={newsletterActions}
                                newsletter={newsletter}
                                device={device}
                                fetchCall={fetchCall}
                            />
                        </CSSTransition>

                        <CSSTransition in={activeStepId === STEP.ID_BOOKMARK_STEP} {...TRANSITION_PROPS}>
                            <BookmarkStep
                                connectActions={connectActions}
                                device={device}
                            />
                        </CSSTransition>

                        <CSSTransition in={activeStepId === STEP.ID_FINAL_STEP} {...TRANSITION_PROPS}>
                            <FinalStep />
                        </CSSTransition>
                    </ComponentWrapper>
                </WrapperInside>
            </WrapperOutside>

        );
    }
}

// Onboarding.propTypes = {
//     // connectReducer
//     device: types.device,
//     prevDeviceId: types.prevDeviceId,
//     transport: types.transport,
//     deviceCall: types.deviceCall,
//     deviceInteraction: types.deviceInteraction,
//     uiInteraction: types.uiInteraction,
//     connectError: types.connectError,
//     connectActions: types.connectActions,

//     // onboardingReducer
//     selectedModel: types.selectedModel,
//     activeStepId: types.activeStepId,
//     activeSubStep: types.activeSubStep,
//     steps: types.steps,
//     onboardingActions: types.onboardingActions,

//     // newsletterReducer
//     newsletter: types.newsletter,
//     newsletterActions: types.newsletterActions,

//     // recoveryReducer
//     recovery: types.recovery,
//     recoveryActions: types.recoveryActions,

//     // firmwareUpdateReducer
//     firmwareUpdate: types.firmwareUpdate,
//     firmwareUpdateActions: types.firmwareUpdateActions,

//     // fetchReducer
//     fetchCall: types.fetchCall,
// };

export default hot(Onboarding);