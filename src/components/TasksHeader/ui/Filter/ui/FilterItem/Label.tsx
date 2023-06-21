export function Label({ show }: { show: boolean }) {
  return show ? <p className="w-12">Where</p> : <p className="w-12"></p>;
}
