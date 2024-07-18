"Use client"
import { convertFileToUrl } from '@/lib/utils'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

type FileUploaderProps = {
  files: File[] | undefined,
  onChange: (files: File[]) => void,
  accept?: string,
  multiple?: boolean
}

export const FileUploader = ({ files, onChange, accept, multiple }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles)
  }, [onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, multiple })

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt='uploaded image'
          className='max-h-[400px] overflow-hidden object-cover'
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt='upload'
          />
          <div className='file-upload-label'>
            <p className='text-14-regular'>
              <span className='text-green-500'>
                Click to upload
              </span> or drag and drop
            </p>
            <p>
              SVG, PNG, JPG, GIF (max 800 x 400)
            </p>
          </div>
        </>
      )}
    </div>
  )
}
