'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useEditMode } from '@/app/customlist/contexts/EditModeContext'

const ListHeader: React.FC = () => {
  const { isEditMode } = useEditMode()
  const [title, setTitle] = useState('My Watchlist')
  const [description, setDescription] = useState(
    'Keep track of your favorite movies, TV shows, and anime'
  )
  const [editedTitle, setEditedTitle] = useState(title)
  const [editedDescription, setEditedDescription] = useState(description)

  const handleSave = () => {
    setTitle(editedTitle)
    setDescription(editedDescription)
    // Here you would typically call a server action to save the changes
    // For example: saveListDetails(editedTitle, editedDescription)
  }

  if (isEditMode) {
    return (
      <div className="space-y-4">
        <Input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          placeholder="List Title"
        />
        <Textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          placeholder="List Description"
        />
        <Button onClick={handleSave}>Save</Button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <h1>{title}</h1>
      <h4>{description}</h4>
    </div>
  )
}

export default ListHeader
