const items = [
  { label: "Open File", action: () => console.log("Open File") },
  { label: "Save File", action: () => console.log("Save File") },
  { label: "Find in Page", action: () => console.log("Find in Page") },
  {
    label: "Toggle Fullscreen",
    action: () => console.log("Toggle Fullscreen"),
  },
];

const commandPalette = document.getElementById("commandPalette");
const commandInput = document.getElementById("commandInput");
const commandList = document.getElementById("commandList");

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "k") {
    e.preventDefault();
    commandPalette.style.display = "block";
    commandInput.focus();
    commandInput.value = "";
    renderCommandList(items);
  }
});

function renderCommandList(filteredItems) {
  commandList.innerHTML = "";
  filteredItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item.label;
    listItem.dataset.index = item.label;
    // listItem.addEventListener("click", item.action);
    commandList.appendChild(listItem);
  });
}

commandList.addEventListener("click", (e) => {
  const clickedItem = items.find(
    (item) => e.target.dataset.index === item.label
  );
  if (clickedItem && typeof clickedItem.action === "function") {
    clickedItem.action();
  }
});

commandInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchTerm)
  );
  renderCommandList(filteredItems);
});
