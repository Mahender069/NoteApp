export default function CreateNote({handleCreate}) {
  return (
    <div className="create-note">
      <div className="create-note-wrapper">
        <p className="create-note-part">Title:</p>
        <input type="text" className="create-note-input" />
        <p className="create-note-part">Content:</p>
        <textarea name="" id="" className="create-note-input" ></textarea>
        <p className="create-note-part">Category:</p>
        <input type="text"  className="create-note-input" />
        <p className="create-note-part">Tags:</p>
        <input type="text"  className="create-note-input" />
        <button className="create-note-button" onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
}
