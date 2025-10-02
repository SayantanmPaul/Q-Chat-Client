import React, { useRef, useState } from 'react';
import { Button } from './button';
import { PaperclipIcon } from 'lucide-react';

// type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

const FileUploader = ({
  onFileSelected,
}: {
  onFileSelected: (file: File) => void;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [file, setFile] = useState<File | null>(null);
  //   const [status, setStatus] = useState<UploadStatus>('idle');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      onFileSelected(e.target.files[0]);
    }
  };

  //   const handleFileUpload = async () => {
  //     if (!file) return;
  //     setStatus('uploading');

  //     const formData = new FormData();
  //     formData.append('file', file);
  //   };

  return (
    <div className="">
      <input type="file" onChange={handleFileChange} ref={inputRef} hidden />

      <Button
        size="icon"
        variant="secondary"
        onClick={() => inputRef.current?.click()}
        className="h-9 w-9 cursor-pointer rounded-full border border-zinc-900/80 bg-[#404040]/40 text-[#BAC0CC] lg:h-10 lg:w-10"
      >
        <PaperclipIcon strokeWidth={2} size={20} className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default FileUploader;
