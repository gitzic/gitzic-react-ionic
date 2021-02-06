import React from 'react';
import { IonButton } from '@ionic/react';
import { saveSequences } from '../../hooks/Git';

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
                {saving ? 'Saving' : 'Save'}
            </IonButton>
        </>
    );
};
