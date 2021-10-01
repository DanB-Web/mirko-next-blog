# Next Blog

## Config

You can set up a Next project using `npm create-next-app`, but you can also configure it manually.

- Create a `package.json` file
- Install `next`, `react` and `react-dom` via the command line

Once installed, you can execute `next` commands locally or via `npx`. For example,running `npx next --help` will show a help menu in the terminal.

- Create a `pages` directory in root
- Add any useful scripts to the `package.json`, such as `"dev" : "next dev"`

If you run the dev server now as `npm run dev`, you will get a 404 since we haven't get created any pages. If you create an `index.js` file inside `pages`, this will be your home page.
