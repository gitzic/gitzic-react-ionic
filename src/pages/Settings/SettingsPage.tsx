import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonIcon,
} from '@ionic/react';

import { eye, eyeOutline } from 'ionicons/icons';
import { Info } from '../../components/Info';
import { githubStorageKeys } from '../../storage/GitHubStorage';
import { GithubTokenInfo } from './GithubTokenInfo';
import { GitHubInfo } from './GitHubInfo';

export const SettingsPage: React.FC = () => {
    const cookies = new Cookies();

    const [githubUser, setGithubUser] = useState<string>(
        cookies.get(githubStorageKeys.githubUser),
    );
    const [githubRepo, setGithubRepo] = useState<string>(
        cookies.get(githubStorageKeys.githubRepo),
    );
    const [githubToken, setGithubToken] = useState<string>(
        cookies.get(githubStorageKeys.githubToken),
    );
    const [showToken, setShowToken] = useState(false);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel position="fixed">Github user</IonLabel>
                        <IonInput
                            value={githubUser}
                            placeholder="Enter github user"
                            onIonChange={(e) => {
                                const user = e.detail.value!;
                                setGithubUser(user);
                                cookies.set(
                                    githubStorageKeys.githubUser,
                                    user,
                                    { path: '/' },
                                );
                            }}
                            clearInput
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="fixed">Github repo</IonLabel>
                        <IonInput
                            value={githubRepo}
                            placeholder="Enter github repo"
                            onIonChange={(e) => {
                                const repo = e.detail.value!;
                                setGithubRepo(repo);
                                cookies.set(
                                    githubStorageKeys.githubRepo,
                                    repo,
                                    { path: '/' },
                                );
                            }}
                            clearInput
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="fixed">Github token</IonLabel>
                        <IonInput
                            value={githubToken}
                            type={showToken ? 'text' : 'password'}
                            placeholder="Enter github access token"
                            onIonChange={(e) => {
                                const token = e.detail.value!;
                                setGithubToken(token);
                                cookies.set(
                                    githubStorageKeys.githubToken,
                                    token,
                                    { path: '/' },
                                );
                            }}
                            clearInput
                        ></IonInput>
                        <IonIcon
                            icon={showToken ? eye : eyeOutline}
                            onClick={() => setShowToken(!showToken)}
                        />
                    </IonItem>
                    <GithubTokenInfo />
                    {githubUser && githubToken && githubRepo && <GitHubInfo />}
                </IonList>
            </IonContent>
        </IonPage>
    );
};
