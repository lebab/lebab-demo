import { Component, For } from "solid-js";
import styles from "./TransformMenu.module.css";

export type Transform = { name: string; enabled: boolean };

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
            <label>
              <input
                type="checkbox"
                checked={tr.enabled}
                onClick={(e) =>
                  props.onChange({ name: tr.name, enabled: !tr.enabled })
                }
              />{" "}
              {tr.name}
            </label>
          )}
        </For>
      </span>
    </div>
  );
};
