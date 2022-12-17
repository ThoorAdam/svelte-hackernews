import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

const routes = [
    {
        path: '/submit',
        authRequired: true,
    },
];

function checkIfUserIsAllowedToNavigate(user, url: URL) {
    const route = routes.find((route) => route.path === url.pathname);

    if (!user && route?.authRequired) {
        throw redirect(302, '/');
    }
}

export const load: LayoutServerLoad = async (event) => {
    const session: any = await event.locals.getSession();
    let voteCount: number;

    checkIfUserIsAllowedToNavigate(session?.user, event.url);

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
