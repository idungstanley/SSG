import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface Props {
  toastId: string;
  body: string;
  title: string;
}

export function TimeClockToast({ body, title, toastId }: Props) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      toast.remove(toastId);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [toastId]);

  return (
    <div className="flex flex-col space-y-1.5 w-52 h-16 rounded-lg shadow-xl p-2">
      <span className="text-alsoit-text-lg font-bold capitalize">{title}</span>
      <span className="text-alsoit-text-md">{body}</span>
    </div>
  );
}
