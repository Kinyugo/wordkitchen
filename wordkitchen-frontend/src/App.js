import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme/theme";
import Editor from "./pages/Editor";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Editor />
      </div>
    </ThemeProvider>
  );
}

export default App;
