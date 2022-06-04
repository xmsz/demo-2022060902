function BtnClose({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="flex justify-center items-center w-3 h-3 rounded-full border border-red-500 cursor-default"
      style={{ backgroundColor: '#FF5F57' }}
      onClick={onClick}
    >
      <div
        className="text-center text-sm leading-4 transition-opacity duration-200 opacity-0 hover:opacity-100"
        style={{
          color: 'rgba(0,0,0,0.65)',
          marginBottom: '1px',
        }}
      >
        ×
      </div>
    </div>
  );
}

export default BtnClose;
