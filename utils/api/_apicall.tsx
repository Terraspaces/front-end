export const apiCall = async (url: string, options: any = {}, noReturn: boolean = false) => {
    const response = await fetch(url, options);
    if (noReturn) return;
    return await response.json();
}