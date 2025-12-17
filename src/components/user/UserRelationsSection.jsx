import { useState } from 'react';
import { TabsList } from './TabsList';
import { UserRelationsList } from './UserRelationsList';

const followersMock = [
  {
    id: 1,
    name: 'Victor',
    recipesCount: 30,
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    recipesThumbs: [
      'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg',
      'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
      'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      'https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg',
    ],
  },
];

const followingMock = [
  {
    id: 1,
    name: 'Victor',
    recipesCount: 30,
    avatar:
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    recipesThumbs: [
      'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg',
      'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
    ],
  },
];

const TABS_CONFIG = {
  followers: {
    items: followersMock,
    actionLabel: 'Follow',
  },
  following: {
    items: followingMock,
    actionLabel: 'Unfollow',
  },
};

export const UserRelationsSection = () => {
  const [activeTab, setActiveTab] = useState('followers');

  const { items, actionLabel } = TABS_CONFIG[activeTab];

  return (
    <div className="flex flex-col">
      <TabsList
        activeTab={activeTab}
        onChange={setActiveTab}
        enabledTabs={['followers', 'following']}
      />

      <UserRelationsList items={items} actionLabel={actionLabel} />
      <UserRelationsList items={items} actionLabel={actionLabel} />
      <UserRelationsList items={items} actionLabel={actionLabel} />
      <UserRelationsList items={items} actionLabel={actionLabel} />
    </div>
  );
};
