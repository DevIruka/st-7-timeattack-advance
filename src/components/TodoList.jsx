import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useTodoMutation from "../hooks/useTodoMutation";
import useTodosQuery from "../hooks/useTodosQuery";

export default function TodoList() {
  const navigate = useNavigate();
  const { error, isPending, todos } = useTodosQuery();
  const { likeMutate } = useTodoMutation();

  const handleLike = async (id, currentLiked) => {
    const previousTodos = [...todos];
    likeMutate({ id, previousTodos, currentLiked });
  };

  if (isPending) {
    return <div style={{ fontSize: 36 }}>로딩중...</div>;
  }

  if (error) {
    console.error(error);
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <ul style={{ listStyle: "none", width: 250 }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{todo.title}</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => navigate(`/detail/${todo.id}`)}>
              내용보기
            </button>
            {todo.liked ? (
              <FaHeart
                onClick={() => handleLike(todo.id, todo.liked)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <FaRegHeart
                onClick={() => handleLike(todo.id, todo.liked)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
