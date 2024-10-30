import { motion } from "framer-motion";
import Link from "next/link";

const AnimatedListItem = ({ href, children }) => (
  <motion.li
    whileHover={{ scale: 1.01 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="font-pretendard md:text-6xl sm:text-4xl tracking-tighter font-bold hover:text-orange-400 "
  >
    <Link href={href}>{children}</Link>
  </motion.li>
);

export default AnimatedListItem;
