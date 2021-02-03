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
import { bugOutline, musicalNotes } from 'ionicons/icons';
import { SeqPage } from './pages/Sequencer/SeqPage';
import Tab2 from './pages/Tab2';

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
                            <Route path="/log" component={Tab2} exact={true} />
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
                            <IonTabButton tab="log" href="/log">
                                <IonIcon icon={bugOutline} />
                                <IonLabel>Log</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                </IonReactRouter>
            </IonApp>
        </GitZicProvider>
    );
};

export default App;
