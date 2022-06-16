// eslint-disable-next-line unicorn/filename-case
declare module '@brainhubeu/react-carousel' {
  import { ReactComponentElement, Component, RefObject } from "react";
  export type ImgProps = ReactComponentElement<'img'>;

  export interface DotsProps {
    number?: number;
    thumbnails?: ImgProps[];
    value?: number;
    onChange?(value: number): void;
    rtl?: boolean;
    className?: string;
  }

  export class Dots extends Component<DotsProps> {
  }

  export type PluginStrategy = (originalValue: number, previousValue: number) => number;

  export type CarouselPluginFunc = ({ options, carouselProps, refs }: { options?: any, carouselProps: CarouselProps, refs: Record<string, RefObject<HTMLElement>>}) => {
    plugin?: () => void;
    beforeCarouselItems?: () => JSX.Element;
    afterCarouselItems?: () => JSX.Element;
    carouselCustomProps?: () => Record<string, () => any>;
    trackCustomProps?: () => Record<string, () => any>;
    slideCustomProps?: () => Record<string, () => any>;
    strategies?: () => Record<string, PluginStrategy>;
    itemClassNames?: () => string[];
    carouselClassNames?: () => string[];
  };

  export interface CarouselPluginTypes {
    resolve: CarouselPluginFunc;
    options?: any;
  }

  export interface CarouselProps {
    itemWidth?: number;
    value?: number;
    onChange?(value: number): void;
    slides?: JSX.Element[];
    offset?: number;
    draggable?: boolean;
    animationSpeed?: number;
    className?: string;
    breakpoints?: Pick<CarouselProps, Exclude<keyof CarouselProps, "breakpoints" | "plugins">>;
    plugins?: Array<string|CarouselPluginTypes>;
  }

  export default class extends Component<CarouselProps> {
  }

  export const slidesToShowPlugin: CarouselPluginFunc;
  export const infinitePlugin: CarouselPluginFunc;
  export const clickToChangePlugin: CarouselPluginFunc;
  export const autoplayPlugin: CarouselPluginFunc;
  export const rtlPlugin: CarouselPluginFunc;
  export const centeredPlugin: CarouselPluginFunc;
  export const slidesToScrollPlugin: CarouselPluginFunc;
  export const arrowsPlugin: CarouselPluginFunc;
  export const fastSwipePlugin: CarouselPluginFunc;
}
