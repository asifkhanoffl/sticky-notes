const container = document.getElementById("container");
const button = document.getElementById("btn-add");

function getElement() {
  return JSON.parse(localStorage.getItem("Asif") || "[]");
}

getElement().forEach((element) => {
  const textElement = createElement(element.id, element.content);
  container.insertBefore(textElement, button);
});

function createElement(id, content) {
  const textElement = document.createElement("textarea");
  textElement.classList.add("sticky");
  textElement.value = content;
  textElement.placeholder = "Enter your Notes";
  textElement.addEventListener("change", () => {
    updateNotes(id, textElement.value);
  });
  textElement.addEventListener("dblclick", () => {
    const check = confirm("Are you sure to delet");
    if (check) {
      deletFunction(id, textElement);
    }
  });
  return textElement;
}
// add new sticky notes

function addSticky() {
  const notes = getElement();
  const noteObject = {
    id: Math.floor(Math.random() * 100),
    content: "",
  };
  const textElement = createElement(noteObject.id, noteObject.content);
  container.insertBefore(textElement, button);
  notes.push(noteObject);
  saveNotes(notes);
}

function saveNotes(notes) {
  localStorage.setItem("Asif", JSON.stringify(notes));
}
button.addEventListener("click", () => addSticky());
// update sticky notes

function updateNotes(id, content) {
  const notes = getElement();
  const updateElement = notes.filter((note) => note.id == id)[0];
  updateElement.content = content;
  saveNotes(notes);
}

function deletFunction(id, textElement) {
  const notes = getElement().filter((note) => note.id != id);
  saveNotes(notes);
  container.removeChild(textElement);
}

// [{"id":1,"content":"This is sample 1"},{"id":2,"content":"This is sample 2"},{"id":3,"content":"This is sample 3"},{"id":4,"content":"This is sample 4"},{"id":5,"content":"This is sample 5"},{"id":6,"content":"This is sample 6"},{"id":7,"content":"This is sample 7"},{"id":8,"content":"This is sample 8"},{"id":9,"content":"This is sample 9"}]
