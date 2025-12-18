import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import { EMPTY_LIST_MESSAGES } from '../../../constants/messages';
import { UserRelationsList } from '../UserRelationsList/UserRelationsList';

const UserFollowersList = [
  {
    id: '1',
    name: 'Victoria',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    recipesCount: 7,
    recipesThumbs: [
      'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg',
      'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
      'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      'https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg',
    ],
  },
];

const UserFollowingList = [
  {
    id: '2',
    name: 'Andrew',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    recipesCount: 4,
    recipesThumbs: [
      'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
      'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg',
      'https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg',
      'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg',
    ],
  },
];

export default function FollowersList() {
  const location = useLocation();

  const currentRoute = location.pathname.split('/').pop() || '';

  const followersSlug = ROUTES.FOLLOWERS_LIST.replace('/', '');
  const followingSlug = ROUTES.FOLLOWING_LIST.replace('/', '');

  const isFollowersTab = currentRoute === followersSlug;
  const isFollowingTab = currentRoute === followingSlug;

  const items = isFollowersTab ? UserFollowersList : UserFollowingList;
  const actionLabel = isFollowersTab ? 'Follow' : 'Unfollow';
  const emptyMessage = isFollowersTab
    ? EMPTY_LIST_MESSAGES.FOLLOWERS
    : EMPTY_LIST_MESSAGES.FOLLOWING;

  const isEmpty = !items || items.length === 0;

  if (isEmpty) {
    return (
      <p className="font-medium text-sm md:text-base leading-[143%] md:leading-[150%] tracking-[-0.02em] text-center text-[#bfbebe] md:text-[#1a1a1a] mt-20 md:mt-[100px]">
        {emptyMessage}
      </p>
    );
  }

  return <UserRelationsList items={items} actionLabel={actionLabel} />;
}
