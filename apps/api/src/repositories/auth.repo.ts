import { singleton } from "tsyringe";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { hash, compare } from "bcrypt";

import { JWT_SECRET } from "../secrets.js";
import { candidates } from "../db/schema.js";
import db from "../db/index.js";
import type { AuthResponse, LoginDTO, RegisterDTO } from "@hireflow/types";

@singleton()
export default class AuthRepository {
  async login(dto: LoginDTO): Promise<AuthResponse> {
    const [user] = await db.select().from(candidates).where(eq(candidates.email, dto.email));
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await compare(dto.password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return { user: { id: user.id, name: user.name, email: user.email }, token };
  }

  async register(dto: RegisterDTO): Promise<AuthResponse> {
    const existing = await db.select().from(candidates).where(eq(candidates.email, dto.email));
    if (existing.length > 0) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hash(dto.password, 10);

    const [user] = await db
      .insert(candidates)
      .values({
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      })
      .returning();

    if (user === undefined) {
      throw new Error("Candidate insertion failed");
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    return { user: { id: user.id, name: user.name, email: user.email }, token };
  }
}
