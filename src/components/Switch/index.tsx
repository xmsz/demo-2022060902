function Switch({ checked, onChange }: { checked?: boolean; onChange?: (checked: boolean) => void }) {
  return (
    <div
      className={`flex ${
        checked ? 'justify-end border-blue-500 bg-blue-500' : 'justify-start border-gray-200 bg-gray-200'
      } items-center w-10 h-5 rounded-full box-content border `}
      onClick={() => {
        onChange?.(!checked);
      }}
    >
      <div className="w-5 h-5 rounded-full bg-white" />
    </div>
  );
}

export default Switch;
