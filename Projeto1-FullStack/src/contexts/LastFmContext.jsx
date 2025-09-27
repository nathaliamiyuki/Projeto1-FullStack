import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  loading: false,
  error: null,
  user: null,
  recentTrack: null,
  topArtists: [],
  hasSearched: false
};

function lastFmReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_USER_DATA':
      return {
        ...state,
        user: action.payload.user,
        recentTrack: action.payload.recentTrack,
        topArtists: action.payload.topArtists,
        loading: false,
        error: null,
        hasSearched: true
      };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

const LastFmContext = createContext(undefined);

export const LastFmProvider = ({ children }) => {
  const [state, dispatch] = useReducer(lastFmReducer, initialState);

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setUserData = (user, recentTrack, topArtists) => {
    dispatch({ type: 'SET_USER_DATA', payload: { user, recentTrack, topArtists } });
  };

  const resetState = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  const value = {
    ...state,
    setLoading,
    setError,
    setUserData,
    resetState
  };

  return (
    <LastFmContext.Provider value={value}>
      {children}
    </LastFmContext.Provider>
  );
};

export const useLastFm = () => {
  const context = useContext(LastFmContext);
  if (context === undefined) {
    throw new Error('useLastFm deve ser usado dentro de um LastFmProvider');
  }
  return context;
};
