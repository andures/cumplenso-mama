import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Invitation from "./pages/Invitation";
import Attendees from "./pages/Attendees";

const theme = createTheme({
  palette: {
    primary: { main: "#1a3a2a" },
    secondary: { main: "#c9a84c" },
    background: { default: "#f8f3ec" },
  },
  typography: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Invitation />} />
        <Route path="/asistentes" element={<Attendees />} />
      </Routes>
    </ThemeProvider>
  );
}
