# Florence Issue API

## Setup

Install packages:

```
npm install
```

For running gulp tasks you need to install gulp globally:

```
npm install -g gulp
```

## Dependencies

- MongoDB
- gulp globally installed

## Gulp tasks

- `gulp dev` - run server in dev environment
- `gulp test` - run mocha integration and unit tests
- `gulp vet` - run jshint, jscs code inspectors
- `gulp apidoc` - generate api docs

## API docs

After generating api docs they will be available at `/docs` url when running server in development environment (`gulp dev`)

## Assumptions


- Issues only have status and createdAt field for now since requirement did not specified otherwise
- Comments only have text and createdAt field for now since requirement did not specified otherwise (outside of the issue reference)
- Files only have path field (outside of the issue reference)
- Since nothing about authorization was not mentioned I assumed this was not to be implemented
- Outside of the API docs other functions were not commented since all the modules are covered with tests
