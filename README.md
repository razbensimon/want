want
==============

want is a starter template for web application using webpack, angularjs, nodejs (express) and typescript

Building
==============

To build:
```sh
$ yarn install
```
[yarn](https://yarnpkg.com/lang/en/) is the best option, but you can use npm also.

Running
==============

```sh
$ npm start
```

#### Open your browser on port 5000
```sh
http://localhost:5000/
```

Deploy
==============

want is ready for deployment using Heroku.
there is a Procfile, used by heroku to start the application.

```sh
$ git push heroku master
```

Folder Structure
==============
The build has the following structure:
- **\src** -> contains source files
- **\src\app** -> contains typescript files, used for your angularjs application.
- **\src\styles** -> contains SCSS files, used for your global app styles.
- **\dist** -> contains distribution files
- **\bin** -> contains cross platform scripts that used by the package.json file for building Webpack and start the application.
- **\index.ts** -> the main Express application file for execution.
