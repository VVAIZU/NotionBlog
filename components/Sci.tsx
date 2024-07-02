import React from 'react'

const scis = [
    {
      id: 1,
      icon: 'bi-facebook',
      link: '',
    },
    {
      id: 2,
      icon: 'bi-twitter-x',
      link: '',
    },
    {
      id: 3,
      icon: 'bi-instagram',
      link: '',
    },
  ];

export default function Sci() {
    return (
        <>
            {scis.map(sci => (
                <a href={sci.link} key={sci.id} target='_blank' className='mx-2'>
                    <span className={sci.icon}></span>
                </a>
            ))}
        </>
    )
}
