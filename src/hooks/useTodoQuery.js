import { useQuery } from "@tanstack/react-query";
import { todoApi } from "../api/todos";

const useTodoQuery = (id) => {
  const fetchDetail = async () => {
    const response = await todoApi(`/todos/${id}`);
    return response.data;
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["todo", id],
    queryFn: fetchDetail,
  });
  return { data, isPending, error };
};
export default useTodoQuery;
