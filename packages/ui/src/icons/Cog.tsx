import { forwardRef } from 'react';

import { Icon, IconProps } from '../components';

const Cog = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M9.59402 3.94C9.68402 3.398 10.154 3 10.704 3H13.297C13.847 3 14.317 3.398 14.407 3.94L14.62 5.221C14.683 5.595 14.933 5.907 15.265 6.091C15.339 6.131 15.412 6.174 15.485 6.218C15.809 6.414 16.205 6.475 16.56 6.342L17.777 5.886C18.0264 5.79221 18.301 5.78998 18.5519 5.87971C18.8028 5.96945 19.0137 6.14531 19.147 6.376L20.443 8.623C20.5761 8.8537 20.623 9.12413 20.5754 9.38617C20.5278 9.6482 20.3887 9.88485 20.183 10.054L19.18 10.881C18.887 11.121 18.742 11.494 18.749 11.873C18.7506 11.958 18.7506 12.043 18.749 12.128C18.742 12.506 18.887 12.878 19.179 13.118L20.184 13.946C20.608 14.296 20.718 14.9 20.444 15.376L19.146 17.623C19.0129 17.8536 18.8022 18.0296 18.5515 18.1195C18.3009 18.2094 18.0264 18.2074 17.777 18.114L16.56 17.658C16.205 17.525 15.81 17.586 15.484 17.782C15.4115 17.8261 15.3382 17.8688 15.264 17.91C14.933 18.093 14.683 18.405 14.62 18.779L14.407 20.059C14.317 20.602 13.847 21 13.297 21H10.703C10.153 21 9.68302 20.602 9.59302 20.06L9.38002 18.779C9.31802 18.405 9.06802 18.093 8.73602 17.909C8.66187 17.8681 8.58852 17.8258 8.51602 17.782C8.19102 17.586 7.79602 17.525 7.44002 17.658L6.22302 18.114C5.97375 18.2075 5.69939 18.2096 5.44872 18.1199C5.19806 18.0302 4.98733 17.8545 4.85402 17.624L3.55702 15.377C3.42397 15.1463 3.37707 14.8759 3.42468 14.6138C3.47229 14.3518 3.61131 14.1152 3.81702 13.946L4.82102 13.119C5.11302 12.879 5.25802 12.506 5.25102 12.127C5.24946 12.042 5.24946 11.957 5.25102 11.872C5.25802 11.494 5.11302 11.122 4.82102 10.882L3.81702 10.054C3.61156 9.88489 3.4727 9.64843 3.42509 9.38662C3.37749 9.12481 3.42424 8.8546 3.55702 8.624L4.85402 6.377C4.98721 6.14614 5.19803 5.97006 5.44894 5.88014C5.69984 5.79021 5.97451 5.79229 6.22402 5.886L7.44002 6.342C7.79602 6.475 8.19102 6.414 8.51602 6.218C8.58802 6.174 8.66202 6.131 8.73602 6.09C9.06802 5.907 9.31802 5.595 9.38002 5.221L9.59402 3.94V3.94Z'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    />
    <path
      d='M15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12V12Z'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    />
  </Icon>
));

Cog.displayName = 'Cog';

export { Cog };
