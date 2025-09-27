import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import { LastFmProvider } from './contexts/LastFmContext';
import { theme } from './components/theme';
import SearchForm from './components/SearchForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LastFmProvider>
        <Container maxWidth="md">
          <Box sx={{ py: 4 }}>
            <SearchForm />
            <Dashboard />
          </Box>
        </Container>
      </LastFmProvider>
    </ThemeProvider>
  );
}

export default App;
