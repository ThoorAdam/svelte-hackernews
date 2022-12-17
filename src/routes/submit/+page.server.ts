import { prisma } from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const session: any = await locals.getSession();

        if (!session?.user) {
            throw error(401, 'Unauthorized');
        }

        const data = await request.formData();
        const title = data.get('title') as string;
        const url = data.get('url') as string;
        const content = data.get('content') as string;

        const missingContent = !content?.length;
        const missingTitle = !title?.length;

        if (missingContent || missingTitle) {
            return fail(400, { content, missingContent, title, missingTitle });
        }

        await prisma.article.create({
            data: {
                title,
                url,
                content,
                user: {
                    connect: {
                        id: session.user.id,
                    },
                },
                votes: {
                    create: {
                        user: {
                            connect: {
                                id: session.user.id,
                            },
                        },
                    },
                },
            },
        });

        throw redirect(303, '/');
    },
};
