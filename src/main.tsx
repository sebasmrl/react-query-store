import React from 'react'
import ReactDOM from 'react-dom/client'

import {NextUIProvider} from "@nextui-org/react";
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';

import './index.css';
import { TankStackProvider } from './plugins/TankStackProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TankStackProvider>
      <NextUIProvider>
        <main className="dark text-foreground bg-background">
          <RouterProvider router={ router } />
        </main>
      </NextUIProvider>
    </TankStackProvider>
  </React.StrictMode>,
)
