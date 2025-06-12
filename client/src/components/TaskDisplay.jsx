import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../constants";
import { useState } from "react";
import { toast } from "react-toastify";
const TaskDisplay = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const queryClient = useQueryClient();
  const { data: Todo } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        const res = await fetch(BASE_URL + "/todos");
        const data = await res.json();

        if (!res.ok) {
          console.error("error fetching todo: ", res.message);
        }
        return data || [];
      } catch (err) {
        console.error(err.message);
      }
    },
  });

  const { mutate: updateTodo, isPending: isUpdating } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async (todo) => {
      if (todo.completed) return toast("Todo is already completed");
      try {
        const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
          method: "PATCH",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        toast.success("Todo marked as completed!");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async (id) => {
      try {
        const res = await fetch(BASE_URL + `/todos/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        setConfirmDelete(false);
        toast.success("Deleted successfully");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div className="flex justify-center">
      <div className="w-2xl">
        {Todo?.map((t) => {
          return (
            <div key={t._id} className="w-full bg-amber-50 my-2 p-4 ">
              <div className="flex justify-between items-center">
                {t.body}
                <div className="flex space-x-4 items-center">
                  <p>
                    {!t.completed ? (
                      <input
                        type="checkbox"
                        checked={t.completed}
                        onChange={() => updateTodo(t)}
                        disabled={isUpdating}
                      />
                    ) : (
                      <span className="text-green-600">✓</span>
                    )}
                  </p>
                  <button>Edit</button>
                  <button type="button" onClick={() => setConfirmDelete(true)}>
                    Delete
                  </button>
                  {confirmDelete && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800/30">
                      <div className="bg-amber-50 p-4 text-2xl flex items-center justify-center gap-4 rounded-2xl">
                        <p>Are you sure you want to delete?</p>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              deleteTodo(t._id);
                            }}
                            disabled={isDeleting}
                          >
                            {isDeleting ? "Deleting..." : "Yes"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDelete(false)}
                            className="bg-amber-700 "
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskDisplay;
