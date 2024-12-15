import React, { useState, useRef } from "react";

interface AvatarUploadProps {
  initialAvatarUrl?: string;
  onAvatarChange?: (file: File) => Promise<string>;
  joinedAcademyDetails: string;
  academyName: string;
}

const UpIconAcademy = ({
  initialAvatarUrl,
  onAvatarChange,
  joinedAcademyDetails,
}: AvatarUploadProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    initialAvatarUrl
  );
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setAvatarUrl(URL.createObjectURL(file));
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
      if (onAvatarChange) {
        const newAvatarUrl = await onAvatarChange(selectedFile);
        setAvatarUrl(newAvatarUrl);
      }
    } catch (err) {
      setError("Failed to upload avatar. Please try again.");
      console.error("Avatar upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setAvatarUrl(initialAvatarUrl);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-300 flex justify-center items-center">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex justify-center text-5xl items-center  uppercase w-full h-full bg-gray-300">
            {joinedAcademyDetails[0]?.academyName?.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        {!selectedFile ? (
          <button
            onClick={handleUploadClick}
            className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded cursor-pointer"
          >
            Choose icon
          </button>
        ) : (
          <>
            <button
              onClick={handleUpload}
              className={`px-4 py-2 text-sm font-bold text-white rounded cursor-pointer ${
                isUploading ? "bg-gray-400" : "bg-blue-500"
              }`}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Confirm Upload"}
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded cursor-pointer"
            >
              Cancel
            </button>
          </>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default UpIconAcademy;
