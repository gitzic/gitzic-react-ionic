import React from 'react';
import { IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { loadSequences } from '../../hooks/Git';
import { reloadCircleOutline } from 'ionicons/icons';

export const SeqLoad = () => {
    const [loading, setLoading] = React.useState(false);
    return (
        <>
            <IonButton
                size="small"
                color="medium"
                fill="outline"
                style={{
                    height: 20,
                    marginTop: -8,
                    padding: 0,
                }}
                onClick={async () => {
                    setLoading(true);
                    await loadSequences();
                    setLoading(false);
                }}
            >
                {loading ? (
                    <IonSpinner name="dots" />
                ) : (
                    <IonIcon icon={reloadCircleOutline} />
                )}
            </IonButton>
        </>
    );
};
