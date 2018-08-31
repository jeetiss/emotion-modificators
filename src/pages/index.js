import React, {
  Children,
  cloneElement,
  createElement,
  Fragment,
  isValidElement
} from "react";
import { css } from "react-emotion";

const join = (...classNames) => classNames.filter(Boolean).join(" ");

const modificator = css => ({ is, children, className, ...props }) => {
  const childs = Children.toArray(children);

  if (childs.length === 1 && isValidElement(childs[0])) {
    const [comp] = childs;
    return cloneElement(comp, { className: join(className, css(props)) });
  }

  if (childs.length !== 1) {
    console.warn("модифицирующий компонент нужно применять к одному элементу");
  }

  return createElement(
    is || "div",
    { ...props, className: join(className, css(props)) },
    children
  );
};

const Colorize = modificator(
  props => css`
    color: ${props.color || "red"};
  `
);

const Bolder = modificator(
  props => css`
    font-weight: bold;
  `
);

const Borderer = modificator(
  props => css`
    border: 1px solid black;
  `
);

const Uppercaser = modificator(
  props => css`
    text-transform: uppercase;
  `
);

export default () => (
  <Fragment>
    <div>правильное применение</div>

    <Colorize is="span">Hello world!</Colorize>

    <Bolder>
      <Colorize>Hello world!</Colorize>
    </Bolder>

    <Borderer>
      <Colorize color="black">Hello world!</Colorize>
    </Borderer>

    <Bolder>
      <Borderer>
        <Colorize color="wheat">Hello world!</Colorize>
      </Borderer>
    </Bolder>

    <Uppercaser>
      <Bolder color="wheat">
        <Borderer>
          <Colorize>Hello world!</Colorize>
        </Borderer>
      </Bolder>
    </Uppercaser>

    <div>неправильное применение</div>

    <Borderer>
      <Colorize color="black">world</Colorize>

      <Colorize color="black">hello</Colorize>
    </Borderer>
  </Fragment>
);
