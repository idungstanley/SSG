import React from 'react';

export default function ShowIcon({ color }: { color: string }) {
  return (
    <div>
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Watchers">
          <mask
            id="mask0_10191_2881"
            style={{ maskType: 'alpha' }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="21"
            height="20"
          >
            <rect id="Bounding box" x="0.5" width="20" height="20" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_10191_2881)">
            <path
              id="visibility"
              // eslint-disable-next-line max-len
              d="M10.5043 13.0016C11.4608 13.0016 12.2724 12.6668 12.9391 11.9972C13.6057 11.3277 13.9391 10.5146 13.9391 9.55815C13.9391 8.60165 13.6043 7.79006 12.9347 7.1234C12.2652 6.45673 11.4521 6.1234 10.4956 6.1234C9.53914 6.1234 8.72755 6.45817 8.06089 7.12773C7.39422 7.79729 7.06089 8.61031 7.06089 9.56681C7.06089 10.5233 7.39566 11.3349 8.06522 12.0016C8.73478 12.6682 9.5478 13.0016 10.5043 13.0016ZM10.5 11.8125C9.87497 11.8125 9.34372 11.5937 8.90622 11.1562C8.46872 10.7187 8.24997 10.1875 8.24997 9.56248C8.24997 8.93748 8.46872 8.40623 8.90622 7.96873C9.34372 7.53123 9.87497 7.31248 10.5 7.31248C11.125 7.31248 11.6562 7.53123 12.0937 7.96873C12.5312 8.40623 12.75 8.93748 12.75 9.56248C12.75 10.1875 12.5312 10.7187 12.0937 11.1562C11.6562 11.5937 11.125 11.8125 10.5 11.8125ZM10.5 15.4166C8.66237 15.4166 6.98369 14.9335 5.46393 13.9671C3.94418 13.0008 2.79221 11.7003 2.00801 10.0657C1.98558 10.0016 1.96395 9.92528 1.94312 9.83679C1.92228 9.74831 1.91187 9.65687 1.91187 9.56248C1.91187 9.46809 1.92228 9.37665 1.94312 9.28817C1.96395 9.19968 1.98558 9.12338 2.00801 9.05927C2.79221 7.42467 3.94634 6.13115 5.47043 5.17869C6.99451 4.22623 8.67103 3.75 10.5 3.75C12.3289 3.75 14.0054 4.22623 15.5295 5.17869C17.0536 6.13115 18.2077 7.42467 18.9919 9.05927C19.0144 9.12338 19.036 9.19968 19.0568 9.28817C19.0777 9.37665 19.0881 9.46809 19.0881 9.56248C19.0881 9.65687 19.0777 9.74831 19.0568 9.83679C19.036 9.92528 19.0144 10.0016 18.9919 10.0657C18.2077 11.7003 17.0558 13.0008 15.536 13.9671C14.0162 14.9335 12.3376 15.4166 10.5 15.4166ZM10.4962 14.0833C12.0543 14.0833 13.4826 13.6771 14.7812 12.8646C16.0798 12.0521 17.0694 10.9514 17.75 9.56248C17.0694 8.17359 16.0792 7.07984 14.7794 6.28123C13.4795 5.48262 12.0524 5.08331 10.4981 5.08331C8.9438 5.08331 7.51386 5.48262 6.2083 6.28123C4.90275 7.07984 3.90969 8.17359 3.22914 9.56248C3.90969 10.9514 4.90148 12.0521 6.20449 12.8646C7.5075 13.6771 8.93806 14.0833 10.4962 14.0833Z"
              fill={color}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
