export const safeParse = <T>(json: string | null, guard: (data: any) => data is T): T | undefined => {
    if (!json) return undefined;
    try {
        const parsed = JSON.parse(json);
        if (guard(parsed)) {
            return parsed;
        }
        console.warn('LocalStorage data failed type validation');
        return undefined;
    } catch (error) {
        console.warn('Failed to parse LocalStorage JSON:', error);
        return undefined;
    }
};

export const loadFromStorage = <T>(key: string, guard: (data: any) => data is T): T | undefined => {
    const data = localStorage.getItem(key);
    return safeParse(data, guard);
};
