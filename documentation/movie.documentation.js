const endpoints = {
    '/movies/': {
        get: {
            security: [{
                BearerAuth: []
            }],
            tags: ['Movie'],
            summary: "Get all movie",
            description: '',
            responses: {
                200: {
                    description: 'Get all movie'
                }
            }
        }
    },
    '/movies/{identification}/': {
        get: {
            security: [{
                BearerAuth: []
            }],
            tags: ['Movie'],
            summary: "Get movie by ID",
            description: '',
            parameters: [
                {
                    name: 'identification',
                    in: 'path',
                    required: true,
                    description: 'id del usuario a solicitar',
                    schema: {
                        default: '1'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'movie information'
                }
            }
        }
    },
    '/movies': {
        post: {
            security: [{
                BearerAuth: []
            }],
            tags: ['Movie'],
            summary: "Create movie",
            description: '',
            requestBody: {
                content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/createMovie'
                      }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Movie were create'
                }
            }
        }
    },
    '/movies/{id}/': {
        patch: {
            security: [{
                BearerAuth: []
            }],
            tags: ['Movie'],
            summary: 'edit movie',
            description: '',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'id del usuario a solicitar',
                    schema: {
                        default: '1'
                    }
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/editMovie'
                      }
                    }
                }
            },
            responses: {
                200: {
                    description: 'User login'
                }
            }
        }
    },
    '/movies/{id}': {
        delete: {
            security: [{
                BearerAuth: []
            }],
            tags: ['Movie'],
            summary: 'Delete Movie',
            description: '',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'id del usuario a solicitar',
                    schema: {
                        default: '1'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'User login'
                }
            }
        }
    }
}

const schemas = {
    createMovie: {
        type: 'object',
        properties: {
            title: {
                type: "string",
                description: 'Character name',
                default: "animation"
            },
            image:  {
                type: "string",
                description: "Character image", 
                default: "https://placeimg.com/640/480/people"
            }
        }
    },
    editMovie: {
        type: 'object',
        properties: {
            name: {
                type: "string",
                description: 'Character name',
                default: "animation"
            },
            image:  {
                type: "string",
                description: "Character image", 
                default: "https://placeimg.com/640/480/people"
            } 
        }
    }
}

const MovieDoc = {
    endpoints,
    schemas
}

module.exports = MovieDoc