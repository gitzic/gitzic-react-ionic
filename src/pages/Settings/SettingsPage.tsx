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

export const SettingsPage: React.FC = () => {
    const cookies = new Cookies();

    const [githubUser, setGithubUser] = useState<string>(
        cookies.get('githubUser'),
    );
    const [githubRepo, setGithubRepo] = useState<string>(
        cookies.get('githubRepo'),
    );
    const [githubToken, setGithubToken] = useState<string>(
        cookies.get('githubToken'),
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
                                cookies.set('githubUser', user, { path: '/' });
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
                                cookies.set('githubRepo', repo, { path: '/' });
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
                                cookies.set('githubToken', token, { path: '/' });
                            }}
                            clearInput
                        ></IonInput>
                        <IonIcon
                            icon={showToken ? eye : eyeOutline}
                            onClick={() => setShowToken(!showToken)}
                        />
                    </IonItem>
                    <Info>
                        <p>
                            To save data in your GitHub repository, we need to
                            provide a{' '}
                            <a
                                href="https://developer.github.com/v3/auth/#via-oauth-and-personal-access-tokens"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                personal access tokens
                            </a>{' '}
                            to the{' '}
                            <a
                                href="https://developer.github.com/v3/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub API
                            </a>
                            . To{' '}
                            <a
                                href="https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                create a token
                            </a>
                            , go in developer settings, personal access tokens
                            and then generate new token. In most of the case you
                            will only need to give permission for public_repo.
                        </p>
                    </Info>
                </IonList>
            </IonContent>
        </IonPage>
    );
};
