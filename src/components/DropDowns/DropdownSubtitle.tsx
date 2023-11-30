interface IDropdownTitleProps {
  content: string;
}

export default function DropdownSubtitle({ content }: IDropdownTitleProps) {
  return (
    <div className="relative flex flex-col justify-center mb-2">
      <div className="pt-3 border-b-2 " />
      <span
        className="absolute px-1 font-bold text-center whitespace-nowrap text-[#B2B2B2] bg-white text-alsoit-text-sm left-1/2 top-1/2 -translate-x-1/2"
        style={{ lineHeight: '9.6px', top: '8px' }}
      >
        {content}
      </span>
    </div>
  );
}
