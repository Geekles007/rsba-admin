import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import ArticleManagerModule from "./components/article-manager-module";
import {ACCESS_TOKEN} from "./components/constants";

test('renders everything well', () => {
  render(<App />);
  const wrapper = document.querySelector("div#main-app");
  expect(wrapper).not.toBeNull();
  expect(wrapper?.firstElementChild).not.toBeNull();
  expect(wrapper?.firstElementChild).not.toBe(<ArticleManagerModule token={localStorage.getItem(ACCESS_TOKEN) as string} />);
});
