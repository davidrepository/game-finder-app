import { promises as fs } from "fs";
import { DataTypes } from "./types";
import { View } from "@/components";
import styles from "@/modules/page.module.css";

export default async function Home() {
  const file = await fs.readFile(process.cwd() + "/src/data/data.json", "utf8");
  const data: DataTypes = JSON.parse(file);

  return (
    <main className={styles.main}>
      <View initialData={data} />
    </main>
  );
}
