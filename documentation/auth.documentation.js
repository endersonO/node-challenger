const endpoints = {
    '/auth/register': {
        post: {
            tags: ['Auth'],
            summary: "Create a new user",
            description: '',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/register'
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
    '/auth/login': {
        post: {
            tags: ['Auth'],
            summary: "User Login",
            description: '',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/login'
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
    }
}

const schemas = {
    register: {
        type: 'object',
        properties: {
            email: {
                type: "string",
                description: 'User Email',
                default: "example@mail.com"
            },
            password:  {
                type: "string",
                description: 'User Password',
                default: "ax12XSA&ads"
            }
        }
    },
    login: {
        type: 'object',
        properties: {
            email: {
                type: "string",
                description: 'User Email',
                default: "example1@mail.com"
            },
            password:  {
                type: "string",
                description: 'User Password',
                default: "ax12XSA&ads"
            }
        }
    }
}

const authDoc = {
    endpoints,
    schemas
}

module.exports = authDoc