export default function Note(props) {
  const { title, content, category, tags } = props;
  return (
    <div className="Note">
      <p className="note-part">Title:</p>
      <p>{title}</p>
      <p className="note-part">Content:</p>
      <p>{content}</p>
      <p className="note-part">Category:</p>
      <p>{category}</p>
      <p className="note-part">Tags:</p>
      <p>{tags.join(' ')}</p>
    </div>
  );
}
