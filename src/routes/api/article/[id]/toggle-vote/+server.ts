import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ params, locals }) => {
    const session: any = await locals.getSession();
    const { id } = params;

    if (!session.user) throw error(401, 'Unauthorized');

    // If user has already voted, delete the vote
    // Otherwise, create a new vote
    const vote = await prisma.vote.findUnique({
        where: {
            articleId_userId: {
                articleId: id,
                userId: session.user.id,
            },
        },
    });

    if (vote) {
        await prisma.vote.delete({
            where: {
                articleId_userId: {
                    articleId: id,
                    userId: session.user.id,
                },
            },
        });
    } else {
        await prisma.vote.create({
            data: {
                article: {
                    connect: {
                        id,
                    },
                },
                user: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
        });
    }

    return new Response(null);
}) satisfies RequestHandler;
