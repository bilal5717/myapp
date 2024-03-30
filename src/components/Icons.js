// here I have used https://react-svgr.com/playground/ to convert svg to react component
// Here are all the svg Icons that I hae used in this project as a react component

export const CodeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" 
  height="30"
  viewBox="0 -960 960 960" 
   width="30"
   {...props}>
  
  <path fill="rgba(255, 255, 255, 0)" d="M0 0h24v24H0z" />
    <path 
    
    fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
    d="M380-740q-33 0-56.5-23.5T300-820q0-33 23.5-56.5T380-900q33 0 56.5 23.5T460-820q0 33-23.5 56.5T380-740ZM120-40l110-564-70 30v134H80v-188l210-86q27-11 55-2.5t43 34.5l38 64q27 44 72.5 71T600-520v80q-66 0-122.5-28T382-544l-24 120 82 82v302h-80v-240l-86-80-70 320h-84Zm550 0v-560H520v-280h360v280H730v560h-60Zm51-601 99-99-99-99-43 43 26 26H580v60h124l-26 26 43 43Z"/>
    
  </svg>
  );
  
  export const HamburgetMenuOpen = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="rgba(255, 255, 255, 0)" d="M0 0h24v24H0z" />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 17h18M3 12h18M3 7h18"
      />
    </svg>
  );
  
  export const HamburgetMenuClose = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="rgba(255, 255, 255, 0)" d="M0 0h24v24H0z" />
      <g fill="none" fillRule="evenodd">
        <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
        <path
          fill="currentColor"
          d="m12 14.121 5.303 5.304a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879 6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.303a1.5 1.5 0 1 0 2.122 2.122L12 14.12Z"
        />
      </g>
    </svg>
  );
  