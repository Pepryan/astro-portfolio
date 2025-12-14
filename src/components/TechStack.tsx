import { motion } from 'framer-motion';

// Tech stack data - curated list of primary tools
const techStacks = [
    // Operating Systems
    { name: 'Linux', icon: '🐧', category: 'OS' },
    { name: 'Ubuntu', icon: '🟠', category: 'OS' },
    { name: 'CentOS/RHEL', icon: '🔴', category: 'OS' },

    // Containers & Orchestration
    { name: 'Docker', icon: '🐳', category: 'Container' },
    { name: 'Podman', icon: '🦭', category: 'Container' },
    { name: 'OpenShift/OKD', icon: '⭕', category: 'Container' },

    // Cloud & Virtualization
    { name: 'OpenStack', icon: '☁️', category: 'Cloud' },
    { name: 'KVM', icon: '💻', category: 'Virtualization' },

    // CI/CD
    { name: 'GitLab CI', icon: '🦊', category: 'CI/CD' },

    // Monitoring & Observability
    { name: 'Grafana', icon: '📊', category: 'Monitoring' },
    { name: 'Prometheus', icon: '🔥', category: 'Monitoring' },
    { name: 'Loki', icon: '📝', category: 'Monitoring' },
    { name: 'Victoria Metrics', icon: '📈', category: 'Monitoring' },

    // Scripting & Automation
    { name: 'Bash', icon: '💲', category: 'Scripting' },
    { name: 'Python', icon: '🐍', category: 'Scripting' },
    { name: 'Automation', icon: '🤖', category: 'Scripting' },
];

export default function TechStack() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 150
            }
        }
    };

    return (
        <section className="py-12 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-xl md:text-2xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                        Technologies I Work With
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-500">
                        Tools and technologies in my daily toolkit
                    </p>
                </motion.div>

                {/* Tech Icons Grid */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 md:gap-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    {techStacks.map((tech) => (
                        <motion.div
                            key={tech.name}
                            className="tech-icon-wrapper"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="tech-icon"
                                whileHover={{ scale: 1.1, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-2xl md:text-3xl">{tech.icon}</span>
                            </motion.div>
                            <span className="tech-icon-tooltip">{tech.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
