import { Trash2 } from "lucide-react";
export default function Note(props) {
  const { id, title, content, category, data, dataHandler } = props;
  async function deleteNote() {
    const response = await fetch("http://localhost:3000/note/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
      credentials: "include",
    });
    if (response.status === 200) {
      dataHandler((prev) => {
        return prev.filter(({ _id }) => _id !== id);
      });
    }
  }
  return (
    <div className="Note">
      <Trash2 className="delete-button" onClick={deleteNote} />
      <p className="note-part">Title</p>
      <p>{title}</p>
      <p className="note-part">Content</p>
      <p>{content}</p>
      <p className="note-part">Category</p>
      <p>{category}</p>
    </div>
  );
}
