import { prisma } from '$lib/server/prisma';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

function getArticle(id: string) {
    return prisma.article.findUnique({
        where: {
            id,
        },
        include: {
            comments: {
                select: {
                    content: true,
                    id: true,
                    createdAt: true,
                    user: {
                        select: {
                            name: true,
                            id: true,
                        },
                    },
                },
            },
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

export const actions: Actions = {
    default: async ({ request, locals, params }) => {
        const session: any = await locals.getSession();

        if (!session?.user) {
            throw error(401, 'Unauthorized');
        }

        const data = await request.formData();
        const comment = data.get('comment') as string;
        const missingComment = !comment?.length;

        if (missingComment) {
            return fail(400, { comment, missingComment });
        }

        const articleId = params.id;

        await prisma.comment.create({
            data: {
                content: comment,
                article: {
                    connect: {
                        id: articleId,
                    },
                },
                user: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
        });
    },
};
