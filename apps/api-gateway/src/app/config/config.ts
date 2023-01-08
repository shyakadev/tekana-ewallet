export default () => ({
    PORT: process.env.PORT || 3333,
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        dbname: process.env.DB_NAME
    }
})
