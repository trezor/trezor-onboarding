import React from 'react';
import styled from 'styled-components';
import { Link, P, Prompt } from 'trezor-ui-components';
import { CSSTransitionGroup } from 'react-transition-group';

import types from 'config/types';
import colors from 'config/colors';
import { SM } from 'config/breakpoints';
import { TOS_URL } from 'config/urls';
import * as EVENTS from 'actions/constants/events';
import ProgressSteps from 'components/ProgressSteps';

import { ID } from 'views/onboarding/constants/steps';
import { getFnForRule } from 'utils/rules';

import UnexpectedState from 'views/onboarding/components/UnexpectedState';

import BackupStep from 'views/onboarding/steps/Backup';
import BookmarkStep from 'views/onboarding/steps/Bookmark';
import BridgeStep from 'views/onboarding/steps/Bridge';
import FinalStep from 'views/onboarding/steps/Final';
import FirmwareStep from 'views/onboarding/steps/Firmware';
import HologramStep from 'views/onboarding/steps/Hologram';
import NewsletterStep from 'views/onboarding/steps/Newsletter';
import SelectDeviceStep from 'views/onboarding/steps/SelectDevice';
import SetPinStep from 'views/onboarding/steps/Pin';
import StartStep from 'views/onboarding/steps/Start';
import SecurityStep from 'views/onboarding/steps/Security';
import WelcomeStep from 'views/onboarding/steps/Welcome';
import NameStep from 'views/onboarding/steps/Name';
import ConnectStep from 'views/onboarding/steps/Connect';
import RecoveryStep from 'views/onboarding/steps/Recovery';

