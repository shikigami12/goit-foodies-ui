export default function RoundButton({children, onClick=()=>{}}) {
  return (
    <button type="button" className="cursor-pointer border border-[#bfbebe] rounded-[30px] size-[38px] md:size-[42px] p-[10px] md:p-[12px] flex justify-center items-center hover:bg-[#050505] hover:border-[#050505] hover:text-white transition-colors" onClick={onClick}>
      {children}
    </button>
  );
}
