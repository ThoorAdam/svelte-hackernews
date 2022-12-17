import { prisma } from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
    const session: any = await event.locals.getSession();
    let voteCount: number;

    if (session?.user) {
        voteCount = await prisma.vote.count({
            where: {
                user: {
                    id: session?.user?.id,
                },
            },
        });
    }

    return {
        session,
        voteCount,
    };
};
