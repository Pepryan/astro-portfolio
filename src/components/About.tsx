import { motion } from 'framer-motion';
import { FiCloud, FiServer, FiCode, FiActivity, FiMapPin, FiBookOpen } from 'react-icons/fi';

export default function About() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cardHoverVariants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    hover: {
      scale: 1.02,
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  // Current focus items with icons
  const focusItems = [
    { text: 'Cloud Architecture', icon: <FiCloud /> },
    { text: 'Infrastructure Automation', icon: <FiServer /> },
    { text: 'Web Development', icon: <FiCode /> },
    { text: 'Cloud-Native Apps', icon: <FiActivity /> }
  ];

  // Hobbies with icons
  const hobbies = [
    { text: 'New Technologies', icon: <FiCode /> },
    { text: 'Trekking & Nature', icon: <FiMapPin /> },
    { text: 'Reading', icon: <FiBookOpen /> }
  ];

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 py-8 md:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <motion.div className="lg:col-span-2 space-y-8" variants={itemVariants}>
        <motion.div
          className="prose dark:prose-invert max-w-none"
          variants={itemVariants}
        >
          <motion.div
            className="p-6 bg-white/80 dark:bg-neutral-800/80 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 cursor-pointer"
            variants={cardHoverVariants}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
              Hello, and welcome to my blog!<br/><br/>

              My name is <span className="font-semibold text-blue-600 dark:text-blue-400">Ryan</span> a tech enthusiast living in <span className="font-semibold text-blue-600 dark:text-blue-400">Bogor, Indonesia</span>. My main interest in <span className="font-semibold text-blue-600 dark:text-blue-400">Information Technology</span> started since I was at <span className="font-semibold text-blue-600 dark:text-blue-400">junior high school</span>. That time, I had built some PCs, over-clocked them, enjoyed some gaming, and hardware optimization.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="p-6 bg-white/80 dark:bg-neutral-800/80 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 cursor-pointer"
          variants={cardHoverVariants}
          initial="rest"
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
        >
          <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            Now, I work as a <span className="font-semibold text-blue-600 dark:text-blue-400">Cloud Engineer</span> focusing on <span className="font-semibold text-blue-600 dark:text-blue-400">DevOps practices</span>, <span className="font-semibold text-blue-600 dark:text-blue-400">infrastructure automation</span>, and <span className="font-semibold text-blue-600 dark:text-blue-400">cloud-native applications</span>. I'm passionate about building scalable, reliable systems and sharing knowledge through this blog.
          </p>
        </motion.div>

        <motion.div
          className="p-6 bg-white/80 dark:bg-neutral-800/80 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 cursor-pointer"
          variants={cardHoverVariants}
          initial="rest"
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
        >
          <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            When I'm not coding or managing infrastructure, you'll find me exploring new technologies, contributing to open-source projects, or enjoying the great outdoors. I believe in continuous learning and love sharing what I discover along the way.
          </p>
        </motion.div>
      </motion.div>

      <motion.div className="space-y-8" variants={itemVariants}>
        {/* Current Focus Card */}
        <motion.div
          className="p-6 bg-white/80 dark:bg-neutral-800/80 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700"
          variants={cardHoverVariants}
          initial="rest"
          whileHover="hover"
        >
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center">
            <FiActivity className="mr-2 text-blue-500" /> Current Focus
          </h3>
          <div className="space-y-3">
            {focusItems.map((item, index) => (
              <motion.div
                key={item.text}
                className="flex items-center p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100/50 dark:hover:bg-blue-800/30 transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: 5, scale: 1.02 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-blue-500 mr-3">{item.icon}</span>
                <span className="text-neutral-700 dark:text-neutral-300">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interests Card */}
        <motion.div
          className="p-6 bg-white/80 dark:bg-neutral-800/80 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700"
          variants={cardHoverVariants}
          initial="rest"
          whileHover="hover"
        >
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center">
            <FiBookOpen className="mr-2 text-green-500" /> Interests
          </h3>
          <div className="space-y-3">
            {hobbies.map((hobby, index) => (
              <motion.div
                key={hobby.text}
                className="flex items-center p-3 bg-green-50/50 dark:bg-green-900/20 rounded-lg hover:bg-green-100/50 dark:hover:bg-green-800/30 transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: 5, scale: 1.02 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-green-500 mr-3">{hobby.icon}</span>
                <span className="text-neutral-700 dark:text-neutral-300">{hobby.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="p-6 bg-white/80 dark:bg-neutral-800/80 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700"
          variants={cardHoverVariants}
          initial="rest"
          whileHover="hover"
        >
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Quick Stats
          </h3>
          <div className="space-y-4">
            <motion.div
              className="flex justify-between p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
              whileHover={{ x: 5 }}
            >
              <span className="text-neutral-600 dark:text-neutral-400">Experience</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">4+ Years</span>
            </motion.div>
            <motion.div
              className="flex justify-between p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
              whileHover={{ x: 5 }}
            >
              <span className="text-neutral-600 dark:text-neutral-400">Location</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">Bogor, ID</span>
            </motion.div>
            <motion.div
              className="flex justify-between p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
              whileHover={{ x: 5 }}
            >
              <span className="text-neutral-600 dark:text-neutral-400">Focus</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">Cloud & DevOps</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
