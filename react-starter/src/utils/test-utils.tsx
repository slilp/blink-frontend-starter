import { reducer } from "redux/store";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { configureStore } from "@reduxjs/toolkit";

interface Options extends RenderOptions {
  route?: string;
  initialState?: any;
  store?: any;
}

const history = createMemoryHistory();

const render = (
  ui: React.ReactElement,
  {
    route = "/",
    initialState = {},
    store = configureStore({ reducer, preloadedState: initialState }),
    ...options
  }: Options = {}
) => {
  history.push(route);

  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children }: { children: React.ReactElement }) => (
    <Router history={history}>
      <Provider store={store}>{children}</Provider>
    </Router>
  );

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...options }),
    history,
    store,
  };
};

export * from "@testing-library/react";
export { render };
