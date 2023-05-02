import mysql from "mysql2/promise";

export async function query({ query, values = [] }: { query: string, values: string[] }) {
    const dbconnection = await mysql.createConnection({
        host: "192.168.11.205",
        database: "radius",
        // port: 8889,
        user: "network_analyzer",
        password: "hannah_montana",
    });
    try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
    } catch (error: any) {
    throw Error(error.message);
    return { error };
    }
}