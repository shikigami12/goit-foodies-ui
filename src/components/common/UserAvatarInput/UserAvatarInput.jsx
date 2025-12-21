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
import withoutAvatar from '../../../images/user_without_avatar.jpg';
import { useParams } from 'react-router-dom';
import { showError } from '../../../utils/notification';

// Must match API configuration
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
];
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function UserAvatarInput() {
  const { id } = useParams();
  const user = useSelector(currentUserProfileSelector);
  const { isLoading } = useSelector(state => state.users);

  const authUser = useSelector(authUserSelector);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isCurrentUser = isAuthenticated && authUser?.id === id;

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    user?.avatar || withoutAvatar
  );
  const { isMobile } = useWindowWidth();
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    if (selectedFile) {
      dispatch(updateAvatar(selectedFile))
        .unwrap()
        .catch(error => {
          showError(error || 'Failed to update avatar');
        })
        .finally(() => {
          setSelectedFile(null);
        });
    }
  }, [selectedFile, dispatch]);

  useEffect(() => {
    setPreviewImage(user.avatar || withoutAvatar);
  }, [user.avatar]);

  const handleAddButton = () => {
    if (isLoading) return;
    inputRef.current.click();
  };

  const validateFile = file => {
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
      {previewImage && (
        <img
          className={`w-full h-full object-cover rounded-[90%] ${
            isLoading ? 'blur-[2px] opacity-70' : ''
          }`}
          src={previewImage}
        />
      )}

      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/30">
          <svg
            className="animate-spin h-8 w-8 text-brand"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}

      {isCurrentUser && !isLoading && (
        <>
          <button
            type="button"
            className="absolute bottom-0 left-1/2 bg-brand -translate-x-1/2 translate-y-1/2 rounded-[90%] w-7 h-7 md:w-[38px] md:h-[38px] flex justify-center items-center leading-none text-white border-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-white hover:text-brand hover:border-brand transition-colors"
            onClick={handleAddButton}
          >
            <Icon name="plus" size={isMobile ? 16 : 18} stroke="currentColor" />
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
