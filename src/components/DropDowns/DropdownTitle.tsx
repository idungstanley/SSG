interface IDropdownTitleProps {
  content: string;
}

export default function DropdownTitle({ content }: IDropdownTitleProps) {
  return (
    <div className="flex justify-center pt-3 font-bold text-alsoit-text-sm" style={{ lineHeight: '9.6px' }}>
      {content}
    </div>
  );
}
