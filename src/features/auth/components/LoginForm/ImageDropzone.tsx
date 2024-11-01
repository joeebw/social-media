import { useDropzone } from "react-dropzone";
import { FieldErrors } from "react-hook-form";
import clsx from "clsx";
import { RegisterFormValues } from "./LoginForm"; // Necesitarás exportar este tipo

interface ImageDropzoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  error?: FieldErrors<RegisterFormValues>["profilePicture"];
}

const ImageDropzone = ({
  onFileSelect,
  selectedFile,
  error,
}: ImageDropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      onFileSelect(file);
    },
  });

  return (
    <div className="col-span-2">
      <div
        {...getRootProps()}
        className={clsx(
          "mt-4 border-2 border-dashed rounded-lg p-6 cursor-pointer text-center text-primary",
          "transition-all duration-200",
          error ? "border-red-500" : "border-primary",
          "hover:opacity-80"
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here...</p>
        ) : selectedFile ? (
          <p>{selectedFile.name}</p>
        ) : (
          <p>Drag and drop a profile picture, or click to select</p>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default ImageDropzone;
