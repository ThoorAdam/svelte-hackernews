export function post(path: string, data?: any) {
    const body = data ? JSON.stringify(data) : undefined;

    return fetch(path, {
        body,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
