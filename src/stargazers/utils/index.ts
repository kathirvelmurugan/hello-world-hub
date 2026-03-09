


export function createPageUrl(pageName: string) {
    if (pageName === 'Home') return '/stargazers';
    return '/stargazers/' + pageName.toLowerCase().replace(/ /g, '-');
}
