interface avatarType {
  colour: string;
}

interface companyArrayType {
  label: string;
  value: string;
}
export const avatarBg: avatarType[] = [
  { colour: '#B3A9A9' },
  { colour: '#DA1414' },
  { colour: '#0157FF' },
  { colour: '#F7E60D' },
  { colour: '#F4D6BE' },
  { colour: '#FBB7B6' },
  { colour: '#FCBBFD' },
  { colour: '#C3FBBB' },
  { colour: '#D48D63' },
  { colour: '#34AB01' },
  { colour: '#74021C' },
  { colour: '#5B02A8' },
  { colour: '#195E05' },
  { colour: '#5C5C05' },
  { colour: '#FD9E17' },
  { colour: '#F700FE' },
  { colour: '#00C9FF' },
  { colour: '#AD6F00' }
];

export const companySizeBtn: companyArrayType[] = [
  { label: 'Just me', value: '1' },
  { label: '2-5', value: '2' },
  { label: '6-10', value: '6' },
  { label: '11-20', value: '11' },
  { label: '21-50', value: '21' },
  { label: '51-100', value: '51' },
  { label: '101-500', value: '101' },
  { label: '500+', value: '500' },
  { label: 'I dont know', value: 'null' }
];
