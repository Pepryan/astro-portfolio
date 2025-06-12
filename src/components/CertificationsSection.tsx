import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink, FiCalendar, FiCheckCircle } from 'react-icons/fi';

const certifications = [
  {
    title: "AWS Academy Cloud Architecting",
    issuer: "AWS",
    date: "2023",
    status: "Active",
    description: "Comprehensive cloud architecture training and certification",
    credentialUrl: "https://www.credly.com/badges/576f0a39-1615-4d94-860b-d8fc2316de44/public_url",
    logo: "/images/aws-logo.png",
    category: "Cloud"
  },
  {
    title: "Certified DevOps Professional",
    issuer: "GitLab",
    date: "2023",
    status: "Active",
    description: "Advanced DevOps practices and GitLab platform expertise",
    credentialUrl: "https://www.credly.com/badges/f3a13b0d-f6ef-41d8-884e-52060edc9e75/public_url",
    logo: "/images/gitlab-logo.webp",
    category: "DevOps"
  },
  {
    title: "Certified Security Specialist",
    issuer: "GitLab",
    date: "2022",
    status: "Active",
    description: "Security best practices and GitLab security features",
    credentialUrl: "https://www.credly.com/badges/fe4d83d0-b1b4-469c-8c41-953254e07476/public_url",
    logo: "/images/gitlab-logo.webp",
    category: "Security"
  },
  {
    title: "Certified CI/CD Associate",
    issuer: "GitLab",
    date: "2022",
    status: "Active",
    description: "Continuous Integration and Continuous Deployment expertise",
    credentialUrl: "https://www.credly.com/badges/f9b78922-688e-4729-91de-9e90bd5cef1d/public_url",
    logo: "/images/gitlab-logo.webp",
    category: "DevOps"
  },
    {
    title: "Certified Git Associate",
    issuer: "GitLab",
    date: "2022",
    status: "Active",
    description: "Git version control and collaboration fundamentals",
    credentialUrl: "https://www.credly.com/badges/cef73c89-298d-44d5-8885-29d4eb6f3990/public_url",
    logo: "/images/gitlab-logo.webp",
    category: "Tools"
  },
  {
    title: "Certified Project Management Associate",
    issuer: "GitLab",
    date: "2022",
    status: "Active",
    description: "Project management methodologies and GitLab project tools",
    credentialUrl: "https://www.credly.com/badges/2063b57e-5d5e-4917-8199-edbcb766f635/public_url",
    logo: "/images/gitlab-logo.png",
    category: "Tools"
  },
  {
    title: "Cisco Certified Network Associate (CCNA)",
    issuer: "Cisco",
    date: "2013",
    status: "Inactive",
    description: "Network fundamentals and Cisco networking technologies",
    credentialUrl: null,
    logo: "/images/cisco-logo.png",
    category: "Network"
  }
];

export default function CertificationsSection() {
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
    <section className="py-16">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4"
        >
          Certifications
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
        >
          Professional certifications validating my expertise in cloud and DevOps technologies
        </motion.p>
      </div>

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
            className="bg-white/80 dark:bg-neutral-800/80 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700 group backdrop-blur-sm"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            {/* Certification Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl mr-4">
                  <FiAward className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                    <span className="font-medium">{cert.issuer}</span>
                    <span className="w-1 h-1 bg-neutral-400 rounded-full"></span>
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                      cert.status === 'Active' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400'
                    }`}>
                      <FiCheckCircle className="w-3 h-3" />
                      {cert.status}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-lg">
                {cert.category}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
              {cert.description}
            </p>

            {/* Certification Details */}
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                <FiCalendar className="w-4 h-4 mr-2" />
                {cert.date}
              </div>
              
              {cert.credentialUrl && cert.credentialUrl !== '#' && (
                <motion.a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm"
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
    </section>
  );
}
