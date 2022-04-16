const endpoints = {
    '/characters/': {
        get: {
            security: [{
                BearerAuth: []
            }],
            tags: ['Character'],
            summary: "Get all characters",
            description: '',
            parameters: [
                {
                    name: 'name',
                    in: 'query',
                    description: 'Searching character putting name or partial name, if you put one letter you can get all movies or series that contain that word',
                    schema: {
                        default: 'o'
                    }
                },
                {
                    name: 'movies',
                    in: 'query',
                    description: 'Searching character using movie ID where character participate',
                    schema: {
                        default: 1
                    }
                },
                {
                    name: 'age',
                    in: 'query',
                    description: 'Searching chareters through theirs ageas',
                    schema: {
                        default: 20
                    }
                },
                {
                    name: 'weight',
                    in: 'query',
                    description: 'Searching chareters through theirs weight if you use only this field you get a range 5 values over and 5 values undo',
                    schema: {
                        default: 20
                    }
                },
                {
                    name: 'maxWeight',
                    in: 'query',
                    description: 'Searching chareters through theirs weight you can use with weight field to search in range',
                    schema: {
                        default: 30
                    }
                }
            ],
            responses: {
                201: {
                    description: 'User were create'
                }
            }
        }
    },
    '/characters/{identification}/': {
        get: {
            security: [{
                BearerAuth: []
            }],
            tags: ['Character'],
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
                    description: 'character information'
                }
            }
        }
    },
    '/characters': {
        post: {
            security: [{
                BearerAuth: []
            }],
            tags: ['Character'],
            summary: "Create characters",
            description: '',
            requestBody: {
                content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/createCharacter'
                      }
                    }
                }
            },
            responses: {
                201: {
                    description: 'User were create'
                }
            }
        }
    },
    '/characters/{id}/': {
        patch: {
            security: [{
                BearerAuth: []
            }],
            tags: ['Character'],
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
                        $ref: '#/components/schemas/editCharacter'
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
    '/characters/{id}': {
        delete: {
            security: [{
                BearerAuth: []
            }],
            tags: ['Character'],
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
    createCharacter: {
        type: 'object',
        properties: {
            name: {
                type: "string",
                description: 'Character name',
                default: "woody"
            },
            image:  {
                type: "string",
                description: "Character image", 
                default: "https://placeimg.com/640/480/people"
            },
            age: {
                type: "number",
                description: "character age",
                default: "10"
            },
            weight:  {
                type: "number",
                description: "character weight",
                default: "10"
            },
            story: {
                type: "string",
                description: 'Character story',
                default: "Woody is Andy's toy, when andy doesn't see start amazing adventures"
            },
            movies: {
                type: "array",
                items: {
                    type: "integer",
                    default: 1
                }
            } 
        }
    },
    editCharacter: {
        type: 'object',
        properties: {
            name: {
                type: "string",
                description: 'Character name',
                default: "woody"
            },
            image:  {
                type: "string",
                description: "Character image", 
                default: "https://placeimg.com/640/480/people"
            },
            age: {
                type: "number",
                description: "character age",
                default: "10"
            },
            weight:  {
                type: "number",
                description: "character weight",
                default: "10"
            },
            story: {
                type: "string",
                description: 'Character story',
                default: "Woody is Andy's toy, when andy doesn't see start amazing adventures"
            },
            movies: {
                type: "array",
                items: {
                    type: "integer",
                    default: 1
                }
            } 
        }
    }
}

const characterDoc = {
    endpoints,
    schemas
}

module.exports = characterDoc