import React, { Component, useCallback, useState } from 'react';
import { Nav } from '@douyinfe/semi-ui';
import { createRoot } from 'react-dom/client';
import { useLocalStorage } from './hooks/useLocalStorage';
import { API } from './demos/API';
import { BarChart1 } from './demos/BarChart1';
import { TextAnimate } from './demos/Text';
import { Bounce } from './demos/animate/Bounce';
import { Leap } from './demos/animate/Leap';
import { WaveScatter } from './demos/story-chart/wave-scatter';

type MenusType = (
  | {
      name: string;
      component: () => React.JSX.Element;
      subMenus?: undefined;
    }
  | {
      name: string;
      subMenus: {
        name: string;
        component: () => React.JSX.Element;
      }[];
      component?: undefined;
    }
)[];

const App = () => {
  const [activeName, setActiveName] = useLocalStorage('menuName', '');
  const menus = [
    {
      name: 'Base',
      subMenus: [
        {
          name: 'API Demo',
          component: API
        }
      ]
    },
    {
      name: 'Animate',
      subMenus: [
        {
          name: 'Bounce',
          component: Bounce
        },
        {
          name: 'Leap',
          component: Leap
        }
      ]
    },
    {
      name: 'Arrange',
      subMenus: [
        {
          name: 'BarChart1',
          component: BarChart1
        },
        {
          name: 'Text',
          component: TextAnimate
        }
      ]
    },
    {
      name: 'Story Chart',
      subMenus: [
        {
          name: 'Wave Scatter',
          component: WaveScatter
        },
        {
          name: 'Dynamic Bar Chart',
          component: TextAnimate
        }
      ]
    }
  ];
  const getSelectedMenu = useCallback<(menus: MenusType) => any>(
    (menus: MenusType) => {
      for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        if (menu.name === activeName) {
          console.log(menu);
          return menus[i];
        }
        if (menu.subMenus) {
          const data = getSelectedMenu(menu.subMenus);
          if (data) {
            return data;
          }
        }
      }
    },
    [activeName]
  );
  const selectedMenu = getSelectedMenu(menus);
  console.log('selectedMenu', selectedMenu);

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flex: '0 0 200px', height: '90vh', overflowY: 'auto', border: '1px solid #eee' }}>
        <Nav
          style={{ width: 200 }}
          onSelect={data => setActiveName(data.itemKey)}
          selectedKeys={[activeName]}
          footer={{
            collapseButton: false
          }}
        >
          {menus.map(item => {
            if (!item.subMenus) {
              return <Nav.Item key={item.name} itemKey={item.name} text={item.name} />;
            }
            return (
              <Nav.Sub key={item.name} itemKey={item.name} text={item.name}>
                {item.subMenus.map(menu => (
                  <Nav.Item key={menu.name} itemKey={menu.name} text={menu.name} />
                ))}
              </Nav.Sub>
            );
          })}
        </Nav>
      </div>

      <div style={{ flexGrow: 1, border: '1px solid #eee', height: '90vh' }}>
        {selectedMenu && <selectedMenu.component />}
      </div>
    </div>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
