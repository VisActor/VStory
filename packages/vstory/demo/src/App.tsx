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
import { ScatterBar } from './demos/story-chart/scatter-bar';
import { ScatterBarSwing } from './demos/story-chart/scatter-bar-swing';
import { ScatterBarThrow } from './demos/story-chart/scatter-bar-throw';
import { RankingBar } from './demos/story-chart/ranking-bar';
import { UnitInfographic } from './demos/works/unit-infographic';
import { VChartSiteDemo } from './demos/works/website/VChartSite';
import { TimelineAnimate } from './demos/component/timeline';
import { BasicUnit } from './demos/component/basic-unit';
import { BarChart2 } from './demos/BarChart2';
import { UnitTemplate1 } from './demos/templates/unit-template1';
import { VScreen } from './demos/works/vscreen';
import { Lottie } from './demos/component/lottie';
import { Infographic } from './demos/infographic/infographic';
import { SomeCharts } from './demos/works/some-charts';

import { BaseChart } from './demos/vchart-editor/base-chart';
import { Dapanji } from './demos/infographic/dapanji';
import { Insta } from './demos/infographic/insta';
import { CancerUSA } from './demos/infographic/cancer-usa';

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
          name: 'BarChart2',
          component: BarChart2
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
          name: 'Scatter Bar Throw',
          component: ScatterBarThrow
        },
        {
          name: 'Scatter Bar Swing',
          component: ScatterBarSwing
        },
        {
          name: 'Dynamic Bar Chart',
          component: RankingBar
        }
      ]
    },
    {
      name: 'Works',
      subMenus: [
        {
          name: 'Unit Infographic',
          component: UnitInfographic
        },
        {
          name: 'VChart Demo',
          component: VChartSiteDemo
        },
        {
          name: 'VScreen',
          component: VScreen
        },
        {
          name: 'SomeCharts',
          component: SomeCharts
        }
      ]
    },
    {
      name: 'template',
      subMenus: [
        {
          name: 'Unit Template1',
          component: UnitTemplate1
        }
      ]
    },
    {
      name: 'Component',
      subMenus: [
        {
          name: 'Timeline',
          component: TimelineAnimate
        },
        {
          name: 'BasicUnit',
          component: BasicUnit
        },
        {
          name: 'Lottie',
          component: Lottie
        }
      ]
    },
    {
      name: 'Infographic',
      subMenus: [
        {
          name: 'infographic',
          component: Infographic
        },
        {
          name: 'Dapanji',
          component: Dapanji
        },
        {
          name: 'Insta',
          component: Insta
        },
        {
          name: 'CancerUSA',
          component: CancerUSA
        }
      ]
    },
    {
      name: 'VChart Editor',
      subMenus: [
        {
          name: 'Base Chart',
          component: BaseChart
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
