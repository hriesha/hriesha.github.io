export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  link: string
}

export interface Trek {
  id: string
  name: string
  location: string
  description: string
  year?: string
}
