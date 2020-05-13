


# Architecture

Both the frontend (static React app) and backend are served by the same Express server (container name: gwas-frontend) . This server communicates with a MongoDB Server hosted separately (container name: gwas-db).

The configuration for the Mongodb database selecs for the right address based on the environmental variable `process.env.NODE_ENV`, which is set to `production` with the `environment` option in the docker-compose file (`environment:  NODE_ENV=production`)

- Reads the `X-Forwarded-User` request header and checks it against the list of whitelisted users obtained from the mounted `gwas_whitelist` file.  If the check passes, it proceeds with route handling in the next steps.
- The routes of the form  `/gwas/api` (e.g. `gwas/api/phenotypes`) are handled by route handlers (pieces of code which contain business logic and invoke queries on database)
- The route `/gwas` serves the static `public` folder which has our React build on the `/gwas` route using `Express.static` API`



# Routing


Routing a web app deployed on swarm is tricky: it takes place on several levels (build path, client-side, server-side, proxy-server)

- **Client-Side vs Server-Side Routing** If you're navigating within the React application, refreshing the page might return a `404`. There are ways to fix this but its non-trivial.  Read [this](https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually). But one workaround would be to enable the cache-first behavior in production (currently disabled: see below on how to do this)

- **Server side routing** The react app is conditionally served depending on the request (in particular, depending on who is viewing the app.). This is done by using a middleware. For more details, [see this](https://stackoverflow.com/questions/48616368/what-is-the-best-way-to-conditionally-serve-static-files-in-express).


- **Route Correctly on Client** The React app has client-level routing as well (routes within the app). If the app is served at a sub-directory, the sub-directory must be passed as the `basename` property of the router. See [this](https://reacttraining.com/react-router/web/api/BrowserRouter) and [this](https://stackoverflow.com/questions/56302254/basename-does-not-seem-to-be-taken-into-account-with-matchpath-in-react-router).


- **Build Correctly for Relative Paths** By default, Create React App produces a build assuming your app is hosted at the server root. If the app is not served in the root directory but a sub-directory, it needs to be ensured that the requests urls in the build are correct. This can be done with the `homepage` property in the `manifest.json` file. For more information, see [this]( https://create-react-app.dev/docs/deployment/) and [this](https://stackoverflow.com/questions/43011207/using-homepage-in-package-json-without-messing-up-paths-for-localhost). If you mention the property as ".", this will make sure that all the asset paths are relative to index.html. You will then be able to move your app from http://mywebsite.com to http://mywebsite.com/relativepath or even http://mywebsite.com/relative/path without having to rebuild it.


- **Route API requests to express on dev Server** To facilitate local development, see [this](https://www.freecodecamp.org/news/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0/) or [this](https://dev.to/loujaybee/using-create-react-app-with-express) or [this](https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3)



# Whitelist

The application server reads the `X-Forwarded-User` header in the requests to decide whether to allow access to the application or not. Within the swarm, this header is set by the `auth` layer and then forwarded by the nginx proxy server. Outside the swarm (in your local dev environment or a remote test environment), you might need to set this header manually. Alternatively, you could modify disable the whitelist feature for by commenting out the `checkUser` middleware in the `server` file, or use a `server_test` server file without `checkUser`.

The whitelist can be modified by changing the `gwas_whitelist.js` file which looks like this:

```
let whitelist = [
    "pa10",
    "pa11",
    "vvi",
    "ns6",
    "kk8",
    "kw8",
    "pa9",
    "ss49",
    "lb17",
    "as45",
    "hp3",
    "ps629",
    "asb38"
]

