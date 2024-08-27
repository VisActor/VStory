import React, { Component, useCallback, useState } from 'react';
import { Nav } from '@douyinfe/semi-ui';
import { createRoot } from 'react-dom/client';
import { StoryBarDemo } from './demos/StoryBarDemo';
import { StorySceneDemo } from './demos/StoryScene';
// import { AreaWithTag } from './demos/AreaWithTag';
// import { StoryLineDemo } from './demos/StoryLineDemo';
import { useLocalStorage } from './hooks/useLocalStorage';
// import { StoryPieDemo } from './demos/StoryPieDemo';
import { GraphicActionDemo } from './demos/graphicAction';
import { VChartSiteDemo } from './demos/VChartSite/VChartSite';
import { DisAppear } from './demos/DisAppear';
import { StoryEdit } from './demos/StoryEdit';
import { Appear } from './demos/Appear';
import { GraphicEdit } from './demos/GraphicEdit';
import { Playground } from './demos/Playground';
import { Pictogram } from './demos/infographics/Pictogram';
import { LV_BAR1 } from './demos/lv/bar1';
import { BarLineSeries } from './demos/BarLineSeries';
import { wordcloud } from './demos/wordcloud';
import { BaseComponent } from './demos/BaseComponent';
import { BarLineSeriesSelector } from './demos/BarLineSeriesSelector';
import { RankingBar } from './demos/template/RankingBar';

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
      name: 'Bar',
      component: StoryBarDemo
    },
    // {
    //   name: 'Line',
    //   component: StoryLineDemo
    // },
    // {
    //   name: 'Pie',
    //   component: StoryPieDemo
    // },
    {
      name: 'StoryScene',
      component: StorySceneDemo
    },
    // {
    //   name: 'AreaWithTag',
    //   component: AreaWithTag
    // },
    {
      name: 'DisAppear',
      component: DisAppear
    },
    {
      name: 'Appear',
      component: Appear
    },
    {
      name: 'Graphic-Action',
      component: GraphicActionDemo
    },
    {
      name: 'VChart-Site',
      component: VChartSiteDemo
    },
    {
      name: 'StoryEdit',
      component: StoryEdit
    },
    {
      name: 'GraphicEdit',
      component: GraphicEdit
    },
    {
      name: 'Playground',
      component: Playground
    },
    {
      name: 'Infographic-Pictogram',
      component: Pictogram
    },
    {
      name: 'BarLineSeries',
      component: BarLineSeries
    },
    {
      name: 'BarLineSeriesSelector',
      component: BarLineSeriesSelector
    },
    {
      name: 'wordcloud',
      component: wordcloud
    },
    {
      name: 'BaseComponent',
      component: BaseComponent
    },
    {
      name: 'lv_chart',
      subMenus: [
        {
          name: 'bar1',
          component: LV_BAR1
        }
      ]
    },
    {
      name: 'RankingBar',
      component: RankingBar
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
