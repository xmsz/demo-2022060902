interface Props {
  list: Array<{
    title: string;
    separator?: boolean;
    rightLabel?: string;
  }>;
  onItemClick?: (title: string) => void;
}

function MenuPopup({ list, onItemClick }: Props) {
  if (!list.length) return null;

  return (
    <div
      className="absolute left-0 top-5 p-1 translate-y-1  rounded-md"
      style={{
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(250,250,250,0.9)',
      }}
    >
      {list.map((item) => {
        return (
          <div
            key={item.title}
            onClick={() => {
              onItemClick?.(item.title);
            }}
          >
            <div className="px-2 py-0.5 text-sm whitespace-nowrap rounded-md hover:text-white hover:bg-blue-500">
              <p className="flex justify-between">
                <span className="text-xs">{item.title}</span>
                <span className="text-xs text-gray-400 hover:text-white ml-16">{item.rightLabel}</span>
              </p>
            </div>
            {item.separator && (
              <span
                className="block border-b my-1 mx-2 text-xs"
                style={{
                  borderColor: 'rgba(0,0,0,0.1)',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default MenuPopup;
