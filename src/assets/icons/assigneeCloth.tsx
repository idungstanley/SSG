import React, { ReactNode } from 'react';

interface assigneeCloth {
  children?: ReactNode;
  height?: string;
  width?: string;
}
export default function AssigneeCloth({ height = '23', width = '23', children }: assigneeCloth) {
  return (
    <div className="relative flex">
      <svg width={width} height={height} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          // eslint-disable-next-line max-len
          d="M11.5764 2.22015C11.8718 1.55904 12.3523 0.997591 12.9599 0.603619C13.5674 0.209646 14.276 0 15.0002 0C15.7243 0 16.4329 0.209646 17.0404 0.603619C17.648 0.997591 18.1285 1.55904 18.4239 2.22015C19.0103 1.79456 19.7074 1.54795 20.4309 1.51015C21.1545 1.47234 21.8735 1.64495 22.5011 2.00712C23.1286 2.36928 23.6378 2.90548 23.967 3.55089C24.2963 4.19629 24.4315 4.92326 24.3564 5.6439C25.077 5.56877 25.804 5.70401 26.4494 6.03327C27.0948 6.36253 27.631 6.87172 27.9932 7.49925C28.3553 8.12679 28.528 8.8458 28.4902 9.56936C28.4523 10.2929 28.2057 10.99 27.7802 11.5764C28.4413 11.8718 29.0027 12.3523 29.3967 12.9599C29.7907 13.5674 30.0003 14.276 30.0003 15.0002C30.0003 15.7243 29.7907 16.4329 29.3967 17.0404C29.0027 17.648 28.4413 18.1285 27.7802 18.4239C28.2057 19.0103 28.4523 19.7074 28.4902 20.4309C28.528 21.1545 28.3553 21.8735 27.9932 22.5011C27.631 23.1286 27.0948 23.6378 26.4494 23.967C25.804 24.2963 25.077 24.4315 24.3564 24.3564C24.4315 25.077 24.2963 25.804 23.967 26.4494C23.6378 27.0948 23.1286 27.631 22.5011 27.9932C21.8735 28.3553 21.1545 28.528 20.4309 28.4902C19.7074 28.4523 19.0103 28.2057 18.4239 27.7802C18.1285 28.4413 17.648 29.0027 17.0404 29.3967C16.4329 29.7907 15.7243 30.0003 15.0002 30.0003C14.276 30.0003 13.5674 29.7907 12.9599 29.3967C12.3523 29.0027 11.8718 28.4413 11.5764 27.7802C10.99 28.2057 10.2929 28.4523 9.56936 28.4902C8.8458 28.528 8.12679 28.3553 7.49925 27.9932C6.87172 27.631 6.36253 27.0948 6.03327 26.4494C5.70401 25.804 5.56877 25.077 5.6439 24.3564C4.92326 24.4315 4.19629 24.2963 3.55089 23.967C2.90548 23.6378 2.36928 23.1286 2.00712 22.5011C1.64495 21.8735 1.47234 21.1545 1.51015 20.4309C1.54795 19.7074 1.79456 19.0103 2.22015 18.4239C1.55904 18.1285 0.997591 17.648 0.603619 17.0404C0.209646 16.4329 0 15.7243 0 15.0002C0 14.276 0.209646 13.5674 0.603619 12.9599C0.997591 12.3523 1.55904 11.8718 2.22015 11.5764C1.79456 10.99 1.54795 10.2929 1.51015 9.56936C1.47234 8.8458 1.64495 8.12679 2.00712 7.49925C2.36928 6.87172 2.90548 6.36253 3.55089 6.03327C4.19629 5.70401 4.92326 5.56877 5.6439 5.6439C5.56877 4.92326 5.70401 4.19629 6.03327 3.55089C6.36253 2.90548 6.87172 2.36928 7.49925 2.00712C8.12679 1.64495 8.8458 1.47234 9.56936 1.51015C10.2929 1.54795 10.99 1.79456 11.5764 2.22015ZM15.0002 1.87515C14.7494 1.87554 14.5013 1.92621 14.2705 2.02416C14.0398 2.12211 13.8309 2.26535 13.6565 2.44541C13.482 2.62547 13.3454 2.83869 13.2548 3.07246C13.1642 3.30623 13.1214 3.5558 13.1289 3.8064L13.1477 3.97703C13.1702 4.1214 13.202 4.30703 13.2489 4.53203C13.3408 4.9839 13.4777 5.54828 13.6483 6.19515C13.9895 7.48515 14.4508 9.03203 14.9158 10.5339L15.0002 10.8039L15.0845 10.5339C15.5495 9.0339 16.0108 7.48515 16.352 6.19515C16.5227 5.54828 16.6595 4.9839 16.7514 4.53203C16.8008 4.29244 16.8409 4.051 16.8714 3.80828L16.8752 3.75015C16.8752 3.25287 16.6776 2.77596 16.326 2.42433C15.9743 2.0727 15.4974 1.87515 15.0002 1.87515ZM3.75015 16.8752L3.8064 16.8714L3.97703 16.8527C4.163 16.8245 4.34809 16.7907 4.53203 16.7514C4.9839 16.6595 5.54828 16.5227 6.19515 16.352C7.64966 15.9583 9.0962 15.5358 10.5339 15.0845L10.8039 15.0002L10.5339 14.9158C9.0962 14.4645 7.64966 14.042 6.19515 13.6483C5.64452 13.5 5.08993 13.3669 4.53203 13.2489C4.29244 13.1995 4.051 13.1594 3.80828 13.1289L3.75015 13.1252C3.25287 13.1252 2.77596 13.3227 2.42433 13.6743C2.0727 14.026 1.87515 14.5029 1.87515 15.0002C1.87515 15.4974 2.0727 15.9743 2.42433 16.326C2.77596 16.6776 3.25287 16.8752 3.75015 16.8752ZM16.8752 26.2502L16.8714 26.1939C16.8409 25.9512 16.8008 25.7097 16.7514 25.4702C16.6338 24.9116 16.5006 24.3563 16.352 23.8052C15.9583 22.3506 15.5358 20.9041 15.0845 19.4664L15.0002 19.1964L14.9158 19.4664C14.4508 20.9664 13.9895 22.5152 13.6483 23.8052C13.4777 24.452 13.3408 25.0164 13.2489 25.4683C13.1995 25.7079 13.1594 25.9493 13.1289 26.192L13.1252 26.2502C13.1252 26.7474 13.3227 27.2243 13.6743 27.576C14.026 27.9276 14.5029 28.1252 15.0002 28.1252C15.4974 28.1252 15.9743 27.9276 16.326 27.576C16.6776 27.2243 16.8752 26.7474 16.8752 26.2502ZM6.19515 22.2489L6.24203 22.217C6.4374 22.0695 6.62692 21.9144 6.81015 21.752C7.15515 21.4445 7.57515 21.0452 8.04953 20.5727C9.11296 19.5047 10.155 18.4158 11.1752 17.3064L11.3683 17.0983L11.0927 17.1602C9.62134 17.4886 8.15668 17.8462 6.69953 18.2327C6.05453 18.407 5.49953 18.5702 5.06078 18.7164C4.82815 18.7937 4.5986 18.88 4.37265 18.9752L4.32203 19.0014C4.10707 19.1236 3.9184 19.2871 3.7669 19.4826C3.6154 19.678 3.50405 19.9015 3.43926 20.1401C3.37447 20.3787 3.35752 20.6278 3.3894 20.873C3.42127 21.1183 3.50133 21.3547 3.62497 21.5689C3.74861 21.783 3.91339 21.9706 4.10982 22.1208C4.30624 22.271 4.53044 22.3809 4.7695 22.4441C5.00856 22.5073 5.25777 22.5226 5.50276 22.4891C5.74776 22.4556 5.98371 22.374 6.19703 22.2489H6.19515ZM8.43765 26.3664C8.8683 26.615 9.38008 26.6824 9.8604 26.5537C10.3407 26.425 10.7503 26.1108 10.9989 25.6802L11.0252 25.6295C11.0439 25.592 11.0645 25.5395 11.0927 25.472C11.1616 25.2971 11.2254 25.1201 11.2839 24.9414C11.4302 24.5045 11.5933 23.9477 11.7677 23.3027C12.1543 21.8455 12.5118 20.3809 12.8402 18.9095L12.902 18.6339L12.6958 18.8252C11.5859 19.8453 10.4963 20.8874 9.42765 21.9508C9.02358 22.3527 8.63031 22.7654 8.24828 23.1883C8.08597 23.3722 7.93085 23.5623 7.78328 23.7583L7.7514 23.8052C7.50277 24.2358 7.4354 24.7476 7.56409 25.2279C7.69279 25.7082 8.00702 26.1178 8.43765 26.3664ZM25.6802 10.9989C26.1073 10.7485 26.418 10.3393 26.5446 9.86062C26.6712 9.38194 26.6032 8.87264 26.3557 8.44385C26.1081 8.01506 25.701 7.7016 25.2231 7.57187C24.7453 7.44215 24.2356 7.50668 23.8052 7.7514L23.7583 7.78328C23.5628 7.93073 23.3733 8.08585 23.1902 8.24828C22.7664 8.63003 22.3531 9.0233 21.9508 9.42765C20.8874 10.4956 19.8453 11.5846 18.8252 12.6939L18.6339 12.902L18.9095 12.8402C20.3802 12.5118 21.8443 12.1542 23.3008 11.7677C23.9477 11.5933 24.5045 11.4302 24.9414 11.2839C25.1741 11.2067 25.4036 11.1204 25.6295 11.0252C25.6466 11.0169 25.6635 11.0081 25.6802 10.9989ZM21.5627 3.6339C21.132 3.38527 20.6202 3.31789 20.1399 3.44659C19.6596 3.57529 19.25 3.88951 19.0014 4.32015L18.9752 4.37078C18.9564 4.40828 18.9358 4.46078 18.9077 4.52828C18.8387 4.70323 18.7749 4.88018 18.7164 5.0589C18.5702 5.49578 18.407 6.05265 18.2327 6.69953C17.8461 8.15602 17.4885 9.62006 17.1602 11.0908L17.0983 11.3664L17.3045 11.1752C18.4144 10.155 19.504 9.11289 20.5727 8.04953C21.0452 7.57515 21.4445 7.15515 21.752 6.81203C21.9144 6.62818 22.0695 6.43804 22.217 6.24203L22.2489 6.19515C22.4975 5.7645 22.5649 5.25273 22.4362 4.7724C22.3075 4.29208 21.9933 3.88255 21.5627 3.6339ZM26.2502 16.8752C26.7474 16.8752 27.2243 16.6776 27.576 16.326C27.9276 15.9743 28.1252 15.4974 28.1252 15.0002C28.1252 14.5029 27.9276 14.026 27.576 13.6743C27.2243 13.3227 26.7474 13.1252 26.2502 13.1252L26.1939 13.1289C25.9512 13.1594 25.7097 13.1995 25.4702 13.2489C25.0164 13.3408 24.452 13.4777 23.8052 13.6483C22.5152 13.9895 20.9683 14.4508 19.4664 14.9158L19.1964 15.0002L19.4664 15.0845C20.9664 15.5495 22.5152 16.0108 23.8052 16.352C24.452 16.5227 25.0164 16.6595 25.4683 16.7514C25.7079 16.8008 25.9493 16.8409 26.192 16.8714L26.2502 16.8752ZM3.6339 8.43765C3.50867 8.65503 3.42833 8.89533 3.39764 9.14432C3.36696 9.39331 3.38655 9.64592 3.45526 9.8872C3.52398 10.1285 3.64041 10.3535 3.79767 10.549C3.95492 10.7444 4.14981 10.9064 4.37078 11.0252L4.52828 11.0908C4.66328 11.147 4.83953 11.2108 5.0589 11.2839C5.49578 11.4302 6.05265 11.5933 6.69765 11.7677C8.1548 12.1541 9.61946 12.5117 11.0908 12.8402L11.3664 12.902L11.1733 12.6939C10.1538 11.5845 9.11234 10.4956 8.04953 9.42765C7.64783 9.02334 7.23518 8.63007 6.81203 8.24828C6.62819 8.08587 6.43804 7.93075 6.24203 7.78328L6.19515 7.7514C5.7645 7.50277 5.25273 7.4354 4.7724 7.56409C4.29208 7.69279 3.88255 8.00702 3.6339 8.43765ZM7.7514 6.19515L7.78328 6.24203C7.93079 6.43741 8.08591 6.62693 8.24828 6.81015C8.55578 7.15515 8.95515 7.57515 9.42765 8.04953C10.4956 9.11296 11.5845 10.155 12.6939 11.1752L12.902 11.3664L12.8402 11.0908C12.5118 9.62006 12.1542 8.15602 11.7677 6.69953C11.5933 6.05265 11.4302 5.49578 11.2839 5.0589C11.2067 4.82624 11.1204 4.59668 11.0252 4.37078L10.9989 4.32015C10.8767 4.10519 10.7132 3.91653 10.5177 3.76503C10.3223 3.61352 10.0988 3.50217 9.8602 3.43738C9.62156 3.37259 9.37247 3.35565 9.12726 3.38752C8.88204 3.41939 8.64556 3.49945 8.43141 3.6231C8.21727 3.74674 8.02969 3.91151 7.87949 4.10794C7.72929 4.30437 7.61942 4.52857 7.55622 4.76763C7.49301 5.00669 7.47772 5.25589 7.51122 5.50089C7.54472 5.74588 7.62634 5.98183 7.7514 6.19515ZM26.3664 21.5627C26.615 21.132 26.6824 20.6202 26.5537 20.1399C26.425 19.6596 26.1108 19.25 25.6802 19.0014L25.6295 18.9752C25.4036 18.8799 25.1741 18.7936 24.9414 18.7164C24.5045 18.5702 23.9477 18.407 23.3008 18.2327C21.8443 17.8461 20.3802 17.4885 18.9095 17.1602L18.6339 17.0983L18.8252 17.3064C19.8453 18.4157 20.8874 19.5047 21.9508 20.5727C22.4252 21.0452 22.8452 21.4445 23.1883 21.752C23.3721 21.9145 23.5622 22.0696 23.7583 22.217L23.8052 22.2489C24.2358 22.4975 24.7476 22.5649 25.2279 22.4362C25.7082 22.3075 26.1178 21.9933 26.3664 21.5627ZM19.0014 25.6802C19.2518 26.1073 19.661 26.418 20.1397 26.5446C20.6184 26.6712 21.1277 26.6032 21.5565 26.3557C21.9852 26.1081 22.2987 25.701 22.4284 25.2231C22.5582 24.7453 22.4936 24.2356 22.2489 23.8052L22.217 23.7583C22.0694 23.563 21.9143 23.3735 21.752 23.1902C21.3703 22.7664 20.977 22.3531 20.5727 21.9508C19.5048 20.8873 18.4158 19.8452 17.3064 18.8252L17.0983 18.6339L17.1602 18.9095C17.4885 20.3802 17.8461 21.8443 18.2327 23.3008C18.407 23.9477 18.5702 24.5045 18.7164 24.9414C18.7936 25.1741 18.8799 25.4036 18.9752 25.6295C18.9835 25.6466 18.9922 25.6635 19.0014 25.6802ZM15.0002 17.8127C15.7461 17.8127 16.4614 17.5163 16.9889 16.9889C17.5163 16.4614 17.8127 15.7461 17.8127 15.0002C17.8127 14.2542 17.5163 13.5389 16.9889 13.0114C16.4614 12.484 15.7461 12.1877 15.0002 12.1877C14.2542 12.1877 13.5389 12.484 13.0114 13.0114C12.484 13.5389 12.1877 14.2542 12.1877 15.0002C12.1877 15.7461 12.484 16.4614 13.0114 16.9889C13.5389 17.5163 14.2542 17.8127 15.0002 17.8127Z"
          fill="#0157FF"
        />
      </svg>
      {children}
    </div>
  );
}
