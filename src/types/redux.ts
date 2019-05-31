import { ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'redux';
import { FetchActionTypes } from 'types/fetch';
import { FirmwareUpdateActionTypes } from 'types/firmwareUpdate';
import { NewsletterActionTypes } from 'types/newsletter';
import { RecoveryActionTypes } from 'types/recovery';
import { OnboardingActionTypes } from 'types/onboarding';
import * as Connect from 'types/connect';
// todo: ConnectActionTypes
import ReducersState from '../reducers';

export type State = ReturnType<typeof ReducersState>;
// export type State = ReducersState;
export type Action = FetchActionTypes | FirmwareUpdateActionTypes | NewsletterActionTypes | RecoveryActionTypes | OnboardingActionTypes | Connect.ActionTypes;
// export type Dispatch = ThunkDispatch<State, any, Action>;
// export type Dispatch = Dispatch;
export type Dispatch = ThunkDispatch<State, any, Action>;

export type GetState = () => State;
