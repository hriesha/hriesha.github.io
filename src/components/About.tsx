import React from 'react'
import Section from './Section'

export default function About() {
  return (
    <Section id="about" className="py-16">
      <h2 className="text-2xl font-display font-semibold">About Me</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-1">
          <div className="w-40 h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-gray-500">Profile</div>
        </div>
        <div className="md:col-span-2">
          <p className="text-gray-700">I am studying informatics and enjoy building tools that help people make sense of data. I like to work on projects that combine engineering, design and product thinking. Outside of work, I spend as much time as I can on treks, exploring mountains and the outdoors.</p>
          <p className="mt-4 text-gray-700">This site is a lightweight portfolio and journal — everything here is easy to edit via the `src/data` files for projects and treks.</p>
        </div>
      </div>
    </Section>
  )
}
