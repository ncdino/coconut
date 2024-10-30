import AnimatedListItem from "./AnimatedListItem";
import { motion } from "framer-motion";

export default function AnimatedMenu() {
  return (
    <motion.nav>
      <ul className="flex flex-col text-white p-4 gap-1">
        <AnimatedListItem href="/">HOME</AnimatedListItem>
        <AnimatedListItem href="/category">ALL</AnimatedListItem>
        <AnimatedListItem href="/category/cultures">CULTURES</AnimatedListItem>
        <AnimatedListItem href="/category/travel">TRAVEL</AnimatedListItem>
        <AnimatedListItem href="/category/beauty">BEAUTY</AnimatedListItem>
      </ul>
    </motion.nav>
  );
}
