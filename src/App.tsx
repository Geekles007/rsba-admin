import React from 'react';
import './App.css';
import ArticleManagerModule from "./components/article-manager-module";
import {ACCESS_TOKEN} from "./components/article-manager-module/constants";

function App() {
  return (
      <div id={"main-app"}>
        <ArticleManagerModule token={localStorage.getItem(ACCESS_TOKEN) as string} />
      </div>
  );
}

export default App;
