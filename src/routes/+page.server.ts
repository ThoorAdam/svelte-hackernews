import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const possibleSorts = ['newest', 'oldest', 'popular'];

export const load: PageServerLoad = async (event) => {
    // Redirect to ?s=newest if no query string is present
    if (!event.url.searchParams.has('s') || !possibleSorts.includes(event.url.searchParams.get('s')!)) {
        throw redirect(301, event.url.pathname + '?s=newest');
    }

    const news: { id: string; title: string }[] = await prisma.article.findMany({
        orderBy: {
            createdAt: event.url.searchParams.get('s') === 'newest' ? 'desc' : 'asc',
        },
        take: 25,
        select: {
            id: true,
            title: true,
        },
    });

    return {
        news,
    };
};
