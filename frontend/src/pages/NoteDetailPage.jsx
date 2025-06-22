import React from 'react'
import { useParams } from 'react-router'
const NoteDetailPage = () => {
  const {id} = useParams()
  return (
    <div>
        Note details {id}
    </div>
  )
}

export default NoteDetailPage
