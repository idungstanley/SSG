import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

interface Props {
  active: boolean;
}

export default function PilotActivityIcon({ active = false }: Props) {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="mask0_5676_45574"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="21"
        height="20"
      >
        <rect x="0.5" width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_5676_45574)">
        <path
          d="M15.9517 14.8558V13.5481C15.9517 13.4255 15.9071 13.3195 15.8178 13.2302C15.7284 13.1409 15.6225 13.0962 15.4998 13.0962C15.3772
          13.0962 15.2712 13.1409 15.1819 13.2302C15.0926 13.3195 15.0479 13.4255 15.0479 13.5481V14.952C15.0479 15.0474 15.0661 15.1375 15.1024
          15.2222C15.1387 15.307 15.189 15.3816 15.2533 15.4459L16.3235 16.5161C16.4151 16.6026 16.5224 16.6472 16.6454 16.6499C16.7684 16.6526
          16.8759 16.608 16.9678 16.5161C17.0543 16.4296 17.0976 16.3235 17.0976 16.1978C17.0976 16.0721 17.0543 15.9635 16.9678 15.8719L15.9517
          14.8558ZM5.25625 16.5834C4.88649 16.5834 4.57076 16.4525 4.30907 16.1908C4.04736 15.9291 3.9165 15.6134 3.9165 15.2436V4.7565C3.9165
          4.38674 4.04736 4.07101 4.30907 3.80931C4.57076 3.5476 4.88649 3.41675 5.25625 3.41675H15.7434C16.1131 3.41675 16.4289 3.5476 16.6906
          3.80931C16.9523 4.07101 17.0831 4.38674 17.0831 4.7565V9.81896C16.9044 9.77636 16.7261 9.74087 16.5482 9.71248C16.3703 9.68408 16.1875
          9.65921 15.9998 9.63789V4.7565C15.9998 4.69239 15.9731 4.63362 15.9197 4.58019C15.8663 4.52677 15.8075 4.50006 15.7434 4.50006H5.25625C5.19214
          4.50006 5.13337 4.52677 5.07994 4.58019C5.02652 4.63362 4.99982 4.69239 4.99982 4.7565V15.2436C4.99982 15.3077 5.02652 15.3665 5.07994
          15.4199C5.13337 15.4734 5.19214 15.5001 5.25625 15.5001H10.1168C10.1322 15.6963 10.1534 15.8816 10.1804 16.0559C10.2074 16.2302 10.2439
          16.406 10.2899 16.5834H5.25625ZM4.99982 15.5001V4.50006V9.63789V9.59623V15.5001ZM6.70817 13.1495C6.70817 13.302 6.76001 13.4311 6.86369
          13.5369C6.96737 13.6427 7.09608 13.6956 7.24982 13.6956H10.2434C10.2936 13.5065 10.3524 13.3232 10.4197 13.1458C10.4869 12.9684 10.5601
          12.7905 10.6393 12.6122H7.24982C7.09608 12.6122 6.96737 12.6637 6.86369 12.7665C6.76001 12.8694 6.70817 12.997 6.70817 13.1495ZM6.70817
          9.99567C6.70817 10.1482 6.76001 10.2773 6.86369 10.3831C6.96737 10.4888 7.09608 10.5417 7.24982 10.5417H12.4085C12.6841 10.3761 12.9595
          10.2287 13.2346 10.0994C13.5097 9.97015 13.8032 9.86919 14.1152 9.79654C14.0778 9.69078 14.0049 9.60798 13.8964 9.54814C13.788 9.48833
          13.6804 9.45842 13.5735 9.45842H7.24982C7.09608 9.45842 6.96737 9.50983 6.86369 9.61267C6.76001 9.71551 6.70817 9.84318 6.70817 9.99567ZM6.70817
          6.84183C6.70817 6.99433 6.76001 7.12346 6.86369 7.22923C6.96737 7.33499 7.09608 7.38787 7.24982 7.38787H13.7498C13.9036 7.38787 14.0323
          7.33645 14.1359 7.2336C14.2396 7.13077 14.2915 7.0031 14.2915 6.8506C14.2915 6.69812 14.2396 6.56899 14.1359 6.46323C14.0323 6.35745 13.9036
          6.30456 13.7498 6.30456H7.24982C7.09608 6.30456 6.96737 6.35598 6.86369 6.45883C6.76001 6.56168 6.70817 6.68935 6.70817 6.84183ZM15.4951
          18.6314C14.4993 18.6314 13.6539 18.2824 12.959 17.5843C12.264 16.8862 11.9165 16.0392 11.9165 15.0434C11.9165 14.0476 12.2656 13.2023 12.9637
          12.5073C13.6618 11.8123 14.5087 11.4648 15.5045 11.4648C16.5003 11.4648 17.3457 11.8139 18.0407 12.512C18.7356 13.2101 19.0831 14.0571 19.0831
          15.0529C19.0831 16.0486 18.7341 16.894 18.0359 17.589C17.3378 18.2839 16.4909 18.6314 15.4951 18.6314Z"
          fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        />
      </g>
    </svg>
  );
}
