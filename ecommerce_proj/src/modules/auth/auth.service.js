import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { AppError } from "../../shared/errors/app-error.js";
import { authRepository } from "./auth.repository.js";

export const authService = {
  async register(input) {
    const existingUser = await authRepository.findByEmail(input.email);
    if (existingUser) {
      throw new AppError(409, "Email is already registered");
    }

    const passwordHash = await bcrypt.hash(input.password, env.BCRYPT_ROUNDS);
    const user = await authRepository.createUser({
      name: input.name,
      email: input.email,
      passwordHash,
    });

    return {
      user,
      accessToken: this.createAccessToken(user.id, user.role),
    };
  },

  async login(input) {
    const user = await authRepository.findByEmail(input.email);

    if (!user || !user.isActive) {
      throw new AppError(401, "Invalid email or password");
    }

    const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);
    if (!passwordMatches) {
      throw new AppError(401, "Invalid email or password");
    }

    const { passwordHash, ...safeUser } = user;
    return {
      user: safeUser,
      accessToken: this.createAccessToken(user.id, user.role),
    };
  },

  createAccessToken(userId, role) {
    return jwt.sign(
      { userId, role },
      env.JWT_ACCESS_SECRET,
      { expiresIn: env.JWT_ACCESS_EXPIRES_IN },
    );
  },
};
