import React from 'react';
import { IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { saveSequences } from '../../hooks/Git';
import { saveOutline } from 'ionicons/icons';

export const SeqSave = () => {
    const [saving, setSaving] = React.useState(false);
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
                    setSaving(true);
                    await saveSequences();
                    setSaving(false);
                }}
            >
                {saving ? (
                    <IonSpinner name="dots" />
                ) : (
                    <IonIcon icon={saveOutline} />
                )}
            </IonButton>
        </>
    );
};
