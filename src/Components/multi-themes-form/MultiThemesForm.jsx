import { useState } from "react";
import { initialColors } from "../../lib/colors";
export default function MultiThemesForm() {
  const initalThemesArr = [
    {
      name: "Default",
      id: "d1",
      colors: [initialColors],
    },
    {
      name: "Default",
      id: "d2",
      colors: [initialColors],
    },
  ];

  const [themesArr, setThemesArr] = useState(initalThemesArr);

  return (
    <form>
      <select name="themeSelect" id="">
        {themesArr.map((theme) => (
          <option key={theme.id} value={theme.name}>
            {theme.name}
          </option>
        ))}
      </select>
    </form>
  );
}

// user clicks dropdown and selects theme -->
