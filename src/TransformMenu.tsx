import { Component, For } from "solid-js";
import styles from "./TransformMenu.module.css";
import { TransformToggle } from "./TransformToggle";

export type Transform = { name: string; enabled: boolean; title?: string };

interface TransformMenuProps {
  transforms: Transform[];
  onChange: (t: Transform) => void;
}

export const TransformMenu: Component<TransformMenuProps> = (props) => {
  return (
    <div class={styles.TransformMenu}>
      <strong class={styles.TransformMenuTitle}>Transforms:</strong>
      <span class={styles.TransformMenuList}>
        <For each={props.transforms}>
          {(tr) => (
            <TransformToggle
              name={tr.name}
              title={tr.title}
              enabled={tr.enabled}
              onChange={props.onChange}
            />
          )}
        </For>
      </span>
    </div>
  );
};
