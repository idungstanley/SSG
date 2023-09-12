export interface NeighborsProps {
  id: number;
  name: string;
  icon: JSX.Element;
  isVisible: boolean;
}

export default function useFindNeighbors(arr: NeighborsProps[], item: NeighborsProps) {
  const index = arr.indexOf(item);
  const leftNeighbor = index > 0 ? arr[index - 1] : null;
  const rightNeighbor = index < arr.length - 1 ? arr[index + 1] : null;

  return { leftNeighbor, rightNeighbor };
}
