import { useState, useEffect } from "react";

import MultiThemesForm from "../../multi-themes-form/MultiThemesForm";

export default function ColorForm({ onAddColor, isEditOpen, colorToEdit }) {
  const [hexValue, setHexValue] = useState(colorToEdit?.hex || "");
  const [contrastTextValue, setContrastTextValue] = useState(
    colorToEdit?.contrastText || ""
  );
  const [roleValue, setRoleValue] = useState(colorToEdit?.role || "");

  // Update form values when colorToEdit changes
  // why useEffect? Without this useEffect, if you tried to edit multiple colors in sequence, the form would not properly update to display each new color's properties.
  useEffect(() => {
    if (colorToEdit) {
      setHexValue(colorToEdit.hex || "");
      setContrastTextValue(colorToEdit.contrastText || "");
      setRoleValue(colorToEdit.role || "");
    }
  }, [colorToEdit]);

  function handleContrastTextChange(e) {
    setContrastTextValue(e.target.value);
  }

  function handleHexChange(e) {
    setHexValue(e.target.value);
  }

  function handleRoleChange(e) {
    setRoleValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const dataObject = Object.fromEntries(data.entries());

    onAddColor(dataObject);
  }

  return (
    <>
      <MultiThemesForm />

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="role">Role </label>
          <input
            type="text"
            name="role"
            id="role"
            placeholder="some color"
            value={roleValue}
            onChange={handleRoleChange}
          />
        </div>

        <div>
          <label htmlFor="hex">Hex </label>
          <input
            type="text"
            name="hex"
            id="hex"
            placeholder="#123456"
            value={hexValue}
            onChange={handleHexChange}
          />
          <input
            type="color"
            name="hexPicker"
            id="hexPicker"
            value={hexValue}
            onChange={handleHexChange}
          />
        </div>

        <div>
          <label htmlFor="contrastText">Contrast Text </label>
          <input
            type="text"
            name="contrastText"
            id="contrastText"
            placeholder="#ffffff"
            value={contrastTextValue}
            onChange={handleContrastTextChange}
          />
          <input
            type="color"
            name="contrastTextPicker"
            id="contrastTextPicker"
            value={contrastTextValue}
            onChange={handleContrastTextChange}
          />
        </div>
        <button type="submit">
          {isEditOpen ? "Update Color" : "Add Color"}
        </button>
      </form>
    </>
  );
}
