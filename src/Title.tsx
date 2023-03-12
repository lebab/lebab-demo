import { Component } from "solid-js";
import styles from "./Title.module.css";

export const Title: Component = () => (
  <div class={styles.Title}>
    <h1>
      <a href="https://github.com/lebab/lebab/">Lebab</a>
    </h1>
    <p>Lebab modernizes your JavaScript code!</p>
  </div>
);
