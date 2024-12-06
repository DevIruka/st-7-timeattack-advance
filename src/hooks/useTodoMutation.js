import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "../api/todos";

const useTodoMutation = () => {
  const queryClient = useQueryClient();
  const patchLikes = async ({ id, currentLiked }) => {
    const response = await todoApi.patch(`/todos/${id}`, {
      liked: !currentLiked,
    });
    console.log(response);
  };

  //   const addMutation = useMutation({
  //     mutationFn: (newTodo) => todoApi.post("/todos", newTodo),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["todos"]);
  //     },
  //   });

  const { mutate: addMutation } = useMutation({
    mutationFn: (newTodo) => todoApi.post("/todos", newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const { mutate: likeMutate } = useMutation({
    mutationFn: patchLikes,
    onMutate: ({ id }) => {
      queryClient.cancelQueries();
      queryClient.setQueryData(["todos"], (prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, liked: !todo.liked } : todo
        )
      );
    },
    onError: ({ previousTodos }) =>
      queryClient.setQueryData(["todos"], previousTodos),
    onSettled: () => queryClient.invalidateQueries(),
  });
  return { likeMutate, addMutation };
};
export default useTodoMutation;
