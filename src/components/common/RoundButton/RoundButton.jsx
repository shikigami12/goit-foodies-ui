export default function RoundButton({children, onClick=()=>{}}) {
  return (
    <button type="button" className="cursor-pointer border border-[#bfbebe] rounded-[90%] w-[42px] h-[42px] flex justify-center items-center" onClick={onClick}>
      {children}
    </button>
  );
}
