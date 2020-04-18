



- **Server side routing** The react app is conditionally served depending on the request (in particular, depending on who is viewing the app.). This is done by using a middleware. For more details, [see this](https://stackoverflow.com/questions/48616368/what-is-the-best-way-to-conditionally-serve-static-files-in-express).


- **Route Correctly on Client**The React app has client-level routing as well (routes within the app). If the app is served at a sub-directory, the sub-directory must be passed as the `basename` property of the router. See [this](https://reacttraining.com/react-router/web/api/BrowserRouter) and [this](https://stackoverflow.com/questions/56302254/basename-does-not-seem-to-be-taken-into-account-with-matchpath-in-react-router).


- **Build Correctly for Relative Paths** By default, Create React App produces a build assuming your app is hosted at the server root. If the app is not served in the root directory but a sub-directory, it needs to be ensured that the requests urls in the build are correct. This can be done with the `homepage` property in the `manifest.json` file. For more information, see [this]( https://create-react-app.dev/docs/deployment/) and [this](https://stackoverflow.com/questions/43011207/using-homepage-in-package-json-without-messing-up-paths-for-localhost). If you mention the property as ".", this will make sure that all the asset paths are relative to index.html. You will then be able to move your app from http://mywebsite.com to http://mywebsite.com/relativepath or even http://mywebsite.com/relative/path without having to rebuild it.


- **Route API requests to express on dev Server** See [this](https://www.freecodecamp.org/news/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0/) or [this](https://dev.to/loujaybee/using-create-react-app-with-express) or [this](https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3)









