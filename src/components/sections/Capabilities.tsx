import { motion } from "motion/react";
import { Code2, Landmark, ShieldCheck } from "lucide-react";
import { siPix } from "simple-icons";
import { SimpleIcon } from "@/components/SimpleIcon";

const capabilities = [
  {
    icon: <Code2 className="size-7 text-primary" />,
    title: "Open Finance APIs",
  },
  {
    icon: <SimpleIcon icon={siPix} className="size-7 text-primary" />,
    title: "PIX Solutions",
  },
  {
    icon: <Landmark className="size-7 text-primary" />,
    title: "Banking as a Service",
  },
  {
    icon: <ShieldCheck className="size-7 text-primary" />,
    title: "Compliance & Security",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Capabilities() {
  return (
    <section className="flex min-h-screen items-center px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 sm:mb-16"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            What is Jataí
          </h2>
          <div className="mt-4 space-y-3 text-base text-muted-foreground sm:mt-6 sm:space-y-4 sm:text-lg">
            <p>
              Jataí is an open financial technology lab. We build tools that
              help fintechs, institutions, and marketplaces integrate data,
              payments, and banking services in a regulated, transparent way.
            </p>
            <p>
              Our work is to build bridges between the traditional financial
              system and new business models. All with open-source code,
              transparency, and a focus on security, compliance, and data
              sovereignty.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
        >
          {capabilities.map((capability) => (
            <motion.div
              key={capability.title}
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              {capability.icon}
              <span className="text-xs font-medium sm:text-sm">
                {capability.title}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}