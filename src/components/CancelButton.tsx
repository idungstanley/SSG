import Button from './Button';

interface CancelButtonProps {
  onClick: () => void;
}

function CancelButton({ onClick }: CancelButtonProps) {
  return (
    <Button
      height="h-6"
      width="w-20"
      label="Cancel"
      labelSize="text-xs"
      customClasses="hover:bg-[#ff0e0f] hover:border-[#ffe7e7] bg-white shadow-none border-none font-semibold text-[#FF0E0F]"
      padding="p-1"
      buttonStyle="custom"
      onClick={onClick}
    />
  );
}
export default CancelButton;
