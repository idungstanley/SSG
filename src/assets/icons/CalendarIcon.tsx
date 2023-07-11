import { DetailedHTMLProps, SVGAttributes } from 'react';

/* eslint-disable max-len */
type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export default function CalendarIcon({ ...props }: Props) {
  return (
    <svg {...props} width="17" height="17" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.25 1.87104L14.2456 1.87106V0.625147C14.2456 0.279753 13.9659 0 13.6206 0C13.2753 0 12.9956 0.279753 12.9956 0.625147V1.87075H7.99563V0.625147C7.99563 0.279753 7.71594 0 7.37063 0C7.02531 0 6.74563 0.279753 6.74563 0.625147V1.87075H1.75C1.05969 1.87075 0.5 2.43057 0.5 3.12104V18.7497C0.5 19.4402 1.05969 20 1.75 20H19.25C19.9403 20 20.5 19.4402 20.5 18.7497V3.12104C20.5 2.43086 19.9403 1.87104 19.25 1.87104ZM19.25 18.7497H1.75V3.12104H6.74563V3.75088C6.74563 4.09625 7.02531 4.37603 7.37063 4.37603C7.71594 4.37603 7.99563 4.09625 7.99563 3.75088V3.12136H12.9956V3.75119C12.9956 4.09659 13.2753 4.37634 13.6206 4.37634C13.9659 4.37634 14.2456 4.09659 14.2456 3.75119V3.12136H19.25V18.7497ZM14.875 9.99795H16.125C16.47 9.99795 16.75 9.71788 16.75 9.3728V8.12251C16.75 7.77743 16.47 7.49736 16.125 7.49736H14.875C14.53 7.49736 14.25 7.77743 14.25 8.12251V9.3728C14.25 9.71788 14.53 9.99795 14.875 9.99795ZM14.875 14.9988H16.125C16.47 14.9988 16.75 14.7191 16.75 14.3737V13.1234C16.75 12.7783 16.47 12.4982 16.125 12.4982H14.875C14.53 12.4982 14.25 12.7783 14.25 13.1234V14.3737C14.25 14.7194 14.53 14.9988 14.875 14.9988ZM11.125 12.4982H9.875C9.53 12.4982 9.25 12.7783 9.25 13.1234V14.3737C9.25 14.7191 9.53 14.9988 9.875 14.9988H11.125C11.47 14.9988 11.75 14.7191 11.75 14.3737V13.1234C11.75 12.7786 11.47 12.4982 11.125 12.4982ZM11.125 7.49736H9.875C9.53 7.49736 9.25 7.77743 9.25 8.12251V9.3728C9.25 9.71788 9.53 9.99795 9.875 9.99795H11.125C11.47 9.99795 11.75 9.71788 11.75 9.3728V8.12251C11.75 7.77712 11.47 7.49736 11.125 7.49736ZM6.125 7.49736H4.875C4.53 7.49736 4.25 7.77743 4.25 8.12251V9.3728C4.25 9.71788 4.53 9.99795 4.875 9.99795H6.125C6.47 9.99795 6.75 9.71788 6.75 9.3728V8.12251C6.75 7.77712 6.47 7.49736 6.125 7.49736ZM6.125 12.4982H4.875C4.53 12.4982 4.25 12.7783 4.25 13.1234V14.3737C4.25 14.7191 4.53 14.9988 4.875 14.9988H6.125C6.47 14.9988 6.75 14.7191 6.75 14.3737V13.1234C6.75 12.7786 6.47 12.4982 6.125 12.4982Z"
        fill="black"
        fillOpacity="0.65"
      />
    </svg>
  );
}
