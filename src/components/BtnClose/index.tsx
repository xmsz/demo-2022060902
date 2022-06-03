function BtnClose({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="flex justify-center items-center w-3 h-3 rounded-full border border-red-600 bg-red-500 cursor-default"
      onClick={onClick}
    >
      <div className="text-sm  transition-opacity duration-200 opacity-0 hover:opacity-100">×</div>
    </div>
  );
}

export default BtnClose;
