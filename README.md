# Tic Tac Toe

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

![img.png](public/demo.png)

## Demo

https://tic-tac-toe-hhh.vercel.app/

## Development

First, install node module:

```bash
yarn
```

Second, run the development server:

```bash
yarn dev
```

## Technical
This project power by NextJS and deploy with Vercel <br/>
Reason choose NextJS for this project
- Performance - Static Site Generation - Next.js can pre-render "Tic tac toe" page at build time
- Developer Experience - Fast Refresh - by using SWC, it's faster than other tool like Create React App

Project structure
```
├── README.md
├── next.config.js
├── package.json
├── pages
│   ├── _app.js
│   └── index.js
├── public
│   ├── demo.png
│   ├── favicon.ico
│   └── vercel.svg
├── styles
│   └── globals.scss
└── yarn.lock
```



