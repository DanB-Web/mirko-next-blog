import Head from 'next/head'
//import { getJSONPost } from '../../lib/posts' 
import { getPost, getSlugs } from '../../lib/posts' 

//EXAMPLE READING JSON FROM FILE SYSTEM
// export async function getStaticProps () {
//   const post = await getJSONPost('first-post')
//   return {
//     props: {
//       post
//     }
//   }
// }

export async function getStaticPaths () {
  const slugs = await getSlugs()
  return {
    //Map from slug function
    paths: slugs.map(slug => ({ 
      params:  { slug } 
    })),
    //Manually add slugs
    // paths: [
    //    { params: { slug: "first-post"}},
    //    { params: { slug: "second-post"}},
    //    { params: { slug: "third-post"}}
    // ],
    fallback: false
  }
}

export async function getStaticProps (context) {
  const { params : { slug }} = context
  const post = await getPost(slug)
  return {
    props: {
      post
    }
  }
}

const PostPage = ({post}) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" value="This is my about"></meta>
      </Head>
      <main>
        <p>{post.date}</p>
        <h1>{post.title}</h1>
        <article dangerouslySetInnerHTML={{__html: post.body}}/>
      </main>
    </>
  )
}

export default PostPage