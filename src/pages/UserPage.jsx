import { PathInfo, MainTitle, Subtitle } from '../components/common';
import { UserInfo, UserRelationsSection } from '../components/user';

const mockUser = {
  name: 'Victoria',
  email: 'victoria26882@gmail.com',
  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  addedRecipes: 9,
  favorites: 9,
  followers: 5,
  following: 5,
};

export const UserPage = () => {
  return (
    <section
      className="
        w-full px-4 py-8 md:py-10
        sm:max-w-[375px] sm:mx-auto
        md:max-w-[736px]
        xl:max-w-[1312px] xl:mx-auto
      "
    >
      <PathInfo currentPage="Profile" />

      <div className="mt-8 space-y-8 xl:mt-10 xl:grid xl:grid-cols-[394px_1fr] xl:gap-10 xl:space-y-0">
        <UserInfo user={mockUser} />

        <div className="flex flex-col gap-8">
          <header>
            <MainTitle>Profile</MainTitle>
            <Subtitle>
              Reveal your culinary art, share your favorite recipe and create
              gastronomic masterpieces with us.
            </Subtitle>
          </header>

          <UserRelationsSection />
        </div>
      </div>
    </section>
  );
};
