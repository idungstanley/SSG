import HelpIcon from '../../../../../assets/icons/HelpIcon';

interface saveColsProps {
  header?: string;
  body?: string;
}

function SaveCols({ header, body }: saveColsProps) {
  return (
    <div className="w-full my-4">
      <div className="flex p-0.5 gap-1">
        <div>
          <HelpIcon />
        </div>
        <div className="w-5/6">
          <h1>{header} </h1>
          <h2 className="my-2">{body}</h2>
        </div>
      </div>
    </div>
  );
}

export default SaveCols;
