import Navbar from "../components/Navbar"
import { useState } from "react"
import RateLimitedUI from "../components/RateLimitedUI";
import { useQuery } from "@tanstack/react-query";
import axios from '../config/axios.js'
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import NoteCard from "../components/NoteCard.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";

const HomePage = () => {

  const [rateLimited, setRateLimited] = useState(false);
  
  const {data, error, isPending, refetch} = useQuery({
    queryKey: ['notes'],
    queryFn: async ()=>{
      try {
          const res = await axios.get('/notes');
          setRateLimited(false)
          console.log(res.data);
          return res.data;
      } catch (error) {
        console.log('Error fetching notes', error);
        if(error.response.status === 429){
            setRateLimited(true)
            toast.error('Too many request, please slow down', {icon: '💀', duration: 4000})
        }else{
          toast.error('Error Fetching data')
        }
        return []
      }
    }
  });


  

  return (
    <div className="min-h-screen">
        <Navbar/>
        {rateLimited && <RateLimitedUI/>}
        <div className="max-w-7xl mx-auto p-4 mt-6 ">
          {isPending && <div className="  flex justify-center items-center"> <div className="text-primary animate-spin"><Loader size={48}/></div></div>}
          {error && <p className="text-primary text-center font-bold">{error}</p>}
          {data?.length > 0 && !rateLimited ?  (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...data]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map(note => 
                  <NoteCard  note={note} key={note._id} refetch={refetch}/>
              )}
            </div>
            ) : ''}
        </div>

        {data?.length == 0 && !rateLimited &&   <NotesNotFound/>}
    
  

    </div>
  )
}

export default HomePage
