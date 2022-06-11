export const apiCall = async (url: string, options: any = {}) => {
    const response = await fetch(url, options);
    return await response.json();
}