```



# Plots

The files containing the plots are supposed to be within the `public/data/img/` directory of the app from which they are served. This directly is currently not hosted in the github repo for security reasons. Instead, the direcory is baked into the `gwas-frontend` docker image and has to be manually transfered if new data comes in. This would require transfering the files to the docker node and then transfering them from the node to the running container with the `docker cp` command.  

However, this is not optimal as it greatly increases both the size of the image and the ugliness of finding the right node and then ssh into the container. A better way would be to keep the images on the host and mount them into the container as a volume. Keep in mind that the service would need to be redeployed everytime new data comes in for it to be mounted. UPDATE: This is done in the latest version of the image (mercury/gwasplots:1.4). 



# API Reference


- GET api/phenotypes
    - queries the database "Phenotypes" collection 
- GET api/variants/<phenotype.name>
    - queries the database "Variants" collection
- GET data/img/INT-WGS-nmr_mldlce-QQplot.html
    - Fetches the file from the public folder as opposed to the database
- POST api/upload/variants
    - Used to upload tsv files such as `nmr_wgs_p5e-8_24-03-2020.txt`
    - The tsv is converted to a json array and sent as body of HTTP POST request 
- POST api/upload/phenotypes





# Data Model

**Collection: Phenotypes**

Sample Document

```
{"id": 1, 
"project": "WGS", 
"category": "nmr", 
"name": "nmr_mldlce", 
"qqplot": "data/img/INT-WGS-nmr_mldlce-QQplot.html", 
"manhattan": "data/img/INT-WGS-nmr_mldlce-manhattan.html"}
```

**Collection: Variants**

Sample Document:

```
{"_id":{"$oid":"5e82f07436c252cd2a4d5b3b"},
"locus":"chr1:180588474",
"rsid":"rs116336539",
"REF":"G",
"ALT":"T",
"n":11381,
"AF":0.00084296,
"beta":-1.2632,
"se":0.22942,
"p":3.751E-08,
"phenotype":"nmr_ala"}
```




#  Cache-First Behavior (Currently Disabled)

The cache-first behavior can be enabled by changing `serviceWorker.unregister()` to `serviceWorker.register()` in the `src/index.js` file. For more information on this, see [this official doc](https://create-react-app.dev/docs/making-a-progressive-web-app/)

This will actually make local development and testing a nightmare (as you would have to manually clear the cache and even then cache behavior is not what you would expect), so I wouldn't recommend using it.


# Swarm Deployment Instructions
The container definitions in the compose-file in the swarm are as follows:

**Express Server**
```
gwas-frontend:
    image: mercury/gwasplots:1.0
    environment:
      - NODE_ENV=production
    configs:
      - source: gwas_whitelist
        target: /usr/src/app/whitelist.js
    command: "node server.js"
    depends_on:
      - gwas-db
    networks: [app]
```


```
configs:
   gwas_whitelist:
      file: gwas_whitelist.js

```



**MongoDB**

Containers within a swarm can be replicated, allocated to a different host, shut down, restarted etc. Hence they are not really defined for persisting state, as is required by a db.  

> The image defined by your Dockerfile should generate containers that are as ephemeral as possible. By “ephemeral”, we mean that the container can be stopped and destroyed, then rebuilt and replaced with an absolute minimum set up and configuration.


One workaround to persisting state is to create a volume and bind mount it to a container. But for this to work, the data stored in the volume must be in the same node as where the container is deployed. Hence, sometimes it is useful to define constraints in the compose file to restrict the container to a particular node. We do this, for example, in the db container for gwas app as shown:

```
  gwas-db:
    image: mongo:bionic
    volumes:
      - gwasdb:/data/db
    networks: [app]
    deploy:
      placement:
        constraints:
          - "node.role==manager"
```

```
volumes:
  gwasdb:
    driver: local
```


The nginx configration for routing is as follows:

```
 location  /gwas {
            auth_request /auth-proxy;
            auth_request_set $x_forwarded_user $upstream_http_x_forwarded_user;
            # redirect 401 to login form
            # Comment them out if using HTTP basic authentication.
            # or authentication popup won't show
            error_page 401 =200 /login;
            proxy_pass http://gwas-frontend:8080;
            proxy_set_header X-Forwarded-User $x_forwarded_user;
            proxy_set_header Host            $host;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            add_header Cache-Control "no-store, no-cache, must-revalidate, post-check=0, pre-check=0";
        }
```


