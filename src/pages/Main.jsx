import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import api from "./../axios/api";
import { useState } from "react";
import { Link } from "react-router-dom";

const Main = () => {
  const queryClient = useQueryClient();
  const [todoItem, setTodoItem] = useState("");
  const fetchTodos = async () => {
    const { data } = await api("/todos");
    return data;
  };
  const addTodo = async () => {
    await api.post("/todos", {
      title: todoItem,
      isDone: false,
    });
  };
  const {
    data: todos,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    // staleTime: 1000
  });
  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  if (isPending) {
    return <div>로딩중입니다..</div>;
  }
  if (isError) {
    return <div>데이터 조회 중 오류가 발생했습니다.</div>;
  }
  console.log("data", todos);

  return (
    <div>
      <h3>텐스텍 테스트</h3>
      <Link to="/empty">
        <button>empty페이지로</button>
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
      >
        <input
          type="text"
          value={todoItem}
          onChange={(e) => setTodoItem(e.target.value)}
        />
        <button>추가</button>
      </form>
      <ul>
        {todos?.map((item) => {
          return (
            <li key={item.id}>
              <h4>{item.title}</h4>
              <p>{item.isDone ? "Done" : "Not Done"}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Main;
