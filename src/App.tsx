import type { Component } from "solid-js";
import { Editor } from "./Editor";
import styles from "./App.module.css";

export const App: Component = () => {
  return (
    <div class={styles.App}>
      <h1>Hello Lebab!</h1>
      <Editor />
      <Editor />
    </div>
  );
};
