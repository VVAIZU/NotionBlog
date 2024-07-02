import React, { useState, useEffect } from 'react';

export default function Header() {
  const [isSticked, setIsSticked] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsSticked(true);
    } else {
      setIsSticked(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 flex items-center justify-center transition-all duration-500 z-50 bg-gray-100 shadow-md ${isSticked ? 'h-16' : 'h-24'}`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-center w-full h-full">
          <a href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">News|Blog</h1>
          </a>
        </div>
      </div>
    </header>
  );
}


// 'use client';

// import React, { useState, useEffect } from 'react'
// import Nav from './Nav';
// import Sci from './Sci';
// import SearchForm from './SearchForm';

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [on, setOn] = useState(false);
//   const [isSticked, setIsSticked] = useState(false);

//   const handleFormOpen = (e: Event | any) => {
//     e.preventDefault();
//     setOpen(!open);
//   };

//   const handleToggleMenu = () => {
//     setOn(!on);
//     let body: HTMLElement | any = document.querySelector('body');
//     body.classList.toggle('mobile-nav-active');
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsSticked(true);
//       } else {
//         setIsSticked(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <header id="header"
//       className={`fixed-top flex items-center transition-all duration-500 z-[997] bg-[#f2f2f2] ${isSticked ? 'h-[70px]' : 'h-[90px]'}`}>
//       <div className="container-md mx-auto max-w-7xl">
//         <div className="container-fluid container-xl flex items-center justify-between">
//           <a href="/" className="flex items-center">
//             <h1 className="text-[30px] font-[700] text-black">News|Blog</h1>
//           </a>
//         </div>
//       </div>
//     </header>
//   );
// }
