import { useState } from "react";
import { initialColors } from "../../lib/colors";

export default function MultiThemesForm({ onChangeTheme, themesArr }) {
  return (
    <form>
      <select name="themeSelect" id="" onChange={onChangeTheme}>
        {/* onClick is not possible on select-options, thus we need to use onChange on select element itself   */}
        {themesArr?.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
    </form>
  );
}

// to start with i dont want to be able to edit or save a theme. basic functionaly should be, select in a dropdown prefefined thmemes. based on that the ui changes

// user clicks dropdown and selects theme --> theme must me marked as active --> boolean state? --> better activeThemeID state
// how can i  grab that id? onClick={}

// UI UpdaterFunction HandleThemeChange that takes in the activeThemeID as an argument. This fn useses setColorInputs to change the displayed colors.
