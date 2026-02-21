import { useState } from "react";
import FloatingLines from "../components/FloatingLines";
import Header from "../components/Header";
import Note from "../components/Note";
import CreateNote from "../components/CreateNote";
import { useEffect } from "react";

export default function DashBoardPage() {
  const [data, setData] = useState([]);
  const [isPopOpen, setisPopOpen] = useState(false);
  // useEffect hook
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/dashboard", {
        method: "GET",
        credentials: "include",
      });
      const json = await response.json();
      console.log(json);
      const array = json.data;
      setData([...data, ...array]);
    })();
  }, []);

  return (
    <>
      <FloatingLines
        lineCount={5}
        animationSpeed={3}
        linesGradient={["09637E", "088395", "7AB2B2", "EBF4F6"]}
        enabledWaves={["middle"]}
        lineDistance={10}
      />
      <Header />
      <button
        class="create-button"
        role="button"
        onClick={() => setisPopOpen(true)}
      >
        <span class="text">Create Note</span>
      </button>
      {isPopOpen && (
        <CreateNote clickHandler={setisPopOpen} dataHandler={setData} />
      )}
      <div className="note-container">
        {data.map(({ _id, title, content, category }) => {
          return (
            <Note
              key={crypto.randomUUID()}
              id={_id}
              title={title}
              content={content}
              category={category}
              data={data}
              dataHandler={setData}
            />
          );
        })}
      </div>
    </>
  );
}
