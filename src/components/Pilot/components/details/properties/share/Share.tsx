import ShareModal from './shareModal/ShareModal';

export default function Share({ taskId, taskName }: { taskId?: string; taskName?: string }) {
  return (
    <div className="flex items-center space-x-0.5 border border-gray-400 rounded-md w-12/12">
      <ShareModal taskId={taskId} taskName={taskName} />
    </div>
  );
}
