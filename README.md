# Node-Service-DoConvert

## Description

A document converter service based on [NestJS](https://nestjs.com/).

## API paths
### convert to PDF
```
POST /convert-html-to-pdf
```

### convert to DOCX
#### Request
```
POST /convert-html-to-docx
```
#### Body as multipart/form-data
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
# watch mode
$ npm run start:dev

# production mode
npm run start:prod
```

## License
[MIT licensed](LICENSE).
