

export default function LogOutButton() {
  const onClick = () => {
    console.log("LOG OUT CLICKED");
  };
  return (
    <button type="button" className="text-white bg-brand-dark rounded-[30px] p-[14px] font-bold text-[14px] md:text-[16px] leading-[143%] md:leading-[150%] tracking-[-0.02em] uppercase" onClick={onClick}>
      Log out
    </button>
  );
}
