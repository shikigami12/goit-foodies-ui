import Icon from '../../common/Icon';

export const NetworkLinks = () => {
  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/goITclub/' },
    { name: 'Instagram', url: 'https://www.instagram.com/goitclub/' },
    { name: 'YouTube', url: 'https://www.youtube.com/c/GoIT' },
  ];

  return (
    <ul className="flex justify-between items-center space-x-4">
      {socialLinks.map(link => (
        <li
          key={link.name}
          className="border border-borders p-2.5 rounded-full"
        >
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            <Icon
              name={link.name.toLowerCase()}
              color="currentColor"
              className="text-brand"
            />
          </a>
        </li>
      ))}
    </ul>
  );
};
