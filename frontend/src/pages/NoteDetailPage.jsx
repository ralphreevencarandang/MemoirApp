import { useParams } from "react-router";
import { Link } from "react-router";
import { Trash2Icon } from "lucide-react";
import { ArrowLeftIcon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axios from "../config/axios.js";
import toast from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rateLimited, setRateLimited] = useState(false);

  // Fetch data function
  const { data, error, isPending } = useQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      try {
        const res = await axios.get(`/notes/${id}`);
        console.log(res.data);
        setRateLimited(false); 
        return res.data;
      } catch (error) {
        if (error.response?.status === 429) {
      setRateLimited(true);
      toast.error("Too many requests, please slow down", {
        icon: "💀",
        duration: 4000
      });
    }
    throw error;
      }
    },
  });

  // handle the onChange title and content
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
    }
  }, [data]);

  // handle delete function
  const handleDelete = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      try {
        if (!window.confirm("Do you want to delete this note? ")) return;
        const res = await axios.delete(`/notes/${id}`);
        navigate("/");
        toast.success("Note deleted successfully");
      } catch (error) {
        console.log(error);
        if (error.response.status == 429) {
          toast.error("Too many request, please slow down", {
            icon: "💀",
          });
        }
        toast.error("Failed to delete note");
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.put(`/notes/${id}`, { title, content });
        navigate('/')
        return res.data;
      } catch (error) {
        console.log("Error updating data", error);
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["note", id], {
        ...data, // spread existing data to preserve other fields
        title,
        content,
      });
      toast.success("Note updated successfully");
    },
    onError: (error) => {
      console.log(error);
      if (error.response?.status === 429) {
        toast.error("Too many requests, please slow down", {
          icon: "💀",
        });
      } else {
        toast.error("Failed to update note");
      }
    },
  });

  if (rateLimited) {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
          </div>
          <RateLimitedUI />
        </div>
      </div>
    </div>
  );
}

  return (
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          {isPending && (
            <div className="  flex justify-center items-center">
              {" "}
              <div className="text-primary animate-spin">
                <Loader size={48} />
              </div>
            </div>
          )}

          {error && <p className="text-primary text-center font-bold">{error}</p>}

          {data && (
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <Link to="/" className="btn btn-ghost">
                  <ArrowLeftIcon className="h-5 w-5" />
                  Back to Notes
                </Link>
                <button
                  className="btn btn-error btn-outline"
                  onClick={handleDelete.mutate}
                >
                  <Trash2Icon className="h-5 w-5" />
                  Delete Note
                </button>
              </div>

              <div className="card bg-base-100">
                <div className="card-body">
                  <div className="form-control mb-4">
                    <label className="label mb-2">
                      <span className="label-text">Title</span>
                    </label>{" "}
                    <br />
                    <input
                      type="text"
                      placeholder="Note title"
                      className="input input-bordered w-full"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Content</span>
                    </label>{" "}
                    <br />
                    <textarea
                      placeholder="Write your note here..."
                      className="textarea textarea-bordered h-32 w-full"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>

                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={updateMutation.mutate}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default NoteDetailPage;
