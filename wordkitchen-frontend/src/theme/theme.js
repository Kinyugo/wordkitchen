import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// JSON file cotaining the theme definition
import themeDefinition from "./theme_2.json";

let theme = createMuiTheme(themeDefinition);
theme = responsiveFontSizes(theme);

export default theme
