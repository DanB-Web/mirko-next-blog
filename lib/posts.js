import { readFile, readdir } from 'fs/promises'
import matter from 'gray-matter'
import marked from 'marked'

// NOTE NEXT WON'T COMPILE IF THIS AND GETPOSTS AVAILABLE?!? 
// export async function getJSONPost(slug) {
//   const data = await readFile(`content/posts/${slug}.json`, 'utf-8')
//   return JSON.parse(data)
// }

export async function getPost(slug) {
  const source = await readFile(`content/posts/${slug}.md`, 'utf-8')
  const { data, content } = matter(source)
  const html = marked(content)
  return {
    title: data.title,
    date: data.date,
    body: html
  }
}

export async function getSlugs () {
  const suffix = '.md'
  const files = await readdir('content/posts')
  return files.filter(file => file.endsWith(suffix))
              .map(file => file.slice(0, -suffix.length))
}

export async function getPosts () {
  const slugs = await getSlugs()
  const posts = []
  for (const slug of slugs) {
    const post = await getPost(slug)
    posts.push({slug, ...post})
  }
  return posts
}