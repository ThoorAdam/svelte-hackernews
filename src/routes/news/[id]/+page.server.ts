import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

function getArticle(id: string) {
    return prisma.article.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    name: true,
                    id: true,
                },
            },
            _count: {
                select: {
                    votes: true,
                },
            },
        },
    });
}

function getHasVoted(id: string, userId: string) {
    return prisma.vote.findUnique({
        where: {
            articleId_userId: {
                articleId: id,
                userId: userId ?? '',
            },
        },
    });
}

export const load: PageServerLoad = async (event) => {
    const session: any = await event.locals.getSession();
    const [article, hasVoted] = await prisma.$transaction([getArticle(event.params.id), getHasVoted(event.params.id, session?.user.id)]);

    return {
        article,
        hasVoted: !!hasVoted,
    };
};
