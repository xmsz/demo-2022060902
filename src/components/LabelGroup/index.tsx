interface IProps {
  dataSource: Array<{
    label: string;
    value: string;
  }>;
  activeKey: string;
  onChange?: (value: string) => void;
}

function LabelGroup({ dataSource, activeKey, onChange }: IProps) {
  return (
    <div className=" flex items-center text-sm rounded-md border border-gray-300 bg-gray-200">
      {dataSource.map((item) => {
        return (
          <div
            key={item.value}
            className={`px-2.5 border-b border-transparent ${
              activeKey === item.value ? ' rounded-md border-gray-100 bg-white' : ''
            } cursor-default`}
            onClick={() => {
              onChange?.(item.value);
            }}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
}

export default LabelGroup;
