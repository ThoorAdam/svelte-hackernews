import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const possibleSorts = ['newest', 'oldest', 'popular'];

export const load: PageServerLoad = async (event) => {
    let s: string = event.url.searchParams.get('s');

    if (!event.url.searchParams.has('s') || !possibleSorts.includes(event.url.searchParams.get('s')!)) {
        s = 'newest';
    }

    const articles = await prisma.article.findMany({
        orderBy: {
            createdAt: s === 'newest' ? 'desc' : 'asc',
        },
        take: 25,
        select: {
            id: true,
            title: true,
            createdAt: true,
            user: {
                select: {
                    name: true,
                    id: true,
                },
            },
            _count: {
                select: {
                    votes: true,
                    comments: true,
                },
            },
        },
    });

    return {
        articles,
    };
};
