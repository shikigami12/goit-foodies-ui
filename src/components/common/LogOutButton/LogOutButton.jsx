import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';
import { useModal } from '../../../hooks';
import { LogOutModal } from '../../modals';
import { Modal } from '../Modal/Modal';

export default function LogOutButton() {
  const dispatch = useDispatch();

  const {
    isOpen: isLogoutOpen,
    openModal: openLogoutModal,
    closeModal: closeLogoutModal,
  } = useModal();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      closeLogoutModal();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="text-white bg-brand-dark rounded-[30px] p-[14px] font-bold text-[14px] md:text-[16px] leading-[143%] md:leading-[150%] tracking-[-0.02em] uppercase w-full hover:bg-black transition-colors"
        onClick={openLogoutModal}
      >
        Log out
      </button>

      <Modal isOpen={isLogoutOpen} onClose={closeLogoutModal}>
        <LogOutModal onCancel={closeLogoutModal} onLogOut={handleLogout} />
      </Modal>
    </>
  );
}
