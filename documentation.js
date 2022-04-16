/* import usuariosDoc from './usuarios/documentation/usuarios.documentation'
import groupDoc from './grupos/documentation/group.documentation'
import userAuthDoc from './userAuth/documentation/userAuth.documentation' */
const authDoc = require('./documentation/auth.documentation')
const characterDoc = require('./documentation/character.documentation')
const genreDoc = require('./documentation/genre.documentation')
const movieDoc = require('./documentation/movie.documentation')

const doc_json = {
    openapi: '3.0.1',
    info: {
      version: '0.1.0',
      title: 'Reto Backend',
      description: 'Rest API',
      termsOfService: 'http://api_url/terms/',
      contact: {
        name: 'Enderson Omana',
        email: 'omana.endersonj@gmail.com',
      },
      license: {
        name: 'MIT',
      },
    },
    tags: [
      {
        name: 'BACKEND',
      },
    ],
    paths: {
      ...authDoc.endpoints,
      ...characterDoc.endpoints,
      ...genreDoc.endpoints,
      ...movieDoc.endpoints
    },
    components: {
      schemas: {
        ...authDoc.schemas,
        ...characterDoc.schemas,
        ...genreDoc.schemas,
        ...movieDoc.schemas
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer'
        }
      }
    }
  }
  
  module.exports = { doc_json }