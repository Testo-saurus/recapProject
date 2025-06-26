import { useState } from "react";
import "./Color.css";
import EditColorForm from "../edit-color-form/EditColorForm";

export default function Color({ color, onDelete, onUpdate }) {
  const [isEditOpen, setEditOpen] = useState(false);

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>

      <button
        onClick={() => {
          onDelete(color.id);
        }}
      >
        Delete
      </button>

      <button
        onClick={() => {
          setEditOpen(!isEditOpen);
          console.log(isEditOpen);
        }}
      >
        Edit
      </button>

      {/* conditinally rendering of edit section */}

      {isEditOpen ? (
        <EditColorForm
          onUpdate={(updatedColor) => {
            onUpdate(updatedColor);
            setEditOpen(false); // Close form after update
          }}
          isEditOpen={isEditOpen}
          color={color}
        />
      ) : (
        ""
      )}
    </div>
  );
}
