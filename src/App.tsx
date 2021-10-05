import React from 'react';
import './App.css';
import ArticleManagerModule from "./components/article-manager-module";
import {ACCESS_TOKEN} from "./components/type-module/constants";
import TypeModule from "./components/type-module";

function App() {
  return (
      <div id={"main-app"}>
        <TypeModule token={localStorage.getItem(ACCESS_TOKEN) as string} />
      </div>
  );
}

export default App;
