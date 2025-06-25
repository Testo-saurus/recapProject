import { useState } from "react";

export default function ColorForm({ onAddColor }) {
  const [hexValue, setHexValue] = useState("");

  const [contrastTextValue, setContrastTextValue] = useState("");

  function handleContrastTextChange(e) {
    setContrastTextValue(e.target.value);

    console.log(contrastTextValue);
  }

  function handleHexChange(e) {
    setHexValue(e.target.value);

    console.log(hexValue);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const dataObject = Object.fromEntries(data.entries());

    onAddColor(dataObject);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="role">Role </label>
        <input type="text" name="role" id="" placeholder="some color" />
      </div>

      <div>
        <label htmlFor="hex">Hex </label>
        <input
          type="text"
          name="hex"
          id=""
          placeholder="#123456"
          value={hexValue}
        />
        <input type="color" name="hexPicker" id="" onChange={handleHexChange} />
      </div>

      <div>
        <label htmlFor="contrastText">Contrast Text </label>
        <input
          type="text"
          name="contrastText"
          id=""
          placeholder="#ffsfff"
          value={contrastTextValue}
        />
        <input
          type="color"
          name="contrastTextPicker"
          id=""
          onChange={handleContrastTextChange}
        />
      </div>
      <button type="submit">Add Color</button>
    </form>
  );
}
