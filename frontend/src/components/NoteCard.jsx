import { Trash2Icon, PenSquareIcon } from "lucide-react";
import { formatDate } from "../lib/utils.js";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";

import axios from '../config/axios.js'
import toast from "react-hot-toast";

const NoteCard = ({ note, refetch }) => {

    const mutation = useMutation({
    mutationFn: async(e)=>{
      e.preventDefault();
      try {
        if(!window.confirm('Do you want to delete this note? ')) return
          const res = await axios.delete(`/notes/${note._id}`);
          refetch()
          toast.success('Note deleted successfully')
      } catch (error) {
        console.log(error)
        if(error.response.status == 429){
          toast.error('Too many request, please slow down', {
            icon: "💀"
          })
        }
        toast.error('Failed to delete note')
      }
    },
  
    
  })

  return (
            <Link
            to={`/notes/${note._id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200 
            border-t-4 border-solid border-[#00FF9D]"
            >
            <div className="card-body">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="text-base-content/70 line-clamp-3">{note.content}</p>
                <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">{formatDate(new Date (note.createdAt))}</span>
                <div className="flex items-center gap-1">
                    <PenSquareIcon className="size-4" />
     
                    <button className="btn btn-ghost btn-xs text-error" type="button"  onClick={(e) => {e.stopPropagation(); mutation.mutate(e) }}>
                      <Trash2Icon className="size-4" />
                    </button>
                </div>
                </div>
            </div>
            </Link>
  );
};

export default NoteCard;
