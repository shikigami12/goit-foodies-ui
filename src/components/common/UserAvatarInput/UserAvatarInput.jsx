import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { Icon } from '../Icon/Icon';
import { useWindowWidth } from '../../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentUserProfileSelector,
  updateAvatar,
} from '../../../redux/slices/usersSlice';
import { authUserSelector } from '../../../redux/slices/authSlice';
import withoutAvatar from "../../../images/user_without_avatar.jpg";

// Must match API configuration
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function UserAvatarInput() {
  const user = useSelector(currentUserProfileSelector);
  const authUser = useSelector(authUserSelector);
  const isCurrentUser = authUser?.id === user?.id;

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const windowWidth = useWindowWidth();
  const dispatch = useDispatch();
  const inputRef = useRef();

  // Display preview URL if available, otherwise user avatar, otherwise default
  const displayImage = previewUrl || user?.avatar || withoutAvatar;

  // Handle file selection and upload
  useEffect(() => {
    if (!selectedFile) return;

    // Create preview URL
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    // Upload the file
    setIsUploading(true);
    dispatch(updateAvatar(selectedFile))
      .unwrap()
      .then(() => {
        toast.success('Avatar updated successfully');
      })
      .catch((error) => {
        toast.error(error || 'Failed to update avatar');
        // Revert preview on error
        setPreviewUrl(null);
      })
      .finally(() => {
        setIsUploading(false);
      });

    // Cleanup preview URL on unmount or when file changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, dispatch]);

  // Clear preview when user avatar updates from server
  useEffect(() => {
    if (user?.avatar) {
      setPreviewUrl(null);
      setSelectedFile(null);
    }
  }, [user?.avatar]);

  const handleAddButton = () => {
    if (isUploading) return;
    inputRef.current.click();
  };

  const validateFile = (file) => {
    if (!file) return null;

    // Check file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return `Invalid file type. Allowed: JPEG, PNG, GIF, WebP`;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB`;
    }

    return null;
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      toast.error(error);
      event.target.value = '';
      return;
    }

    setSelectedFile(file);
    event.target.value = '';
  };

  return (
    <div className="relative rounded-[90%] bg-borders w-20 h-20 md:w-[120px] md:h-[120px] mx-auto">
      <img className="w-full h-full rounded-[90%] object-cover" src={displayImage} alt="User avatar" />
      {isUploading && (
        <div className="absolute inset-0 rounded-[90%] bg-black/40 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {isCurrentUser && (
        <>
          <button
            type="button"
            disabled={isUploading}
            className="absolute bottom-0 left-1/2 bg-brand -translate-x-1/2 translate-y-1/2 rounded-[90%] w-7 h-7 md:w-[38px] md:h-[38px] flex justify-center items-center leading-none text-white border-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            onClick={handleAddButton}
          >
            <Icon
              name="plus"
              size={windowWidth < 768 ? 16 : 18}
              stroke="white"
            />
          </button>
          <input
            className="hidden"
            type="file"
            ref={inputRef}
            accept=".jpg,.jpeg,.png,.gif,.webp"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
}
