import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../constants";
import { useState } from "react";
import { toast } from "react-toastify";
const CreateTask = () => {
  const [newTodo, setNewTodo] = useState("");

  const queryClient = useQueryClient();

  const { mutate: createTodo } = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(BASE_URL + `/todos`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: newTodo }),
        });
        const data = await res.json();
        if (!res.ok) {
          console.error("error: ", res.message);
        }
        setNewTodo("");
        toast.success("Todo Added successfully");
        return data;
      } catch (err) {
        console.error(err.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <div className="w-full max-auto flex justify-center p-4">
      <div className="min-w-xl">
        <form action="" onSubmit={createTodo} className="flex">
          <input
            type="text"
            placeholder="Enter tasks.."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="border-amber-50 ring-amber-50 bg-amber-50 w-full text-2xl p-4 "
          />
          <button className="">Add</button>
        </form>

        <h1 className="text-center py-10">My Tasks Today</h1>
      </div>
    </div>
  );
};

export default CreateTask;
