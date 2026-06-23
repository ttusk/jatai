import { motion } from "motion/react";
import { Code2, Landmark, ShieldCheck } from "lucide-react";
import { siPix } from "simple-icons";
import { SimpleIcon } from "@/components/SimpleIcon";

const capabilities = [
  {
    icon: <Code2 className="size-7 text-primary" />,
    title: "APIs Open Finance",
  },
  {
    icon: <SimpleIcon icon={siPix} className="size-7 text-primary" />,
    title: "Soluções PIX",
  },
  {
    icon: <Landmark className="size-7 text-primary" />,
    title: "Banking as a Service",
  },
  {
    icon: <ShieldCheck className="size-7 text-primary" />,
    title: "Compliance e segurança",
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

export function Features() {
  return (
    <section className="flex h-screen items-center px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            O que é a Laika
          </h2>
          <div className="mt-6 space-y-4 text-lg text-muted-foreground">
            <p>
              A Laika é um laboratório de tecnologia financeira aberta. Nascemos
              para desenvolver soluções de open finance no Brasil, ajudando
              fintechs, instituições e marketplaces a integrarem dados,
              pagamentos e serviços bancários de forma regulada e acessível.
            </p>
            <p>
              Nosso trabalho é construir pontes entre o sistema financeiro
              tradicional e novos modelos de negócio. Tudo com código aberto,
              transparência e foco em segurança, conformidade e soberania de
              dados.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {capabilities.map((capability) => (
            <motion.div
              key={capability.title}
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              {capability.icon}
              <span className="text-sm font-medium">{capability.title}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
