import { X } from "lucide-react";
export default function CreateNote({ clickHandler, dataHandler }) {
  async function createNote() {
    const title = document.querySelector("#title").value;
    const category = document.querySelector("#category").value;
    const content = document.querySelector("#content").value;
    try {
      const response = await fetch("https://note-app-two-delta.vercel.app/note/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          category,
        }),
        "credentials":"include"
      });
      const json=await response.json();
      const newNote=json.noteData;
      console.log(newNote);
      if (response.status === 201) {
        dataHandler((prev) => [...prev, newNote]);
        clickHandler(clickHandler(false));
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="create-note">
      <div className="create-note-wrapper">
        <X className="close-button" onClick={() => clickHandler(false)} />
        <p className="create-note-part">Title:</p>
        <input type="text" className="create-note-input" id="title" />
        <p className="create-note-part">Content:</p>
        <textarea name="" className="create-note-input" id="content"></textarea>
        <p className="create-note-part">Category:</p>
        <input type="text" className="create-note-input" id="category" />
        <button className="create-note-button" onClick={createNote}>
          Create
        </button>
      </div>
    </div>
  );
}
