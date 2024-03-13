import mysql from 'mysql2/promise';

const connectionConfig = {
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

function createResponse(statusCode, body) {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
}

export const lambdaHandler = async (event, context) => {
    try {
        const connection = await mysql.createConnection(connectionConfig);
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        await connection.end();
        return createResponse(200, { message: 'success',rows: rows });
    } catch (error) {
        console.error('Error executing SQL query:', error);
        return createResponse(500, { message: 'error', error: error.message });
    }
};
