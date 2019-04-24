import React from 'react';
import {
    H4, Button, Link, ButtonNotification,
} from 'trezor-ui-components';
import { FormattedMessage } from '@dragonraider5/react-intl';

import { SUPPORT_URL } from 'config/urls';
import colors from 'config/colors';
import types from 'config/types';
import { ID } from 'constants/steps';
import { ControlsWrapper } from 'components/Wrapper';
import Text from 'components/Text';
import l10nCommonMessages from 'support/commonMessages';
import l10nMessages from './TroubleshootInitialized.messages';

const TroubleshootInitialized = ({
    device, connectActions, activeSubStep, onboardingActions,
}) => (
    <React.Fragment>
        {
            activeSubStep === null && (
                <React.Fragment>
                    <H4>
                        <FormattedMessage {...l10nMessages.TR_DEVICE_IS_INITIALIZED} />
                    </H4>
                    <Text>
                        {
                            device.features.label && (
                                <FormattedMessage
                                    {...l10nMessages.TR_DEVICE_LABEL}
                                    values={{ label: device.features.label }}
                                />
                            )
                        }
                        {' '}
                        <FormattedMessage
                            {...l10nMessages.TR_DEVICE_FIRMWARE_VERSION}
                            values={{
                                firmware: `${device.features.major_version}.${device.features.minor_version}.${device.features.patch_version}`,
                            }}
                        />
                    </Text>
                    <ControlsWrapper>
                        <Button
                            onClick={() => onboardingActions.goToSubStep('user-worked-before')}
                            isWhite
                        >
                            <FormattedMessage {...l10nMessages.TR_USER_HAS_WORKED_WITH_THIS_DEVICE} />
                        </Button>
                        <Button
                            onClick={() => onboardingActions.goToSubStep('is-brand-new')}
                            isWhite
                        >
                            <FormattedMessage {...l10nMessages.TR_USER_HAS_NOT_WORKED_WITH_THIS_DEVICE} />
                        </Button>
                    </ControlsWrapper>
                </React.Fragment>
            )
        }

        {
            activeSubStep === 'user-worked-before' && (
                <React.Fragment>
                    <H4>
                        <FormattedMessage {...l10nMessages.TR_USER_HAS_WORKED_WITH_THIS_DEVICE} />
                    </H4>
                    <Text>
                        <FormattedMessage {...l10nMessages.TR_INSTRUCTION_TO_SKIP_OR_WIPE} />
                    </Text>
                    <Text style={{ color: colors.warning }}>
                        <FormattedMessage {...l10nMessages.TR_WIPE_WARNING} />
                    </Text>
                    <ControlsWrapper>
                        <Button
                            onClick={() => onboardingActions.goToSubStep(null)}
                            isWhite
                        >
                            <FormattedMessage {...l10nCommonMessages.TR_BACK} />
                        </Button>
                        <ButtonNotification
                            onClick={() => connectActions.wipeDevice()}
                            type="warning"
                        >
                            <FormattedMessage {...l10nCommonMessages.TR_WIPE_DEVICE} />
                        </ButtonNotification>
                        <Button isWhite onClick={() => onboardingActions.goToNextStep(ID.FINAL_STEP)}>
                            <FormattedMessage {...l10nCommonMessages.TR_SKIP_ALL} />
                        </Button>
                    </ControlsWrapper>
                </React.Fragment>
            )
        }

        {
            activeSubStep === 'is-brand-new' && (
                <React.Fragment>
                    <H4>
                        <FormattedMessage {...l10nMessages.TR_USER_HAS_NOT_WORKED_WITH_THIS_DEVICE} />
                    </H4>
                    <Text>
                        <FormattedMessage {...l10nMessages.TR_USER_HAS_NOT_WORKED_WITH_THIS_DEVICE_INSTRUCTIONS} />
                    </Text>
                    <ControlsWrapper>
                        <Button
                            onClick={() => onboardingActions.goToSubStep(null)}
                            isWhite
                        >
                            <FormattedMessage {...l10nCommonMessages.TR_BACK} />
                        </Button>
                        <Link href={SUPPORT_URL}>
                            <Button style={{ width: '100%' }}>
                                <FormattedMessage {...l10nCommonMessages.TR_CONTACT_SUPPORT} />
                            </Button>
                        </Link>
                    </ControlsWrapper>
                </React.Fragment>
            )
        }
    </React.Fragment>
);


TroubleshootInitialized.propTypes = {
    device: types.device,
    activeSubStep: types.activeSubStep,
    connectActions: types.connectActions,
    onboardingActions: types.onboardingActions,
};

export default TroubleshootInitialized;