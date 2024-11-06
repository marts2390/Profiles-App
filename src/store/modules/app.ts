import {
  createReducer,
  createAsyncThunk,
  isAnyOf,
  createAction,
} from '@reduxjs/toolkit';
import delivery from '@src/delivery';
import { Dispatch } from '@src/store';
import { FormData } from '@src/types/FormData';
import { User } from '@src/types/User';
import { addNotification } from './notifications';

/**
 * Type declarations
 * ---------------------------------------------------------------------
 */

export interface StateProps {
  users: User[];
  createLoading: boolean;
  usersLoading: boolean;
  error: boolean;
}

/**
 * Initial State
 * ---------------------------------------------------------------------
 */

export const initialState: StateProps = {
  users: [],
  createLoading: false,
  usersLoading: false,
  error: false,
};

export const getUsers = createAsyncThunk<Partial<StateProps>>(
  'app/get-users',
  async () => {
    let data: StateProps['users'] = initialState.users;

    const { value } = await delivery.Actions.getUsers();

    if (value) {
      data = value;
    }

    return {
      users: data,
    };
  },
);

export const createUser = createAsyncThunk<
  Partial<StateProps>,
  {user: FormData},
  {dispatch: Dispatch}
>('app/create-user', async ({ user }, { dispatch }) => {
  let error: StateProps['error'] = initialState.error;

  const { hasError, errorData } = await delivery.Actions.createUser(user);

  if (!hasError) {
    dispatch(addNotification('success', 'New user created!'));
  }

  if (hasError) {
    error = hasError;

    errorData.messages.forEach((msg) => {
      dispatch(
        addNotification(
          'error',
          msg || 'Oops something went wrong, please try again',
        ),
      );
    });
  }

  return {
    error: error,
  };
});

export const removeUser = createAction('app/remove-user', (id: number) => ({
  payload: id,
}));

/**
 * Reducer
 * ---------------------------------------------------------------------
 */

export const reducer = createReducer<StateProps>(initialState, (builder) => {
  builder
    .addCase(removeUser, (state, action) => ({
      ...state,
      users: state.users.filter((item) => item.id !== action.payload),
    }))
    .addMatcher(
      isAnyOf(getUsers.fulfilled, createUser.fulfilled),
      (state, action) => ({
        ...state,
        ...action.payload,
      }),
    )
    // Loading start
    .addMatcher(isAnyOf(createUser.pending), (state) => ({
      ...state,
      createLoading: true,
    }))
    .addMatcher(isAnyOf(getUsers.pending), (state) => ({
      ...state,
      usersLoading: true,
    }))
    // Loading end
    .addMatcher(isAnyOf(createUser.rejected, createUser.fulfilled), (state) => ({
      ...state,
      createLoading: false,
    }))
    .addMatcher(isAnyOf(getUsers.rejected, getUsers.fulfilled), (state) => ({
      ...state,
      usersLoading: false,
    }));
});
