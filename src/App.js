import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from './theme';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './scenes/global/Topbar';
import Dashboard from './scenes/dashboard';
import FAQ from './scenes/faq';
import Settings from "./scenes/settings";
import Sidebar from './scenes/global/Sidebar';
import Control from "./scenes/control";
import Training from "./scenes/training";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Box display={'flex'} flexGrow={1} flexDirection={'column'}>
              <Topbar />
              <Box px={3}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/control" element={<Control />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/training" element={<Training />} />
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
