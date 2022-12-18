import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const { id } = params;

    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            _count: {
                select: {
                    articles: true,
                    votes: true,
                    comments: true,
                },
            },
        },
    });

    return { user };
};
