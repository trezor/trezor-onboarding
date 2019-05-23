import { ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'redux';
import { FetchActionTypes } from 'types/fetch';
import { FirmwareUpdateActionTypes } from 'types/firmwareUpdate';
import { NewsletterActionTypes } from 'types/newsletter';
import { RecoveryActionTypes } from 'types/recovery';
import { OnboardingActionTypes } from 'types/onboarding';
// todo: ConnectActionTypes
import ReducersState from '../reducers';

export type State = ReturnType<typeof ReducersState>;
export type Action = FetchActionTypes | FirmwareUpdateActionTypes | NewsletterActionTypes | RecoveryActionTypes | OnboardingActionTypes;
// export type Dispatch = ThunkDispatch<State, any, Action>;
export type Dispatch = Dispatch;
export type ThunkDispatch = ThunkDispatch<any, any, any>;
export type GetState = () => State;
