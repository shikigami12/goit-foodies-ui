import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import PropTypes from 'prop-types';
import { BurgerMenu } from '../BurgerMenu/index.js';
import Icon from '../../common/Icon';
import styles from './UserBar.module.css';

const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Ccircle cx='25' cy='25' r='25' fill='%23FFFFFF'/%3E%3Cg transform='translate(8 8) scale(1.4)'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z' fill='%23000000'/%3E%3C/g%3E%3C/svg%3E";

export const UserBar = ({ isDarkTheme = true, user, onLogoutClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const displayName = user?.name ? user.name.toUpperCase() : '';
  const avatarUrl = user?.avatar || DEFAULT_AVATAR;

  const toggle = () => setIsOpen(prev => !prev);

  return (
    <div className={styles.userBar}>
      <div className={styles.userBarContainer}>
        <button type="button" onClick={toggle} className={styles.button}>
          <div className={styles.avatarContainer}>
            <img
              src={imageError ? DEFAULT_AVATAR : avatarUrl}
              alt={displayName}
              className={styles.avatarImage}
              onError={() => {
                if (avatarUrl !== DEFAULT_AVATAR) {
                  setImageError(true);
                }
              }}
            />
          </div>

          <div className={styles.nameContainer}>
            <span className={styles.name}>{displayName}</span>
          </div>

          <div className={styles.chevronContainer}>
            <Icon
              key={isOpen ? 'up' : 'down'}
              name={isOpen ? 'chevron-up' : 'chevron-down'}
              size={18}
              stroke="currentColor"
              color="currentColor"
              className={styles.chevronIcon}
            />
          </div>
        </button>

        <BurgerMenu isDarkTheme={isDarkTheme} />
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownContent}>
            <Link
              to={ROUTES.USER.replace(':id', user.id)}
              className={styles.profileLink}
              onClick={() => setIsOpen(false)}
            >
              PROFILE
            </Link>

            <button
              type="button"
              className={styles.logoutButton}
              onClick={() => {
                setIsOpen(false);
                if (onLogoutClick) {
                  onLogoutClick();
                }
              }}
            >
              <span>LOG OUT</span>
              <Icon
                name="arrow-up-right"
                size={18}
                stroke="white"
                className={styles.logoutIcon}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
UserBar.propTypes = {
  isDarkTheme: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onLogoutClick: PropTypes.func,
};
