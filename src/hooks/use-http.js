import { useCallback, useReducer } from 'react';

function httpReducer(state, action) {
  if (action.type === 'SEND') {
    return {
      status: 'pending',
      data: null,
      error: null,
    };
  }

  if (action.type === 'SUCCESS') {
    return {
      status: 'completed',
      data: action.responseData,
      error: null,
    };
  }

  if (action.type === 'ERROR') {
    return {
      status: 'completed',
      data: null,
      error: action.errorMessage,
    };
  }

  return state;
}

function useHttp(requestFunction, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? 'pending' : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async requestData => {
      dispatch({ type: 'SEND' });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: 'SUCCESS', responseData: responseData });
      } catch (error) {
        dispatch({
          type: 'ERROR',
          errorMessage: error.message || 'Something went wrong!',
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
