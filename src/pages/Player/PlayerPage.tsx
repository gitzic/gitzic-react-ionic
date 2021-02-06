import React from 'react';
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonContent,
    IonPage,
} from '@ionic/react';
import { useGitZic } from '../../hooks/useGitZic';

const MIN_WIDTH = 160;
const MARGIN = 2 * 10;

export const PlayerPage: React.FC = () => {
    const { sequences } = useGitZic();

    const countPerRow = Math.floor(window.innerWidth / MIN_WIDTH);
    const width =
        MIN_WIDTH +
        (window.innerWidth / (MIN_WIDTH + MARGIN) - countPerRow) *
            ((MIN_WIDTH + MARGIN) / countPerRow);

    return (
        <IonPage>
            <IonContent>
                {sequences.map(({ name, beatCount, stepsPerBeat }, key) => (
                    <IonCard
                        style={{ width, float: 'left' }}
                        key={`play-${key}`}
                    >
                        <IonCardHeader>
                            <IonCardSubtitle>{name}</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent><b>{beatCount*stepsPerBeat}</b> steps / {beatCount} beats</IonCardContent>
                    </IonCard>
                ))}
            </IonContent>
        </IonPage>
    );
};
