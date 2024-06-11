import { forwardRef } from 'react';
import { Icon, IconProps } from '@gobob/ui';

const Relay = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} fill='none' viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M299.4 447.057L387.768 396.038V249.701L261.037 176.533L172.76 227.5L299.4 300.615V447.057Z'
      fill='url(#paint0_linear_61_2)'
    />
    <path
      clipRule='evenodd'
      d='M300 128.75L346.737 101.662L304.683 77.3819C301.785 75.709 298.215 75.709 295.317 77.3819L109.548 184.636C106.651 186.309 104.866 189.4 104.866 192.746V407.254C104.866 410.6 106.651 413.692 109.548 415.364L295.317 522.618C298.215 524.291 301.785 524.291 304.683 522.618L490.452 415.364C493.349 413.692 495.134 410.6 495.134 407.254V358.613L448.307 385.625L300 471.25L151.693 385.625V214.375L300 128.75Z'
      fill='url(#paint1_linear_61_2)'
      fillRule='evenodd'
    />
    <path
      d='M407.406 384.568L495.078 333.951V193.022C495.078 189.676 493.292 186.584 490.395 184.911L368.346 114.447L281.771 164.431L407.406 236.966V384.568Z'
      fill='url(#paint2_linear_61_2)'
    />
    <defs>
      <linearGradient
        gradientUnits='userSpaceOnUse'
        id='paint0_linear_61_2'
        x1='241.468'
        x2='207.525'
        y1='193.157'
        y2='429.887'
      >
        <stop stopColor='#624AFF' />
        <stop offset='0.98' stopColor='#DD09FF' />
      </linearGradient>
      <linearGradient
        gradientUnits='userSpaceOnUse'
        id='paint1_linear_61_2'
        x1='180.056'
        x2='234.169'
        y1='494.56'
        y2='49.7161'
      >
        <stop stopColor='#EF41FF' />
        <stop offset='0.67' stopColor='#1F6BFF' />
        <stop offset='1' stopColor='#7DEFFF' />
      </linearGradient>
      <linearGradient
        gradientUnits='userSpaceOnUse'
        id='paint2_linear_61_2'
        x1='372.264'
        x2='319.851'
        y1='86.2467'
        y2='316.686'
      >
        <stop stopColor='#7DEFFF' />
        <stop offset='0.985' stopColor='#5707FF' />
      </linearGradient>
    </defs>
  </Icon>
));

Relay.displayName = 'Relay';

export { Relay };
