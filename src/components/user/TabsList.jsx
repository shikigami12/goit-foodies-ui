const TABS = [
  { id: 'my-recipes', label: 'My recipes' },
  { id: 'my-favorites', label: 'My favorites' },
  { id: 'followers', label: 'Followers' },
  { id: 'following', label: 'Following' },
];

export const TabsList = ({
  activeTab,
  onChange,
  enabledTabs = ['followers', 'following'],
}) => {
  return (
    <nav className="relative border-b border-borders overflow-x-auto">
      <ul
        className="
          relative z-10
          flex gap-6 md:gap-10
          min-w-max
          text-xs sm:text-sm uppercase tracking-[-0.02em]
          overflow-visible
        "
      >
        {TABS.map(tab => {
          const isActive = tab.id === activeTab;
          const isEnabled = enabledTabs.includes(tab.id);

          return (
            <li key={tab.id} className="shrink-0">
              <button
                type="button"
                disabled={!isEnabled}
                onClick={() => isEnabled && onChange?.(tab.id)}
                className={[
                  'tab-btn',
                  isActive ? 'tab-btn--active' : 'text-[#bfbebe]',
                  isEnabled
                    ? 'cursor-pointer hover:text-black'
                    : 'cursor-default',
                ].join(' ')}
              >
                {tab.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
