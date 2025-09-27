import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useLastFm } from '../contexts/LastFmContext';
import { lastFmApi } from './lastFmApi';
import { useSearchHistory } from './useSearchHistory';

const SearchForm = () => {
  const [username, setUsername] = useState('');
  const [inputError, setInputError] = useState('');
  const inputRef = useRef(null);
  const { setLoading, setError, setUserData, loading, error, resetState } = useLastFm();
  const { addToHistory } = useSearchHistory();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const validateInput = () => {
    if (!username.trim()) {
      setInputError('Por favor, digite um username do Last.fm');
      return false;
    }
    setInputError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInput()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [userInfo, recentTracks, topArtists] = await Promise.all([
        lastFmApi.getUserInfo(username.trim()),
        lastFmApi.getRecentTracks(username.trim(), 1),
        lastFmApi.getTopArtists(username.trim(), 5)
      ]);

      setUserData(userInfo, recentTracks[0] || null, topArtists);
      
      addToHistory(username.trim(), true);
      
      setUsername('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      
      addToHistory(username.trim(), false);
    }
  };

  const handleReset = () => {
    resetState();
    setUsername('');
    setInputError('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        ⋆.˚ Last.fm Mini Dashboard 🎧⭑.ᐟ
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-start' }}>
        <TextField
          inputRef={inputRef}
          fullWidth
          label="Username do Last.fm"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setInputError('');
          }}
          error={!!inputError}
          helperText={inputError}
          disabled={loading}
          placeholder="Digite seu username..."
        />
        
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={<Search />}
          sx={{ minWidth: '120px', height: '56px' }}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>
      </Box>

      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          action={
            <Button color="inherit" size="small" onClick={handleReset}>
              Tentar novamente
            </Button>
          }
        >
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default SearchForm;
