export const localStorage = window.localStorage;

export enum githubStorageKeys {
    githubUser = 'githubUser',
    githubToken = 'githubToken',
    githubRepo = 'githubRepo',
}

export function getGithubUser() {
    return localStorage.getItem(githubStorageKeys.githubUser) || '';
}

export function getGithubRepo() {
    return localStorage.getItem(githubStorageKeys.githubRepo) || '';
}

export function getGithubToken() {
    return localStorage.getItem(githubStorageKeys.githubToken) || '';
}

export function storeGithubUser(val: string) {
    return localStorage.setItem(githubStorageKeys.githubUser, val);
}

export function storeGithubRepo(val: string) {
    return localStorage.setItem(githubStorageKeys.githubRepo, val);
}

export function storeGithubToken(val: string) {
    return localStorage.setItem(githubStorageKeys.githubToken, val);
}
