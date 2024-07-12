function formatDate(timeMillis: number): string {
    const date = new Date(timeMillis);
    return date.toLocaleDateString('en-UK', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export function isOverdueDate(timeMillis: number | string): boolean {
    return new Date(timeMillis) < new Date();
}

export default formatDate;