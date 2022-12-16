import pkg, { PrismaClient } from '@prisma/client';
import { ENVIRONMENT } from '$env/static/private';

declare global {
    var _prisma: PrismaClient; // eslint-disable-line
}

let localPrisma;

if (ENVIRONMENT === 'development') {
    if (!global._prisma) {
        global._prisma = new PrismaClient();
    }
    localPrisma = global._prisma;
} else {
    const { PrismaClient } = pkg;
    localPrisma = new PrismaClient();
}

export const prisma = localPrisma as PrismaClient;
