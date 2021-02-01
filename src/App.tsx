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
import { bugOutline, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
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
                            <Route path="/tab1" component={Tab1} exact={true} />
                            <Route path="/log" component={Tab2} exact={true} />
                            <Route
                                path="/"
                                render={() => <Redirect to="/tab1" />}
                                exact={true}
                            />
                        </IonRouterOutlet>
                        <IonTabBar slot="bottom">
                            <IonTabButton tab="tab1" href="/tab1">
                                <IonIcon icon={triangle} />
                                <IonLabel>Tab 1</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="tab2" href="/log">
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
