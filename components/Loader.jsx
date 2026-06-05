'use client'

import { useEffect, useState } from 'react'
import AMKLogo from './AMKLogo'

export default function Loader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 1300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className={`
        fixed inset-0 bg-black z-[9999]
        flex flex-col items-center justify-center gap-5
        transition-all duration-700
        ${hidden ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}
      `}
    >
      <div className="animate-loader-pulse">
        <AMKLogo size={64} />
      </div>
      <div className="loader-bar" />
      <p
        className="text-[9px] tracking-[0.35em] uppercase text-silver-mid mt-1"
      >
        London Building Construction
      </p>
    </div>
  )
}
