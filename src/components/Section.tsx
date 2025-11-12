import React from 'react'
import { useInView } from '../hooks/useInView'

export default function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const [ref, isInView] = useInView()

  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}
    >
      {children}
    </section>
  )
}
