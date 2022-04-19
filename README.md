# Node Challenge

This Is a Challenge Based in Disney library.

## Environments

This project runs with next environments:
```
PORT=3000
DATABASE_URL='postgres://postgres:root@localhost:5432/disney'

JWT_SECRET=

DATABASE_URL_TEST='postgres://postgres:root@localhost:5432/disney_test'

SENDGRID_API_KEY=
SENDGRID_EMAIL= 
```

Where do you defined:
 - Port of you server by default in port 3000.
- DATABASE_URL your postgres database where, you defined in local your dev database or when you deploy you use this environment to set production database
- JWT_SECRET this is required to sign web token and security parameters
- DATABASE_URL_TEST your test database, this must to be different because when test it is running database is completing eraser 
- SENDGRID environments, you need to put your sendgrid account information

## Database 

This project brings you a docker file to build postgres database including Pgadmin to connect, if you already have a postgress database, you don't need to build it.

## Documentation

Docs made using swagger-docs you will find in '/api-docs/' URL before started the project 


## Installation

Use the package manager [npm](https://www.npmjs.com/) to install.

```bash
   npm install
```

## Usage

```
   npm run dev
```
## migration

```
   npm run migrate:run
```
## test

```
   npm run test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)