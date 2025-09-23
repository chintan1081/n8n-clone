import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    schema: 'core',
    url: `${process.env.DATABASE_URL}`,
    synchronize: true,
    logging: true,
    entities: [__dirname + "/../entities/**/*.entity.{ts,js}"],
    migrations: []
})

export const connectDb = async () => {
  console.log("DB URL:", process.env.DATABASE_URL);

  try {
    await AppDataSource.initialize();
    console.log("✅ Connected to DB");
  } catch (err) {
    console.error("❌ Error connecting to DB:", err);
  }
};