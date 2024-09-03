/* eslint-disable @next/next/no-img-element */
'use client'
import { uploadFile } from '@/app/user/[username]/settings/features/profile/components/actions'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Profile } from '@prisma/client'
import { ImagePlus } from 'lucide-react'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type ImageUploaderProps = {
  type: 'profile' | 'banner'
  profile: Profile
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  type,
  profile,
}) => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>('')

  const { toast } = useToast()

  const formSchema = z.object({
    image: z
      .instanceof(File)
      .refine((file) => file.size !== 0, 'Please upload an image'),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      image: new File([''], 'filename'),
    },
  })

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader()
      try {
        reader.onload = () => setPreview(reader.result)
        reader.readAsDataURL(acceptedFiles[0])
        form.setValue('image', acceptedFiles[0])
        form.clearErrors('image')
      } catch (error) {
        setPreview(null)
        form.resetField('image')
      }
    },
    [form]
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: {
        'image/png': [],
        'image/jpg': [],
        'image/jpeg': [],
        'image/webp': [],
      },
    })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    formData.append('file', values.image)
    const result = await uploadFile(formData, profile, type)
    toast({
      variant: result?.success ? 'success' : 'destructive',
      description: result?.message,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="md:w-1/3">
              <FormLabel
                className={`${
                  fileRejections.length !== 0 && 'text-destructive'
                }`}
              >
                <span
                  className={
                    form.formState.errors.image || fileRejections.length !== 0
                      ? 'text-destructive'
                      : 'text-muted-foreground'
                  }
                ></span>
              </FormLabel>
              <FormControl>
                <div
                  {...getRootProps()}
                  className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground"
                >
                  {preview && (
                    <img
                      src={preview as string}
                      alt="Uploaded image"
                      className="max-h-[400px] rounded-lg"
                    />
                  )}
                  <ImagePlus
                    className={`size-20 ${preview ? 'hidden' : 'block'}`}
                  />
                  <Input {...getInputProps()} type="file" name="file" />
                  {isDragActive ? (
                    <p>Drop the image!</p>
                  ) : (
                    <p>Click here or drag an image to upload it</p>
                  )}
                </div>
              </FormControl>
              <FormMessage>
                {fileRejections.length !== 0 && (
                  <p>
                    Image must be less than 1MB and of type webp, png, jpg, or
                    jpeg
                  </p>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-auto rounded-lg"
        >
          Upload {type}
        </Button>
      </form>
    </Form>
  )
}
