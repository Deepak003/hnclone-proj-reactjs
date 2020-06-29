# hacker-news in React
By DEEPAK TIWARI , Full Stack Application Architect & Director -UI Practices

## Key Features 
ReactJS-Redux ,100% Google Lighthouse Score , Webpack optimized build for Prod & Dev , SSR , HMR ( Hot Module Reloaing ) ,WDS ( Hot Code Patching Reload ) , Lazy Loading , Neat Architecture , WebSockets for Perfromance , Minified bundling & packing , elinting configuartion , Jenkins Integration , Optimized Images.

Project Submitted at : https://github.com/Deepak003/hnclone-sapient-proj-reactjs/

Project Deployed URL : https://deepak-hnclone-sapient-proj.netlify.app/

I replicated and used API of https://hn.algolia.com/.

##### Preview :
![hacker-news](https://github.com/Deepak003/hnclone-sapient-proj-reactjs/blob/master/hacker-news-screenshot.png)

##### Preview :UpVote & DownVote
![hacker-news](https://github.com/Deepak003/hnclone-sapient-proj-reactjs/blob/master/Capture-upvote.PNG)
![hacker-news](https://github.com/Deepak003/hnclone-sapient-proj-reactjs/blob/master/Capture-downvote.PNG)

##### Preview :Graph
![hacker-news](https://github.com/Deepak003/hnclone-sapient-proj-reactjs/blob/master/Capture-graph.PNG)

##### Google Lighthouse Audit Report :
![hacker-news-Google-LHA-Report](https://github.com/Deepak003/hnclone-sapient-proj-reactjs/blob/master/hnclone-perf-LHA-Report.PNG)

##### Project Architecture with Redux + SSR + Routing + Rendering :
![hacker-news-architecture](https://github.com/Deepak003/hnclone-sapient-proj-reactjs/blob/master/arch-overview.png)

## Features

* Display different types of lists
* Search of item basis Popularity
* Searched words are highlighted
* Search of item basis Date
* Responsive Design | Used Flex layout as UI is simple | Used webkit keyframe animation for loader.
* Used SCSS and node-sass to compile to css.
* Custom pagination
* Websocket for faster fetch of results and update to Change and to prevent any cost incurred on creating new HTTP connections each time.
* Use of HMR - Hot Module reloading
* Use of WDS - Hot live reload on page code patching
* Contains proper dev and prod builds . Production build is optimized and uses minification,obfuscation and svg
* Proper build and bundling tools are used like webpack , yarn.
* React Hooks is also used for implementing infiniteScrolling. However as of now for submission , I have converted to Paggination.
* Google Lighthouse Audit score is 100% for Performance & Best Practices.
* PWA is implemented
* SSR is implemented using react-render-ssr plugin and HtmlWebpackPlugin
* Charts : WIP | Google-Charts library is incorporated ,however as of now due to some error , the view has been made hidden to prevent any UI crash
* Infinity Scrolling is implemented using react-virtualized.
* Redux can be replaced with Context-API's . Code has been written in such a manner that we can easily do so.
* For stability purpose , I have used Redux architecture with Websockets , Service Workers & SSR.

## Development and Build Process

To start the development server, run `npm i && npm start` and have at the `src/`. Files are served from `/build`.

| Command | Description |
| ------- | ----------- |
| `npm start or yarn start` | Starts development server with hot reloading. |
| `npm run build or yarn build` | Runs development build. Outputs files to `/build`. |

## License

Copyright | Sapient India
