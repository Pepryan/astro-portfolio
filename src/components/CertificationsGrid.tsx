import { motion } from 'framer-motion';
import { FiAward, FiExternalLink, FiCalendar } from 'react-icons/fi';

const certifications = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    status: "Active",
    description: "Validates expertise in designing distributed systems on AWS",
    credentialUrl: "#",
    logo: "/images/aws-logo.png"
  },
  {
    title: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    date: "2023",
    status: "Active",
    description: "Demonstrates skills in Kubernetes cluster administration",
    credentialUrl: "#",
    logo: "/images/k8s-logo.png"
  },
  {
    title: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    date: "2022",
    status: "Active",
    description: "Validates knowledge of Terraform's basic concepts and skills",
    credentialUrl: "#",
    logo: "/images/terraform-logo.png"
  },
  {
    title: "Docker Certified Associate",
    issuer: "Docker Inc.",
    date: "2022",
    status: "Active",
    description: "Demonstrates proficiency in Docker containerization platform",
    credentialUrl: "#",
    logo: "/images/docker-logo.png"
  }
];

export default function CertificationsGrid() {
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

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {certifications.map((cert, index) => (
        <motion.div
          key={cert.title}
          className="bg-white/80 dark:bg-neutral-800/80 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700 group"
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          {/* Certification Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mr-3">
                <FiAward className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  {cert.title}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {cert.issuer}
                </p>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              cert.status === 'Active' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400'
            }`}>
              {cert.status}
            </span>
          </div>

          {/* Certification Description */}
          <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm leading-relaxed">
            {cert.description}
          </p>

          {/* Certification Details */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <FiCalendar className="w-4 h-4 mr-1" />
              {cert.date}
            </div>
            
            {cert.credentialUrl && (
              <motion.a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiExternalLink className="w-4 h-4" />
                Verify
              </motion.a>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
