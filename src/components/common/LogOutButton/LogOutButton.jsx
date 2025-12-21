import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/slices/authSlice';
import { clearFavorites } from '../../../redux/slices/favoritesSlice';
import { ROUTES } from '../../../constants';

export default function LogOutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      await dispatch(logout()).unwrap();
      dispatch(clearFavorites());
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button
      type="button"
      className="text-white bg-brand-dark rounded-[30px] p-[14px] font-bold text-[14px] md:text-[16px] leading-[143%] md:leading-[150%] tracking-[-0.02em] uppercase w-full"
      onClick={onClick}
    >
      Log out
    </button>
  );
}
