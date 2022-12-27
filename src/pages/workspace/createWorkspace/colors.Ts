interface avatarType {
  colour: string;
}

interface companyArrayType {
  label: string;
  value: string;
}
export const avatarBg: avatarType[] = [
  { colour: 'red' },
  { colour: 'blue' },
  { colour: 'yellow' },
  { colour: 'violet' },
  { colour: 'indigo' },
  { colour: 'purple' },
  { colour: 'green' },
  { colour: 'brown' },
  { colour: 'gray' },
  { colour: 'gold' },
  { colour: 'pink' },
];

export const companySizeBtn: companyArrayType[] = [
  { label: '1', value: '1' },
  { label: '2-5', value: '2' },
  { label: '6-10', value: '6' },
  { label: '10-25', value: '10' },
  { label: 'Later', value: 'null' },
];
