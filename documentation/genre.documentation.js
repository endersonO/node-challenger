const endpoints = {
    '/genre/': {
        get: {
            security: [{
                BearerAuth: []
            }],
            tags: ['Genre'],
            summary: "Get all genre",
            description: '',
            responses: {
                200: {
                    description: 'Get all genre'
                }
            }
        }
    },
    '/genre/{identification}/': {
        get: {
            security: [{
                BearerAuth: []
            }],
            tags: ['Genre'],
            summary: "Get user by ID",
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
                    description: 'genre information'
                }
            }
        }
    },
    '/genre': {
        post: {
            security: [{
                BearerAuth: []
            }],
            tags: ['Genre'],
            summary: "Create genre",
            description: '',
            requestBody: {
                content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/createGenre'
                      }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Genre were create'
                }
            }
        }
    },
    '/genre/{id}/': {
        patch: {
            security: [{
                BearerAuth: []
            }],
            tags: ['Genre'],
            summary: 'edit character',
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
                        $ref: '#/components/schemas/editGenre'
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
    '/genre/{id}': {
        delete: {
            security: [{
                BearerAuth: []
            }],
            tags: ['Genre'],
            summary: 'edit character',
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
    createGenre: {
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
    },
    editGenre: {
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

const genreDoc = {
    endpoints,
    schemas
}

module.exports = genreDoc