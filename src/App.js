import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from './theme';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './scenes/global/Topbar';
import Dashboard from './scenes/dashboard';
import FAQ from './scenes/faq';
import Sidebar from './scenes/global/Sidebar';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Sidebar />
            <Box flexGrow={1} display={'flex'} flexDirection={'column'}>
              <Topbar />
              <Box px={3}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/faq" element={<FAQ />} />
                </Routes>
              </Box>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
