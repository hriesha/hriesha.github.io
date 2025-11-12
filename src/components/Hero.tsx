import React from 'react'

export default function Hero() {
  return (
    <section id="home" className="pt-12 pb-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-display font-semibold leading-tight">Hriesha Popat</h1>
        <p className="mt-3 text-xl text-gray-700">Informatics student, builder, and trek lover.</p>
        <p className="mt-6 text-gray-700">I work at the intersection of data and product — building useful tools, exploring datasets, and enjoying long treks in the mountains. I love crafting simple, useful experiences and getting outdoors whenever I can.</p>

        <div className="mt-8 flex gap-4">
          <a href="#work" className="btn-primary inline-flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium card-hover">View My Work</a>
          <a href="#contact" className="btn-ghost inline-flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium card-hover">Contact Me</a>
        </div>
      </div>
    </section>
  )
}
