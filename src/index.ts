const helloWorld = (data: any, context: any) => {
    return `Hello ${data.name || 'World'}!`;
};

export { helloWorld };
