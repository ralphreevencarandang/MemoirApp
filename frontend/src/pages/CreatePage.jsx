import React from 'react'
import { ArrowLeftIcon } from 'lucide-react'
import { Link } from 'react-router'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from '../config/axios.js'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
const CreatePage = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")




  const mutation = useMutation({
    mutationFn: async(e)=>{
      e.preventDefault();
        if(!title.trim() || !content.trim() ){
          toast.error('Please input required fields')
          throw new Error('Validation failed');
        }
      try {
        const res = await axios.post('/notes', {title, content})
        navigate('/')
        toast.success('Notes created')
      } catch (error) {
        console.log(error)
        if(error.response.status === 429){
           toast.error('Too many request, please slow down', {
            icon: "💀"
          })
        }
        toast.error('Failed to create note')

      }
    },
    onSuccess: (data)=>{
      console.log('Data: ', data);
    }
  })

  



  return (
      <div className="min-h-screen bg-base-200">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <Link to={"/"} className="btn btn-ghost mb-6">
                <ArrowLeftIcon className="size-5" />
                Back to Notes
              </Link>

              <div className="card bg-base-100">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Create New Note</h2>
                  <form onSubmit={mutation.mutate} >
                    <div className="form-control mb-4">
                      <label className="label mb-2">
                        <span className="label-text">Title</span>
                      </label><br />
                      <input
                        type="text"
                        placeholder="Note Title"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}
                    
                      />
                    </div>

                    <div className="form-control mb-4">
                      <label className="label mb-2">
                        <span className="label-text">Content</span>
                      </label> <br />
                      <textarea
                        placeholder="Write your note here..."
                        className="textarea textarea-bordered h-32 w-full"
                        value={content}
                        onChange={(e)=> setContent(e.target.value)}
                    
                      />
                    </div>

                    <div className="card-actions justify-end">
                      <button type="submit" className="btn btn-primary "  disabled={mutation.isPending}>
                        {mutation.isPending ? 'Creating....' : 'Create note'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </div>
  )
}

export default CreatePage


