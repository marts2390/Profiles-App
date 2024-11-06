import { createReducer, createAction } from '@reduxjs/toolkit';
import { Notification, NotificationTypes } from '@src/types/Notifications';

/**
 * Type declarations
 * ---------------------------------------------------------------------
 */

export interface StateProps {
  notifications: Notification[];
}

/**
 * Initial State
 * ---------------------------------------------------------------------
 */

export const initialState: StateProps = {
  notifications: [],
};

export const addNotification = createAction(
  'global-notifications/add-notification',
  (type: NotificationTypes, text: string) => ({
    payload: {
      text,
      type,
    },
  }),
);

export const removeNotification = createAction(
  'global-notifications/remove-notification',
  (id: Notification['id']) => ({
    payload: id,
  }),
);

/**
 * Reducer
 * ---------------------------------------------------------------------
 */

export const reducer = createReducer<StateProps>(initialState, (builder) => {
  builder
    .addCase(addNotification, (state, action) => ({
      notifications: [
        ...state.notifications,
        {
          id: Math.floor(Math.random() * 10000) + 1,
          text: action.payload.text,
          type: action.payload.type,
        },
      ],
    }))
    .addCase(removeNotification, (state, action) => ({
      ...state,
      notifications: state.notifications.filter(
        (item) => item.id !== action.payload,
      ),
    }));
});
