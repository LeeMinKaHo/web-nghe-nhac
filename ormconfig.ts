import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type:"mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "LeKhoa@123",
    database: "spotify",
    migrations:['src/database/migrations/*.ts'],
})

export default AppDataSource;