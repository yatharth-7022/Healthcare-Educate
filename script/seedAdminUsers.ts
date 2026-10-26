import "dotenv/config";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "../server/db";

/**
 * Creates (or resets) the two admin accounts that can open practice questions while they
 * are locked for everyone else. Safe to re-run: accounts are matched by email.
 *
 * Passwords come from ADMIN_PASSWORD_1 / ADMIN_PASSWORD_2. If one is not set, a random
 * password is generated and printed once. Never commit passwords.
 *
 *   ADMIN_PASSWORD_1='...' ADMIN_PASSWORD_2='...' npx tsx script/seedAdminUsers.ts
 */
const ADMINS = [
  { username: "smashmed_admin_1", email: "admin1@smashmed.test", envVar: "ADMIN_PASSWORD_1" },
  { username: "smashmed_admin_2", email: "admin2@smashmed.test", envVar: "ADMIN_PASSWORD_2" },
];

async function main() {
  for (const admin of ADMINS) {
    const provided = process.env[admin.envVar];
    const password = provided || randomBytes(12).toString("base64url");
    if (password.length < 6) throw new Error(`${admin.envVar} must be at least 6 characters`);

    const hashed = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const user = await prisma.user.upsert({
      where: { email: admin.email },
      update: { password: hashed, isAdmin: true, refreshToken: null },
      create: { username: admin.username, email: admin.email, password: hashed, isAdmin: true },
      select: { id: true, username: true, email: true },
    });

    console.log(
      `Admin #${user.id} ${user.email} (${user.username})` +
        (provided ? " — password set from env" : ` — generated password: ${password}`),
    );
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
