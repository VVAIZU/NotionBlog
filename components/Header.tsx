'use client';

import React, { useState } from 'react'
import Nav from './Nav';
import Sci from './Sci';
import SearchForm from './SearchForm';

export default function Header() {
    const [open, setOpen] = useState(false);
    const [on, setOn] = useState(false);
  
    const handleFormOpen = (e: Event | any) => {
      e.preventDefault();
      setOpen(!open);
    };
  
    const handleToggleMenu = () => {
      setOn(!on);
      let body: HTMLElement | any = document.querySelector('body');
      body.classList.toggle('mobile-nav-active');
    };
  
    return (
      <header id="header" className='header fixed top-0 w-full bg-gray-200 shadow-md'>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="/" className="logo flex items-center">
            {/* <img src="" alt="" /> */}
            <h1 className="text-xl font-bold">News|Blog</h1>
          </a>
          <div className="relative">
            <Sci />
            <button className='mx-2 focus:outline-none' onClick={handleFormOpen}>
              <span className='bi-search'></span>
            </button>
            {on ? (
              <button
                className='bi bi-x mobile-nav-toggle focus:outline-none'
                onClick={handleToggleMenu}
              ></button>
            ) : (
              <button
                className='bi bi-list mobile-nav-toggle focus:outline-none'
                onClick={handleToggleMenu}
              ></button>
            )}
            <SearchForm active={open} formOpen={handleFormOpen} />
          </div>
        </div>
      </header>
    );
  }