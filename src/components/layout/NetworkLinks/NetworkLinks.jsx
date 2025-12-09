export const NetworkLinks = () => {
  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/goITclub/' },
    { name: 'Instagram', url: 'https://www.instagram.com/goitclub/' },
    { name: 'YouTube', url: 'https://www.youtube.com/c/GoIT' },
  ];

  return (
    <ul>
      {socialLinks.map((link) => (
        <li key={link.name}>
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};
