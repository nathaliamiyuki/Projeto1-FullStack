import React from 'react';
import { Box, Fade } from '@mui/material';
import { useLastFm } from '../contexts/LastFmContext';
import UserProfile from './UserProfile';
import RecentTrack from './RecentTrack';
import TopArtists from './TopArtists';

const Dashboard = () => {
  const { hasSearched, user } = useLastFm();

  if (!hasSearched || !user) return null;

  return (
    <Fade in={true} timeout={600}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <UserProfile />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <RecentTrack />
          </Box>

          <Box sx={{ flex: 1 }}>
            <TopArtists />
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default Dashboard;
