


export function createPageUrl(pageName: string) {
    const path = pageName.toLowerCase().replace(/ /g, '-');
    if (path === 'home') return '/stargazers';
    return '/stargazers/' + path.replace("detail", "");
}