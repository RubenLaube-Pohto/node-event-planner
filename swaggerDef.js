module.exports = {
    openapi: '3.0.0',
    servers: [
        {
            url:
                'https://europe-west1-event-planner-245013.cloudfunctions.net/eventPlanner/api/v1',
            description: 'GCP Functions',
        },
        {
            url: 'http://localhost:8080/api/v1',
            description: 'Localhost',
        },
    ],
    info: {
        // API informations (required)
        title: 'Event Planner', // Title (required)
        version: '0.0.1', // Version (required)
    },
    components: {
        parameters: {
            // Commonly used param id in path
            IdParam: {
                name: 'id',
                in: 'path',
                required: true,
                description: 'Item id',
                schema: {
                    type: 'string',
                },
            },
        },
    },
    apis: ['./src/**/*.ts'],
};
