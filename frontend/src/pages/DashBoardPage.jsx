import { useState } from "react";
import FloatingLines from "../components/FloatingLines";
import Header from "../components/Header";
import Note from "../components/Note";
import sampleData from "../sampleData";
import CreateNote from "../components/CreateNote";
import { useEffect } from "react";

export default function DashBoardPage() {
  const [data, setData] = useState(sampleData);
  const [isPopOpen, setisPopOpen] = useState(false);
  // useEffect hook
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/dashboard", {
        method: "GET",
        credentials: "include",
      });
      const json = await response.json();
      const array = json.data;
      setData([...data, json.data]);
    })();
  }, []);


  async function createNote(){
    
  }
  return (
    <>
      <FloatingLines lineCount={10} />
      <Header />
      <button onClick={() => setisPopOpen(true)} className="create-button">
        Create
      </button>
      {isPopOpen && <CreateNote handleCreate={() => setisPopOpen(false)} />}
      <div className="note-container">
        {data.map(({ title, content, category, tags }) => {
          return (
            <Note
              key={crypto.randomUUID()}
              title={title}
              content={content}
              category={category}
              tags={tags}
            />
          );
        })}
      </div>
    </>
  );
}
