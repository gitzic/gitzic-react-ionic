import React from 'react';
import { IonAlert, IonButton } from '@ionic/react';
import { setName } from '../../hooks/GitZic/sequence';

interface Props {
    value: string;
    currentSeq: number;
}

export const SeqEditName = ({ value, currentSeq }: Props) => {
    const [editName, setEditName] = React.useState(false);
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
                onClick={() => setEditName(true)}
            >
                Edit
            </IonButton>
            <IonAlert
                isOpen={editName}
                onDidDismiss={() => setEditName(false)}
                cssClass="my-custom-class"
                header={'Prompt!'}
                inputs={[
                    {
                        name: 'name',
                        type: 'text',
                        value,
                    },
                ]}
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                    },
                    {
                        text: 'Ok',
                        handler: ({ name }) => {
                            setName(currentSeq)(name);
                        },
                    },
                ]}
            />
        </>
    );
};
