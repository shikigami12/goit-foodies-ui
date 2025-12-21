export default function LogOutButton({ onClick }) {
  return (
    <button
      type="button"
      className="text-white bg-brand-dark rounded-[30px] p-[14px] font-bold text-[14px] md:text-[16px] leading-[143%] md:leading-[150%] tracking-[-0.02em] uppercase w-full hover:bg-black transition-colors"
      onClick={onClick}
    >
      Log out
    </button>
  );
}
