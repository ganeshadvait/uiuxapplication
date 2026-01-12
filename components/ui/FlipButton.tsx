import { motion } from "framer-motion";
import styles from "./flipbutton.module.scss";
interface ButtonProps {
  isActive: boolean;
  toggleMenu: () => void;
  children?: React.ReactNode;
  label?: string;
  className?: string; 
}

export default function FlipButton({
  isActive,
  toggleMenu,
  label,
}: ButtonProps) {
  return (
    <div className={styles.flipbutton}>
      <motion.div
        className={styles.flipslider}
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className={styles.flipel}
          onClick={() => {
            toggleMenu();
          }}
        >
          <PerspectiveText label={label || "Button"} />
        </div>
      </motion.div>
    </div>
  );
}

function PerspectiveText({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={` ${className} ${styles.flipperspectiveText}`}>
      <p>{label}</p>
      <p>{label}</p>
    </div>
  );
}
