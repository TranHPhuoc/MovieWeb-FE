export const createMovieSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') 
        .replace(/\s+/g, '-') 
        .replace(/--+/g, '-'); 
}; 