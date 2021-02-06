import React from 'react';
import { Info } from '../../components/Info';
import { useAsync } from '../../hooks/useAsync';
import { GitHubStorage } from '../../storage/GitHubStorage';

export const GitHubInfo = () => {
    const gitHubStorage = new GitHubStorage();
    const { result: info } = useAsync<string>(() => gitHubStorage.info());

    return !info ? null : (
        <Info>
            <p>{info}</p>
        </Info>
    );
};