const WRAPPER_HEIGHT = 80;
const MAIN_HEIGHT = 80;
const FOOTER_HEIGHT = 5;
const BORDER_RADIUS = 12;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: ${colors.white};
    border-radius: ${BORDER_RADIUS}px;
    width: 95vw;
    margin: 20px auto 0 auto;
    min-height: ${WRAPPER_HEIGHT}vh;

    @media only screen and (min-width: ${SM}px) {
        width: 80vw;
        margin: auto;
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
    height: 70px;
`;

const ComponentWrapper = styled(CSSTransitionGroup)`
    display: flex;
    flex-direction: column;
`;

// todo: resolve footer / navigation
const FooterWrapper = styled.div`
    padding: 3px 3% 3px 3%;
`;

const FooterDivider = styled.div`
    height: .4px;
    background-color: ${colors.gray};
    width: 100%;
    margin-top: 3px;
    margin-bottom: 3px;
`;

const FooterLinks = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between; 
`;

const FooterLink = styled.a`
    display: inline;
    white-space: nowrap;
    color: ${colors.gray};
    &:hover,
    &:active {
        color: ${colors.grayDark};
    }
`;

const TrezorActionOverlay = styled.div`
    position: absolute;
    margin-top: auto;
    margin-bottom: auto;
    width: 100%;
    height: ${FOOTER_HEIGHT + MAIN_HEIGHT}%;
    display: flex;
    justify-content: center;
    background-color: ${colors.white};
    z-index: 1;
    border-radius: ${BORDER_RADIUS}px;
`;

// todo: UnexpectedStateOverlay might end up having the same attrs as TrezorActionOverlay, consider merge
const UnexpectedStateOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${colors.white};
    z-index: 1000;
`;

class Onboarding extends React.PureComponent {
    getStep(activeStepId) {
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
        } = this.props;

        if (!this.getStep(activeStepId).allowedDeviceStates) {
            return [];
        }

        const errorStates = [];
        this.getStep(activeStepId).allowedDeviceStates.forEach((state) => {
            const fn = getFnForRule(state);
            if (fn({ device, prevDeviceId }) === false) {
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

    shouldDisplaySkipSecurity() {
        const displayOn = [ID.BACKUP_STEP, ID.SET_PIN_STEP, ID.NAME_STEP, ID.BOOKMARK_STEP, ID.NEWSLETTER_STEP];
        return displayOn.includes(this.props.activeStepId);
    }

    shouldDisplayGoBack() {
        const doNotDisplayOn = [ID.WELCOME_STEP, ID.FINAL_STEP];
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
        } = this.props;

        // model is either selected by user or later overrided by connected device
        const model = Number(device && device.features ? device.features.major_version : selectedModel) || 1;

        // todo: solve how to handle cases we fail to init connect;
        const errorStates = this.handleErrors();
        // todo: wrap this up to separete component probably
        let TrezorActionText;
        if (activeStepId === ID.START_STEP) {
            // StartStep call require custom text
            TrezorActionText = () => <P>Complete action on your device. By clicking continue you agree with <Link href={TOS_URL}>Terms of services</Link></P>;
        } else {
            TrezorActionText = () => <P>Complete action on your device.</P>;
        }

        return (
            <Wrapper>
                {
                    errorStates.length > 0 && (
                        <UnexpectedStateOverlay>
                            <UnexpectedState caseType={errorStates[0]} model={model} connectActions={connectActions} />
                        </UnexpectedStateOverlay>
                    )
                }

                <ProgressStepsSlot>
                    { this.getStep(activeStepId).title && this.getStep(activeStepId).title !== 'Basic setup' && (
                        <ProgressStepsWrapper>
                            <ProgressSteps
                                steps={[...new Set(steps.filter(s => s.title).map(s => s.title))]}
                                activeStep={this.getStep(activeStepId)}
                                onboardingActions={onboardingActions}
                            />
                        </ProgressStepsWrapper>
                    )}
                </ProgressStepsSlot>

                <ComponentWrapper
                    component="div"
                    transitionName="step-transition"
                    transitionEnterTimeout={300}
                    transitionLeave={false}
                >

                    <TrezorActionOverlay style={{ display: !this.isGlobalInteraction() ? 'none' : 'flex' }}>
                        <Prompt model={model} size={112}>
                            <TrezorActionText />
                        </Prompt>
                    </TrezorActionOverlay>

                    {/* todo [vladimir]: how to find that I pass props and dont use them in component? any tooling? */}
                    {this.getScreen() === ID.WELCOME_STEP && (
                        <WelcomeStep
                            onboardingActions={onboardingActions}
                            transport={transport}
                        />
                    )}
                    {this.getScreen() === ID.SELECT_DEVICE_STEP && (
                        <SelectDeviceStep
                            deviceCall={deviceCall}
                            onboardingActions={onboardingActions}
                        />
                    )}
                    {this.getScreen() === ID.UNBOXING_STEP && (
                        <HologramStep
                            onboardingActions={onboardingActions}
                            model={model}
                        />
                    )}
                    {this.getScreen() === ID.BRIDGE_STEP && (
                        <BridgeStep
                            onboardingActions={onboardingActions}
                            activeSubStep={activeSubStep}
                            transport={transport}
                        />
                    )}
                    {this.getScreen() === ID.CONNECT_STEP && (
                        <ConnectStep
                            onboardingActions={onboardingActions}
                            connectActions={connectActions}
                            model={model}
                            device={device}
                            deviceCall={deviceCall}
                            activeSubStep={activeSubStep}
                        />
                    )}
                    {this.getScreen() === ID.FIRMWARE_STEP && (
                        <FirmwareStep
                            onboardingActions={onboardingActions}
                            connectActions={connectActions}
                            firmwareUpdateActions={firmwareUpdateActions}
                            device={device}
                            fetchCall={fetchCall}
                            deviceCall={deviceCall}
                            firmwareUpdate={firmwareUpdate}
                        />
                    )}
                    {this.getScreen() === ID.START_STEP && (
                        <StartStep
                            onboardingActions={onboardingActions}
                            connectActions={connectActions}
                            deviceCall={deviceCall}
                        />
                    )}
                    {this.getScreen() === ID.RECOVERY_STEP && (
                        <RecoveryStep
                            onboardingActions={onboardingActions}
                            recoveryActions={recoveryActions}
                            connectActions={connectActions}
                            recovery={recovery}
                            device={device}
                            uiInteraction={uiInteraction}
                            deviceCall={deviceCall}
                            activeSubStep={activeSubStep}
                        />
                    )}
                    {this.getScreen() === ID.SECURITY_STEP && (
                        <SecurityStep
                            onboardingActions={onboardingActions}
                        />
                    )}
                    {this.getScreen() === ID.BACKUP_STEP && (
                        <BackupStep
                            onboardingActions={onboardingActions}
                            connectActions={connectActions}
                            device={device}
                            deviceCall={deviceCall}
                            deviceInteraction={deviceInteraction}
                            activeSubStep={activeSubStep}
                        />
                    )}
                    {this.getScreen() === ID.SET_PIN_STEP && (
                        <SetPinStep
                            device={device}
                            onboardingActions={onboardingActions}
                            connectActions={connectActions}
                            deviceCall={deviceCall}
                            uiInteraction={uiInteraction}
                        />
                    )}
                    {this.getScreen() === ID.NAME_STEP && (
                        <NameStep
                            onboardingActions={onboardingActions}
                            connectActions={connectActions}
                            deviceCall={deviceCall}
                            device={device}
                        />
                    )}
                    {this.getScreen() === ID.NEWSLETTER_STEP && (
                        <NewsletterStep
                            onboardingActions={onboardingActions}
                            connectActions={connectActions}
                            newsletterActions={newsletterActions}
                            newsletter={newsletter}
                            device={device}
                            deviceCall={deviceCall}
                            fetchCall={fetchCall}
                        />
                    )}
                    {this.getScreen() === ID.BOOKMARK_STEP && (
                        <BookmarkStep
                            onboardingActions={onboardingActions}
                            connectActions={connectActions}
                            device={device}
                        />
                    )}
                    {this.getScreen() === ID.FINAL_STEP && (
                        <FinalStep
                            onboardingActions={onboardingActions}
                        />
                    )}

                </ComponentWrapper>
                {/* {
                    (this.shouldDisplayGoBack() || this.shouldDisplaySkipSecurity()) && (
                        <FooterWrapper>
                            <FooterDivider />
                            <FooterLinks>
                                {
                                    this.shouldDisplayGoBack() && (
                                        <FooterLink
                                            style={{ justifySelf: 'flex-start' }}
                                            onClick={() => onboardingActions.goToPreviousStep()}
                                        >
                                    Go back
                                        </FooterLink>
                                    )
                                }

                                {
                                    this.shouldDisplaySkipSecurity() && (
                                        <FooterLink
                                            style={{ justifySelf: 'flex-end' }}
                                        >Skip security
                                        </FooterLink>
                                    )
                                }
                            </FooterLinks>
                        </FooterWrapper>
                    )
                } */}


            </Wrapper>

        );
    }
}

Onboarding.propTypes = types;

export default Onboarding;