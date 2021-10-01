# Next Blog

## Config

You can set up a Next project using `npm create-next-app`, but you can also configure it manually.

- Create a `package.json` file
- Install `next`, `react` and `react-dom` via the command line

Once installed, you can execute `next` commands locally or via `npx`. For example,running `npx next --help` will show a help menu in the terminal.

- Create a `pages` directory in root
- Add any useful scripts to the `package.json`, such as `"dev" : "next dev"`

If you run the dev server now as `npm run dev`, you will get a 404 since we haven't get created any pages. If you create an `index.js` file inside `pages`, this will be your home page.

If uusing version control, you will need a `.gitignore` in the root ignoring the `.next` and `node_modules` directories.

## Production Mode

Normally when developing, we run Next in `dev` mode.

To run in `production`, we first have to 'build' our project, which will create the static pages etc. We will get server logs telling us what has been created. This will create a `pages` subdirectory in the `.next/server` directory.

Once built, we can run `npm start` which will serve the production build on the normal port (3000).

## Routing and Navigation

To add a new page, simply add it to the `pages` folder - the page will be available under the page name as a path from the homepage (i.e. `about.js` will be available at `/about`). Note `index.js` is reserved for the homepage.

You can route between pages using `<a>` tags, but this is not an efficient way to structure your page - every time you click a link, you request a new page from the server. If you use the supplied `Link` tags and pass the `href` to it, then routing will be 'client side' like a regular SPA. Note you can wrap any element to a `Link` tag, such as an image.

We can create reusable components to use in our pages (such as navbars etc) - these should not go in the `pages` directory, otherwise they will be exposed as url paths ny the Next router! It's best to create a dedicated components folder at the root and import as needed.

We can create a custom `_app.js` component at the root of our `pages` directory to act as a template for our other pages - it will take some default props `Component` and `pageProps` as a minimum. Now, we can keep components that are common across all pages (such as a navbar or footer) in our `_app.js` file, and only the page specific info passed as props will rerender on each page change.

The supllied `Head` component can be used to create dynamic document header content, such as page titles and meta tags for SEO.

## Styling

A global `css` file is often a good idea for default styling across an app. You can then import it into your `_app.js` file.

For component level styles, one option is 'styled-jsx', which is created by the Next providers, Vercel. Other options include css modules and Sass. With styled-jsx, you can scope you styles to a given component using a `<style>` tag, and then writing your css rules inside an object with backticks.

We can store public assets such as images and favicons in a `public` folder in our route. They will then be available via the browser URL (i.e. `localhost:3000/robots.txt`). We can also use the public assets. For some reason, when trying to use a favicon, it has to go in a `public/subfolder`, such as an `public/icons` or `public/images` folder, for Next to see it.

## Loading Data

We could individually create pages inside the `pages` directory, but if we have many similar pages with slightly different content (such as blog posts, etc), we can use 'dynamic' routes. We would then need means of loading data from other sources for rendering.

There are many ways of loading data into a Next add, such as `getStaticProps`. The `getStaticProps` function, which has to be exported and async (since it's reading data from somewhere, either locally or over a network), returns a promise object with a `props` property, containing the props that will pass to the component.

Note that `getStaticProps` runs on the server - i.e. in Node.js. This means that Node libraries are available inside the function. We can read files, for example, using the `fs` module Node exposes.

To create dynamic routes, we can use `getStaticPaths` to generate the dynamic pages at build time. These dynamic routes are flagged using square brackets inside the `pages` directory (i.e. `[posts].js`). In conjunction with `getStaticPaths` to generate the slug values, we can generate multiple pages to be exposed under the `path/slug` addresses.

`getStaticPaths` passes an object to `getStaticProps` as a `context` prop, which gives us access to the `getStaticPaths` `params` via the `paths` array. These `params` can then be used to generate individual pages.
