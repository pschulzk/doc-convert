# Node-Service-DoConvert

## Description

A document converter.

## API paths
### convert to PDF
```
POST /convert-html-to-pdf
```
#### Accepts
```
{
  file: <DOCUMENT TO CONVERT>
}
```
or
```
{
  file: <DOCUMENT TO CONVERT>
}
```
#### Responds

### convert to DOCX
```
POST /convert-html-to-docx
```

## Upload as multipart/form-data
```
{
  file: <DOCUMENT TO CONVERT>
}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

  Nest is [MIT licensed](LICENSE).
