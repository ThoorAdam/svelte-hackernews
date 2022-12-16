import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

async function getArticle(id: string) {
    return prisma.article.findUnique({
        where: {
            id,
        },
        include: {
            author: {
                select: {
                    name: true,
                    id: true,
                },
            },
        },
    });
}

async function getVoteCount(id: string) {
    return prisma.vote.count({
        where: {
            article: {
                id,
            },
        },
    });
}

export const load: PageServerLoad = async (event) => {
    const [article, voteCount] = await Promise.all([getArticle(event.params.id), getVoteCount(event.params.id)]);

    return {
        article,
        voteCount,
    };
};
