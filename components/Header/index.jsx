"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/Header/button";
import styles from "./style.module.scss";
import Nav from "./Nav";

// const menu = {
//   open: {
//     width: "480px",
//     height: "650px",
//     top: "-25px",
//     right: "-25px",
//     transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
//   },
//   closed: {
//     width: "100px",
//     height: "40px",
//     top: "0px",
//     right: "0px",
//     transition: {
//       duration: 0.75,
//       delay: 0.35,
//       type: "tween",
//       ease: [0.76, 0, 0.24, 1],
//     },
//   },
// };

const getMenuVariants = (isMobile) => ({
  open: {
    width: isMobile ? "100vw" : "480px",
    height: isMobile ? "100vh" : "650px",
    // top: isMobile ? "0px" : "-25px",
    // right: isMobile ? "0px" : "-25px",
    top: "-25px",
    right: "-25px",
    position: isMobile ? "fixed" : "",
    borderRadius: isMobile ? "0px" : "20px",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0px",
    right: "0px",
    transition: {
      duration: 0.75,
      delay: 0.35,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
});

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}
export default function Index() {
  const [isActive, setIsActive] = useState(false);
  const isMobile = useIsMobile();
  const menu = getMenuVariants(isMobile);

  return (
    <div className={styles.header}>
      <motion.div
        className={styles.menu}
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>{isActive && <Nav />}</AnimatePresence>
      </motion.div>
      <Button
        isActive={isActive}
        toggleMenu={() => {
          setIsActive(!isActive);
        }}
      />
    </div>
  );
}
