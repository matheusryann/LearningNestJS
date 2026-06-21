import * as argon2 from 'argon2';

const ARGON2_CONFIG = {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
} as const;

export async function hashPassword(password: string): Promise<string> {
    return argon2.hash(password, ARGON2_CONFIG);
}