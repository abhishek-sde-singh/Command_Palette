import React, { useEffect, useState } from "react";

const CommandPalette = () => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const [items] = useState([
    { label: "Open File", action: () => console.log("Open File") },
    { label: "Save File", action: () => console.log("Save File") },
    { label: "Find in Page", action: () => console.log("Find in Page") },
    {
      label: "Toggle Fullscreen",
      action: () => console.log("Toggle Fullscreen"),
    },
  ]);

  const [filteredList, setFilteredList] = useState(items);

  const handleChange = (value) => {
    setInput(value);
    const newfilteredList = items.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(newfilteredList);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "k") {
        setShow((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className="container"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShow(false);
        }
      }}
    >
      {show && (
        <div className="palette">
          <input
            type="text"
            placeholder="search something"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          />
          <ul>
            {filteredList.map((item) => {
              return (
                <li
                  key={item.label}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setInput(item.label);
                    item.action();
                  }}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CommandPalette;
