import { singleton } from "tsyringe";

import db from "../db/index.js";

@singleton()
export default class HealthCheckRepository {
  async dbSelectOne(): Promise<void> {
    await db.execute("SELECT 1");
  }
}
