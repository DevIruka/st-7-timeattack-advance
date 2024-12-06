import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "../api/todos";

const useAddtodoQuery = () => {
  const queryClient = useQueryClient();

  const { mutate: addTodo } = useMutation({
    mutationFn: async ({ title, contents }) => {
      const response = await todoApi.post("/todos", {
        id: Date.now().toString(),
        title,
        contents,
        isCompleted: false,
        createdAt: Date.now(),
      });
      queryClient.invalidateQueries();
    },
  });
  return { addTodo };
};
export default useAddtodoQuery;
