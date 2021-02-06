import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { settingsOutline, musicalNotes } from 'ionicons/icons';
import { SeqPage } from './pages/Sequencer/SeqPage';
import { SettingsPage } from './pages/Settings/SettingsPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './App.css';

import { GitZicProvider, useGitZic } from './hooks/useGitZic';

const App: React.FC = () => {
    const { midi } = useGitZic();
    // console.log('Midi in App', midi);
    return (
        <GitZicProvider>
            <IonApp>
                <IonReactRouter>
                    <IonTabs>
                        <IonRouterOutlet>
                            <Route path="/sequencer" component={SeqPage} exact={true} />
                            <Route path="/settings" component={SettingsPage} exact={true} />
                            <Route
                                path="/"
                                render={() => <Redirect to="/sequencer" />}
                                exact={true}
                            />
                        </IonRouterOutlet>
                        <IonTabBar slot="bottom">
                            <IonTabButton tab="sequencer" href="/sequencer">
                                <IonIcon icon={musicalNotes} />
                                <IonLabel>Sequencer</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="settings" href="/settings">
                                <IonIcon icon={settingsOutline} />
                                <IonLabel>Settings</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                </IonReactRouter>
            </IonApp>
        </GitZicProvider>
    );
};

export default App;
