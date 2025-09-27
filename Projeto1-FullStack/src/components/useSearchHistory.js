import { useState, useEffect } from 'react';

export function useSearchHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('lastfm-search-history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.warn('Erro ao carregar histórico de buscas:', error);
    }
  }, []);

  const addToHistory = (username, success) => {
    const newItem = {
      username: username.trim(),
      timestamp: Date.now(),
      success
    };

    setHistory(prevHistory => {

      const filteredHistory = prevHistory.filter(item => item.username !== newItem.username);
      
      const updatedHistory = [newItem, ...filteredHistory].slice(0, 10); 

      try {
        localStorage.setItem('lastfm-search-history', JSON.stringify(updatedHistory));
      } catch (error) {
        console.warn('Erro ao salvar histórico de buscas:', error);
      }
      
      return updatedHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('lastfm-search-history');
    } catch (error) {
      console.warn('Erro ao limpar histórico de buscas:', error);
    }
  };

  const removeFromHistory = (username) => {
    setHistory(prevHistory => {
      const updatedHistory = prevHistory.filter(item => item.username !== username);
      
      try {
        localStorage.setItem('lastfm-search-history', JSON.stringify(updatedHistory));
      } catch (error) {
        console.warn('Erro ao atualizar histórico de buscas:', error);
      }
      
      return updatedHistory;
    });
  };

  const getStats = () => {
    const total = history.length;
    const successful = history.filter(item => item.success).length;
    const failed = total - successful;
    
    return {
      total,
      successful,
      failed,
      successRate: total > 0 ? (successful / total) * 100 : 0
    };
  };

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
    getStats
  };
}
