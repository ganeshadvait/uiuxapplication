import styles from "./flipbutton.module.scss";

export default function PerspectiveText({ label }: { label: string }) {
  return (
    <span className={styles.flipperspectiveText}>
      <span>{label}</span>
      <span>{label}</span>
    </span>
  );
}
