import ReactDOM from 'react-dom/client';
import { App } from './app';
import * as VStory from '@visactor/vstory';

import '@arco-design/web-react/dist/css/arco.css';

(window as any).VStory = VStory;
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
