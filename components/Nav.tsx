import React from 'react'
//import { navs } from '@/app/data/data'
import Link from 'next/link'

const navs = [
    {
      id: 1,
      name: 'Home',
      link: '/',
      active: true,
    },
    // {
    //   id: 2,
    //   name: 'Posts',
    //   link: '/postitems',
    //   active: false,
    // },
    // {
    //   id: 4,
    //   name: 'About',
    //   link: '/about',
    //   active: false,
    // },
    // {
    //   id: 5,
    //   name: 'Contact',
    //   link: '/contact',
    //   active: false,
    // },
  ];

export default function Nav() {
  return (
    <nav id="navbar" className='navbar'>
      <ul>
        {navs.map(nav => (
          <li key={nav.id}>
            <Link href={nav.link}>
              {
                nav.name === 'Home' ? <i className='bi bi-house-door-fill'></i> : nav.name
              }
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
