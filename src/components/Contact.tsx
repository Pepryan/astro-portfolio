import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiGitlab } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { componentConfig } from '../config/components';

const { contact } = componentConfig;

export default function Contact() {
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

  const socialLinks = [
    {
      icon: FiGithub,
      href: contact.social.github.url,
      label: 'GitHub',
      color: 'hover:text-gray-600 dark:hover:text-gray-400'
    },
    {
      icon: FiGitlab,
      href: contact.social.gitlab.url,
      label: 'GitLab',
      color: 'hover:text-orange-600 dark:hover:text-orange-400'
    },
    {
      icon: FiLinkedin,
      href: contact.social.linkedin.url,
      label: 'LinkedIn',
      color: 'hover:text-blue-600 dark:hover:text-blue-400'
    },
    {
      icon: FaXTwitter,
      href: contact.social.twitter.url,
      label: 'X (Twitter)',
      color: 'hover:text-black dark:hover:text-white'
    }
  ];

  return (
    <motion.div
      className="py-8 md:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Section Header */}
      <motion.div className="text-center mb-16" variants={itemVariants}>
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Get In Touch
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
          Feel free to reach out for collaborations or just a friendly hello!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div className="space-y-8" variants={itemVariants}>
          <div className="bg-white/80 dark:bg-neutral-800/80 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              <motion.div 
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                  <FiMail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Email</p>
                  <a 
                    href={`mailto:${contact.email}`}
                    className="text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
                  <FiMapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Location</p>
                  <p className="text-neutral-900 dark:text-neutral-100">
                    {contact.location}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white/80 dark:bg-neutral-800/80 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
              Connect With Me
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 
                    text-neutral-600 dark:text-neutral-400 ${color} transition-all duration-300
                    hover:border-current hover:shadow-md`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div className="space-y-8" variants={itemVariants}>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Let's Work Together
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
              I'm always interested in new opportunities and exciting projects. 
              Whether you have a project in mind, want to collaborate, or just want to say hello, 
              I'd love to hear from you!
            </p>
            
            <div className="space-y-4">
              <motion.a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail className="w-5 h-5 mr-2" />
                Send Email
              </motion.a>
              
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                I typically respond within 24 hours
              </p>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-white/80 dark:bg-neutral-800/80 rounded-xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Quick Info
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Availability</span>
                <span className="font-medium text-green-600 dark:text-green-400">Open to opportunities</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Response Time</span>
                <span className="font-medium text-neutral-800 dark:text-neutral-200">Within 24 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Timezone</span>
                <span className="font-medium text-neutral-800 dark:text-neutral-200">GMT+7 (Jakarta)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
