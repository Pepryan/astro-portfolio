import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink, FiCalendar } from 'react-icons/fi';

const certifications = [
  {
    title: "AWS Academy Cloud Architecting",
    issuer: "AWS",
    date: "2023",
    status: "Active",
    description: "Comprehensive cloud architecture training and certification",
    credentialUrl: "https://www.credly.com/badges/576f0a39-1615-4d94-860b-d8fc2316de44/public_url",
    logo: "/images/aws-logo.png"
  },
  {
    title: "Certified DevOps Professional",
    issuer: "GitLab",
    date: "2023",
    status: "Active",
    description: "Advanced DevOps practices and GitLab platform expertise",
    credentialUrl: "https://www.credly.com/badges/f3a13b0d-f6ef-41d8-884e-52060edc9e75/public_url",
    logo: "/images/gitlab-logo.png"
  },
  {
    title: "Certified Security Specialist",
    issuer: "GitLab",
    date: "2022",
    status: "Active",
    description: "Security best practices and GitLab security features",
    credentialUrl: "https://www.credly.com/badges/fe4d83d0-b1b4-469c-8c41-953254e07476/public_url",
    logo: "/images/gitlab-logo.png"
  },
  {
    title: "Certified CI/CD Associate",
    issuer: "GitLab",
    date: "2022",
    status: "Active",
    description: "Continuous Integration and Continuous Deployment expertise",
    credentialUrl: "https://www.credly.com/badges/f9b78922-688e-4729-91de-9e90bd5cef1d/public_url",
    logo: "/images/gitlab-logo.png"
  },
  {
    title: "Certified Project Management Associate",
    issuer: "GitLab",
    date: "2022",
    status: "Active",
    description: "Project management methodologies and GitLab project tools",
    credentialUrl: "https://www.credly.com/badges/2063b57e-5d5e-4917-8199-edbcb766f635/public_url",
    logo: "/images/gitlab-logo.png"
  },
  {
    title: "Certified Git Associate",
    issuer: "GitLab",
    date: "2022",
    status: "Active",
    description: "Git version control and collaboration fundamentals",
    credentialUrl: "https://www.credly.com/badges/cef73c89-298d-44d5-8885-29d4eb6f3990/public_url",
    logo: "/images/gitlab-logo.png"
  },
  {
    title: "RHCSA Rapid Track Course",
    issuer: "Btech",
    date: "2022",
    status: "Active",
    description: "Red Hat Certified System Administrator training",
    credentialUrl: null,
    logo: "/images/redhat-logo.png"
  },
  {
    title: "IT Support Specialization",
    issuer: "Google",
    date: "2021",
    status: "Active",
    description: "Comprehensive IT support and troubleshooting skills",
    credentialUrl: "https://www.credly.com/badges/b9c328c5-1e22-41b4-a1e3-f04cb9a37669/public_url",
    logo: "/images/google-logo.png"
  },
  {
    title: "Web Development Node.js",
    issuer: "Progate",
    date: "2020",
    status: "Active",
    description: "Server-side JavaScript development with Node.js",
    credentialUrl: null,
    logo: "/images/progate-logo.png"
  },
  {
    title: "Web Development Ruby on Rails",
    issuer: "Progate",
    date: "2020",
    status: "Active",
    description: "Full-stack web development with Ruby on Rails",
    credentialUrl: null,
    logo: "/images/progate-logo.png"
  },
  {
    title: "Memulai Pemrograman dengan Python",
    issuer: "Dicoding",
    date: "2020",
    status: "Active",
    description: "Python programming fundamentals and best practices",
    credentialUrl: null,
    logo: "/images/dicoding-logo.png"
  },
  {
    title: "Network and Infrastructure",
    issuer: "Kominfo & BNSP",
    date: "2019",
    status: "Active",
    description: "Network infrastructure design and management",
    credentialUrl: null,
    logo: "/images/kominfo-logo.png"
  },
  {
    title: "Digitalent Junior Network Administrator",
    issuer: "Kominfo",
    date: "2019",
    status: "Active",
    description: "Network administration and digital talent development",
    credentialUrl: null,
    logo: "/images/kominfo-logo.png"
  },
  {
    title: "Web Programming C#",
    issuer: "LepKom Gunadarma",
    date: "2017",
    status: "Active",
    description: "Web application development using C# and .NET",
    credentialUrl: null,
    logo: "/images/gunadarma-logo.png"
  },
  {
    title: "OS Server Linux Ubuntu",
    issuer: "LepKom Gunadarma",
    date: "2017",
    status: "Active",
    description: "Linux server administration and Ubuntu management",
    credentialUrl: null,
    logo: "/images/gunadarma-logo.png"
  },
  {
    title: "Cisco Certified Network Associate (CCNA)",
    issuer: "Cisco",
    date: "2013",
    status: "Active",
    description: "Network fundamentals and Cisco networking technologies",
    credentialUrl: null,
    logo: "/images/cisco-logo.png"
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
            
            {cert.credentialUrl && cert.credentialUrl !== '#' && (
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
