'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface ListHeaderProps {
  title: string
  description: string
  isEditing: boolean
  onSave: (newTitle: string, newDescription: string) => void
}

const ListHeader: React.FC<ListHeaderProps> = ({
  title,
  description,
  isEditing,
  onSave,
}) => {
  const [editedTitle, setEditedTitle] = useState(title)
  const [editedDescription, setEditedDescription] = useState(description)

  const handleSave = () => {
    onSave(editedTitle, editedDescription)
  }

  if (isEditing) {
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
