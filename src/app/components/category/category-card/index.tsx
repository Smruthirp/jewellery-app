import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  imageUrl: string;
  title: string;
  href: string;
};

export const CategoryCard = ({ imageUrl, title, href }: Props) => {
  return (
    <a href={href} tabIndex={0} aria-label={title} className="col-span-2">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
        viewport={{ once: false, amount: 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="flex w-full flex-col items-center rounded-lg bg-[#18392b] p-2 text-white shadow-lg md:w-xs md:p-4"
      >
        <div className="mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-md md:h-60">
          <Image
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
            width={400}
            height={128}
          />
        </div>
        <h3 className="text-md text-center font-semibold md:text-lg">
          {title}
        </h3>
      </motion.div>
    </a>
  );
};
