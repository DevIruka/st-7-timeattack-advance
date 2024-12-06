import { useState } from "react";
import useAddtodoQuery from "../hooks/useAddtodoQuery";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const { addTodo } = useAddtodoQuery();

  const handleAddTodo = async (e) => {
    e.preventDefault();
    setTitle("");
    setContents("");
    addTodo({ title, contents });
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="contents">내용:</label>
      <input
        id="contents"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />
      <button type="submit">추가하기</button>
    </form>
  );
}
