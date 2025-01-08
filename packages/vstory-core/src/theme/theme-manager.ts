import { array, isArray, isString } from '@visactor/vutils';
import { DefaultTheme } from './builtin/default';
import type { ITheme } from './interface';
import { getThemeAttribute } from '../utils/theme';

export class ThemeManager {
  /** 主题字典 */
  static readonly themes: Map<string, ITheme> = new Map<string, ITheme>();

  private static _currentThemeName: string = DefaultTheme.name; // 设置缺省为默认主题

  /**
   * 注册主题
   * @param name 主题名称
   * @param theme 主题配置
   * @returns
   */
  static registerTheme(name: string, theme: Partial<ITheme>) {
    if (!name) {
      return;
    }
    if (name === DefaultTheme.name) {
      ThemeManager.themes.set(name, theme);
      return;
    }
    ThemeManager.themes.set(name, { ...DefaultTheme.theme, ...theme });
  }

  /**
   * 获取主题
   * @param name 主题名称
   * @returns
   */
  static getTheme(name: string) {
    const theme = ThemeManager.themes.get(name);
    if (!theme) {
      return DefaultTheme.theme;
    }
    return theme;
  }

  /**
   * 移除主题
   * @param name 主题名称
   * @returns 是否移除成功
   */
  static removeTheme(name: string): boolean {
    if (!name) {
      return false;
    }
    if (name === DefaultTheme.name) {
      return false;
    }
    return ThemeManager.themes.delete(name);
  }

  /**
   * 判断主题是否存在
   * @param name 主题名称
   * @returns 是否存在
   */
  static themeExist(name: string): boolean {
    return ThemeManager.themes.has(name);
  }

  /** 获取图表默认主题（非用户配置） */
  static getDefaultTheme(): ITheme {
    return ThemeManager.themes.get(DefaultTheme.name);
  }

  /** 设置当前主题（所有实例生效） */
  static setCurrentTheme(name: string) {
    if (!ThemeManager.themeExist(name)) {
      return;
    }
    ThemeManager._currentThemeName = name;
  }

  /** 获取当前主题（只能获取用户通过`setCurrentTheme`方法设置过的主题，默认值为默认主题） */
  static getCurrentTheme(): ITheme {
    return ThemeManager.getTheme(ThemeManager._currentThemeName);
  }

  /** 获取当前主题名称（只能获取用户通过`setCurrentTheme`方法设置过的主题，默认值为默认主题） */
  static getCurrentThemeName(): string {
    return ThemeManager._currentThemeName;
  }

  static getAttribute(keys: string | string[], path: string | string[]): any;
  static getAttribute(keys: string | string[], attribute: (theme: ITheme) => any): any;
  static getAttribute(keys: string | string[], params: string | string[] | ((theme: ITheme) => any)): any {
    keys = array(keys);
    let attribute;
    if (isString(params) || isArray(params)) {
      attribute = (theme: ITheme) => getThemeAttribute(theme, params);
    } else {
      attribute = params;
    }
    let att = null;
    for (let i = 0; i < keys.length; i++) {
      att = attribute(ThemeManager.themes.get(keys[i]));
      if (att) {
        return att;
      }
    }
    return attribute(ThemeManager.getCurrentTheme()) ?? attribute(ThemeManager.getTheme(DefaultTheme.name));
  }
}

ThemeManager.registerTheme(DefaultTheme.name, DefaultTheme.theme);
