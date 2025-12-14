import { motion } from 'framer-motion';
import { FiArrowRight, FiClock, FiCalendar } from 'react-icons/fi';

interface Post {
    slug: string;
    data: {
        title: string;
        date: Date | string;
        summary?: string;
        category?: string;
        thumbnail?: string;
        tags?: string[];
    };
    readingTime?: number;
}

interface LatestPostsProps {
    posts: Post[];
}

export default function LatestPosts({ posts }: LatestPostsProps) {
    if (!posts || posts.length === 0) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 120
            }
        }
    };

    const formatDate = (date: Date | string) => {
        const d = new Date(date);
        return d.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getCategoryIcon = (category?: string) => {
        switch (category?.toLowerCase()) {
            case 'cloud engineering':
            case 'cloud':
                return '☁️';
            case 'devops':
                return '⚙️';
            case 'technology':
                return '💻';
            case 'system administration':
                return '🖥️';
            default:
                return '📝';
        }
    };

    return (
        <section className="py-16 sm:py-24 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent
              bg-gradient-to-r from-neutral-900 to-neutral-600
              dark:from-neutral-100 dark:to-neutral-400 mb-4"
                        variants={itemVariants}
                    >
                        Latest Articles
                    </motion.h2>
                    <motion.p
                        className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
                        variants={itemVariants}
                    >
                        Fresh insights on cloud engineering, DevOps, and modern technology
                    </motion.p>
                </motion.div>

                {/* Posts Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    {posts.slice(0, 3).map((post, index) => (
                        <motion.a
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="blog-card-minimal group"
                            variants={itemVariants}
                        >
                            {/* Category Icon */}
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-2xl">{getCategoryIcon(post.data.category)}</span>
                                {post.data.category && (
                                    <span className="text-xs font-medium px-2 py-1 rounded-full
                    bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                        {post.data.category}
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2
                group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors
                line-clamp-2">
                                {post.data.title}
                            </h3>

                            {/* Summary */}
                            {post.data.summary && (
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                                    {post.data.summary}
                                </p>
                            )}

                            {/* Meta */}
                            <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-500">
                                <span className="flex items-center gap-1">
                                    <FiCalendar className="w-3 h-3" />
                                    {formatDate(post.data.date)}
                                </span>
                                {post.readingTime && (
                                    <span className="flex items-center gap-1">
                                        <FiClock className="w-3 h-3" />
                                        {post.readingTime} min
                                    </span>
                                )}
                            </div>

                            {/* Read More Indicator */}
                            <div className="mt-3 flex items-center text-sm font-medium
                text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span>Read more</span>
                                <FiArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    className="text-center mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <a
                        href="/blog"
                        className="btn-stylized-outline"
                    >
                        <span>View All Articles</span>
                        <FiArrowRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
