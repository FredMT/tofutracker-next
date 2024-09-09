import React from 'react'
import { Button } from '@/components/ui/button'
import { Edit, PlusCircle } from 'lucide-react'
import { useEditMode } from '@/app/customlist/contexts/EditModeContext'

const ActionButtons: React.FC = () => {
  const { isEditMode, toggleEditMode } = useEditMode()
  const canEdit = true // This will be replaced with actual authorization logic

  return (
    <div className="flex space-x-2">
      {canEdit && (
        <Button className="w-fit">
          <PlusCircle className="mr-2" />
          Add Items
        </Button>
      )}
      {canEdit && (
        <Button onClick={toggleEditMode} className="w-fit">
          <Edit className="mr-2" />
          {isEditMode ? 'Done' : 'Edit'}
        </Button>
      )}
    </div>
  )
}

export default ActionButtons
