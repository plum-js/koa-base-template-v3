import { CreateStudentRequest } from './api/student/validators/create.validator';

export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    description: 'This is a sample server.',
    version: '1.0.0',
    title: 'Swagger',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'apiteam@swagger.io',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  host: '127.0.0.1:3000',
  tags: [],
  components: {
    securitySchemes: {
      bearer: {
        scheme: 'bearer',
        bearerFormat: 'JWT',
        type: 'http',
      },
    },
    schemas: {
      Pet: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
        },
      },
      Student: CreateStudentRequest,
    },
  },
  security: [
    {
      bearer: [],
    },
  ],
  paths: {
    '/pet': {
      post: {
        tags: ['pet'],
        summary: 'Add a new pet to the store',
        description: '',
        operationId: 'addPet',
        consumes: ['application/json', 'application/xml'],
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Pet object that needs to be added to the store',
            required: true,
            schema: {
              $ref: '#/components/schemas/Pet',
            },
          },
        ],
        responses: {
          '405': {
            description: 'Invalid input',
          },
        },
      },
      put: {
        tags: ['pet'],
        summary: 'Update an existing pet',
        description: '',
        operationId: 'updatePet',
        consumes: ['application/json', 'application/xml'],
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Pet object that needs to be added to the store',
            required: true,
            schema: {
              $ref: '#/components/schemas/Pet',
            },
          },
        ],
        responses: {
          '400': {
            description: 'Invalid ID supplied',
          },
          '404': {
            description: 'Pet not found',
          },
          '405': {
            description: 'Validation exception',
          },
        },
      },
    },
    '/pet/findByStatus': {
      get: {
        tags: ['pet'],
        summary: 'Finds Pets by status',
        description:
          'Multiple status values can be provided with comma separated strings',
        operationId: 'findPetsByStatus',
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            name: 'status',
            in: 'query',
            description: 'Status values that need to be considered for filter',
            required: true,
            type: 'array',
            items: {
              type: 'string',
              enum: ['available', 'pending', 'sold'],
              default: 'available',
            },
            collectionFormat: 'multi',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Pet',
              },
            },
          },
          '400': {
            description: 'Invalid status value',
          },
        },
      },
    },
    '/pet/findByTags': {
      get: {
        tags: ['pet'],
        summary: 'Finds Pets by tags',
        description:
          'Muliple tags can be provided with comma separated strings. Use         tag1, tag2, tag3 for testing.',
        operationId: 'findPetsByTags',
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            name: 'tags',
            in: 'query',
            description: 'Tags to filter by',
            required: true,
            type: 'array',
            items: {
              type: 'string',
            },
            collectionFormat: 'multi',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Pet',
              },
            },
          },
          '400': {
            description: 'Invalid tag value',
          },
        },
      },
    },
    '/pet/{petId}': {
      get: {
        tags: ['pet'],
        summary: 'Find pet by ID',
        description: 'Returns a single pet',
        operationId: 'getPetById',
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            name: 'petId',
            in: 'path',
            description: 'ID of pet to return',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              $ref: '#/components/schemas/Pet',
            },
          },
          '400': {
            description: 'Invalid ID supplied',
          },
          '404': {
            description: 'Pet not found',
          },
        },
      },
      post: {
        tags: ['pet'],
        summary: 'Updates a pet in the store with form data',
        description: '',
        operationId: 'updatePetWithForm',
        consumes: ['application/x-www-form-urlencoded'],
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            name: 'petId',
            in: 'path',
            description: 'ID of pet that needs to be updated',
            required: true,
            type: 'integer',
            format: 'int64',
          },
          {
            name: 'name',
            in: 'formData',
            description: 'Updated name of the pet',
            required: false,
            type: 'string',
          },
          {
            name: 'status',
            in: 'formData',
            description: 'Updated status of the pet',
            required: false,
            type: 'string',
          },
        ],
        responses: {
          '405': {
            description: 'Invalid input',
          },
        },
      },
      delete: {
        tags: ['pet'],
        summary: 'Deletes a pet',
        description: '',
        operationId: 'deletePet',
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            name: 'api_key',
            in: 'header',
            required: false,
            type: 'string',
          },
          {
            name: 'petId',
            in: 'path',
            description: 'Pet id to delete',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          '400': {
            description: 'Invalid ID supplied',
          },
          '404': {
            description: 'Pet not found',
          },
        },
      },
    },
    '/pet/{petId}/uploadImage': {
      post: {
        tags: ['pet'],
        summary: 'uploads an image',
        description: '',
        operationId: 'uploadFile',
        consumes: ['multipart/form-data'],
        produces: ['application/json'],
        parameters: [
          {
            name: 'petId',
            in: 'path',
            description: 'ID of pet to update',
            required: true,
            type: 'integer',
            format: 'int64',
          },
          {
            name: 'additionalMetadata',
            in: 'formData',
            description: 'Additional data to pass to server',
            required: false,
            type: 'string',
          },
          {
            name: 'file',
            in: 'formData',
            description: 'file to upload',
            required: false,
            type: 'file',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              $ref: '#/components/schemas/Pet',
            },
          },
        },
      },
    },
    '/store/inventory': {
      get: {
        tags: ['store'],
        summary: 'Returns pet inventories by status',
        description: 'Returns a map of status codes to quantities',
        operationId: 'getInventory',
        produces: ['application/json'],
        parameters: [],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'object',
              additionalProperties: {
                type: 'integer',
                format: 'int32',
              },
            },
          },
        },
      },
    },
    '/store/order': {
      post: {
        tags: ['store'],
        summary: 'Place an order for a pet',
        description: '',
        operationId: 'placeOrder',
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'order placed for purchasing the pet',
            required: true,
            schema: {
              $ref: '#/components/schemas/Pet',
            },
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              $ref: '#/components/schemas/Pet',
            },
          },
          '400': {
            description: 'Invalid Order',
          },
        },
      },
    },
    '/store/order/{orderId}': {
      get: {
        tags: ['store'],
        summary: 'Find purchase order by ID',
        description:
          'For valid response try integer IDs with value >= 1 and <= 10.         Other values will generated exceptions',
        operationId: 'getOrderById',
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            name: 'orderId',
            in: 'path',
            description: 'ID of pet that needs to be fetched',
            required: true,
            type: 'integer',
            maximum: 10,
            minimum: 1,
            format: 'int64',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              $ref: '#/components/schemas/Pet',
            },
          },
          '400': {
            description: 'Invalid ID supplied',
          },
          '404': {
            description: 'Order not found',
          },
        },
      },
      delete: {
        tags: ['store'],
        summary: 'Delete purchase order by ID',
        description:
          'For valid response try integer IDs with positive integer value.         Negative or non-integer values will generate API errors',
        operationId: 'deleteOrder',
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            name: 'orderId',
            in: 'path',
            description: 'ID of the order that needs to be deleted',
            required: true,
            type: 'integer',
            minimum: 1,
            format: 'int64',
          },
        ],
        responses: {
          '400': {
            description: 'Invalid ID supplied',
          },
          '404': {
            description: 'Order not found',
          },
        },
      },
    },
    '/user': {
      post: {
        tags: ['user'],
        summary: 'Create user',
        description: 'This can only be done by the logged in user.',
        operationId: 'createUser',
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Created user object',
            required: true,
            schema: {
              $ref: '#/components/schemas/Pet',
            },
          },
        ],
        responses: {
          default: {
            description: 'successful operation',
          },
        },
      },
    },
    '/user/createWithArray': {
      post: {
        tags: ['user'],
        summary: 'Creates list of users with given input array',
        description: '',
        operationId: 'createUsersWithArrayInput',
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'List of user object',
            required: true,
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Pet',
              },
            },
          },
        ],
        responses: {
          default: {
            description: 'successful operation',
          },
        },
      },
    },
    '/user/createWithList': {
      post: {
        tags: ['user'],
        summary: 'Creates list of users with given input array',
        description: '',
        operationId: 'createUsersWithListInput',
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'List of user object',
            required: true,
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Pet',
              },
            },
          },
        ],
        responses: {
          default: {
            description: 'successful operation',
          },
        },
      },
    },
    '/user/login': {
      get: {
        tags: ['user'],
        summary: 'Logs user into the system',
        description: '',
        operationId: 'loginUser',
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            name: 'username',
            in: 'query',
            description: 'The user name for login',
            required: true,
            type: 'string',
          },
          {
            name: 'password',
            in: 'query',
            description: 'The password for login in clear text',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'string',
            },
            headers: {
              'X-Rate-Limit': {
                type: 'integer',
                format: 'int32',
                description: 'calls per hour allowed by the user',
              },
              'X-Expires-After': {
                type: 'string',
                format: 'date-time',
                description: 'date in UTC when token expires',
              },
            },
          },
          '400': {
            description: 'Invalid username/password supplied',
          },
        },
      },
    },
    '/user/logout': {
      get: {
        tags: ['user'],
        summary: 'Logs out current logged in user session',
        description: '',
        operationId: 'logoutUser',
        produces: ['application/xml', 'application/json'],
        parameters: [],
        responses: {
          default: {
            description: 'successful operation',
          },
        },
      },
    },
    '/user/{username}': {
      get: {
        tags: ['user'],
        summary: 'Get user by user name',
        description: '',
        operationId: 'getUserByName',
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            name: 'username',
            in: 'path',
            description:
              'The name that needs to be fetched. Use user1 for testing. ',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              $ref: '#/components/schemas/Pet',
            },
          },
          '400': {
            description: 'Invalid username supplied',
          },
          '404': {
            description: 'User not found',
          },
        },
      },
      put: {
        tags: ['user'],
        summary: 'Updated user',
        description: 'This can only be done by the logged in user.',
        operationId: 'updateUser',
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            name: 'username',
            in: 'path',
            description: 'name that need to be updated',
            required: true,
            type: 'string',
          },
          {
            in: 'body',
            name: 'body',
            description: 'Updated user object',
            required: true,
            schema: {
              $ref: '#/components/schemas/Pet',
            },
          },
        ],
        responses: {
          '400': {
            description: 'Invalid user supplied',
          },
          '404': {
            description: 'User not found',
          },
        },
      },
      delete: {
        tags: ['user'],
        summary: 'Delete user',
        description: 'This can only be done by the logged in user.',
        operationId: 'deleteUser',
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            name: 'username',
            in: 'path',
            description: 'The name that needs to be deleted',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '400': {
            description: 'Invalid username supplied',
          },
          '404': {
            description: 'User not found',
          },
        },
      },
    },
  },
};
