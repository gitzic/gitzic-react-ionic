import React, { useState } from 'react';
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
import { GithubTokenInfo } from './GithubTokenInfo';
import { GitHubInfo } from './GitHubInfo';
import {
    getGithubRepo,
    getGithubToken,
    getGithubUser,
    storeGithubUser,
    storeGithubRepo,
    storeGithubToken,
} from '../../storage/localStorage';

export const SettingsPage: React.FC = () => {

    const [githubUser, setGithubUser] = useState<string>(getGithubUser());
    const [githubRepo, setGithubRepo] = useState<string>(getGithubRepo());
    const [githubToken, setGithubToken] = useState<string>(getGithubToken());
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
                                storeGithubUser(user);
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
                                storeGithubRepo(repo);
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
                                storeGithubToken(token);
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
