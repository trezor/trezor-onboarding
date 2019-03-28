/*
    This is a config file describing order of steps and their configuration.
*/

// todo: probably should be moved to initialState declaration directly

import { ID } from 'views/onboarding/constants/steps';
import * as conditions from 'views/onboarding/utils/conditions';

export default [{
    id: ID.WELCOME_STEP,
}, {
    id: ID.SELECT_DEVICE_STEP,
    title: ID.SELECT_DEVICE_STEP,
}, {
    id: ID.UNBOXING_STEP,
    title: ID.UNBOXING_STEP,
}, {
    id: ID.BRIDGE_STEP,
    title: ID.BRIDGE_STEP,
}, {
    id: ID.CONNECT_STEP,
    title: ID.BRIDGE_STEP,
},
{
    id: ID.FIRMWARE_STEP,
    title: ID.FIRMWARE_STEP,
    // entryConditions: [conditions.DEVICE_IS_NOT_INITIALIZED],
    reconnectConditions: [conditions.IS_SAME_DEVICE],
},
{
    id: ID.START_STEP,
    title: ID.START_STEP,
    entryConditions: [conditions.DEVICE_IS_CONNECTED],
    reconnectConditions: [conditions.IS_SAME_DEVICE],
}, {
    id: ID.RECOVERY_STEP,
    title: ID.START_STEP,
}, {
    id: ID.SECURITY_STEP,
    entryConditions: [conditions.DEVICE_IS_CONNECTED],
    reconnectConditions: [conditions.IS_SAME_DEVICE],
},
{
    id: ID.BACKUP_STEP,
    title: ID.SECURITY_STEP,
    // entryConditions: [conditions.DEVICE_IS_CONNECTED],
    // reconnectConditions: [conditions.IS_SAME_DEVICE],
},

{
    id: ID.SET_PIN_STEP,
    title: ID.SECURITY_STEP,
},
{
    id: ID.NAME_STEP,
    title: ID.SECURITY_STEP,
    entryConditions: [conditions.DEVICE_IS_CONNECTED, conditions.DEVICE_HAS_BACKUP],
    reconnectConditions: [conditions.IS_SAME_DEVICE],
}, {
    id: ID.BOOKMARK_STEP,
    title: ID.SECURITY_STEP,
    entryConditions: [conditions.DEVICE_IS_CONNECTED, conditions.DEVICE_HAS_BACKUP],
    reconnectConditions: [conditions.IS_SAME_DEVICE],
}, {
    id: ID.NEWSLETTER_STEP,
    title: ID.SECURITY_STEP,
    entryConditions: [conditions.DEVICE_IS_CONNECTED, conditions.DEVICE_HAS_BACKUP],
    reconnectConditions: [conditions.IS_SAME_DEVICE],
}, {
    id: ID.FINAL_STEP,
}];