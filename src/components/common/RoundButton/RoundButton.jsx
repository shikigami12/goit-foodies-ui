export default function RoundButton({ children, onClick = () => {}, isLoading = false }) {
  return (
    <button
      type="button"
      disabled={isLoading}
      className={`cursor-pointer border border-[#bfbebe] rounded-[30px] size-[38px] md:size-[42px] p-[10px] md:p-[12px] flex justify-center items-center hover:bg-[#050505] hover:border-[#050505] hover:text-white transition-colors ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
}
