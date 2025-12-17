export const UserInfo = ({ user }) => {
  const { name, email, avatar, addedRecipes, favorites, followers, following } =
    user;

  return (
    <aside className="bg-white rounded-3xl border border-borders px-8 py-10 flex flex-col items-center gap-6">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40">
        <img
          src={avatar}
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />
        <button
          type="button"
          className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-xl leading-none"
        >
          +
        </button>
      </div>

      <h2 className="text-lg font-semibold uppercase tracking-wide">{name}</h2>

      <div className="w-full text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-semibold">Email: </span>
          <a href={`mailto:${email}`} className="underline">
            {email}
          </a>
        </p>
        <p>
          <span className="font-semibold">Added recipes: </span>
          {addedRecipes}
        </p>
        <p>
          <span className="font-semibold">Favorites: </span>
          {favorites}
        </p>
        <p>
          <span className="font-semibold">Followers: </span>
          {followers}
        </p>
        <p>
          <span className="font-semibold">Following: </span>
          {following}
        </p>
      </div>

      <button
        type="button"
        className="mt-4 w-full py-3 rounded-full bg-black text-white text-sm font-semibold tracking-wide"
      >
        LOG OUT
      </button>
    </aside>
  );
};
