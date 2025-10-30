import { motion } from 'framer-motion';
import { Code, Palette, BarChart3, MessageSquare, Database } from 'lucide-react';

const tools = [
  {
    name: "Notion",
    category: "Productivity",
    icon: Database,
    description: "All-in-one workspace for notes, docs, and project management.",
    rating: 4.8,
    link: "https://notion.so"
  },
  {
    name: "Figma",
    category: "Design",
    icon: Palette,
    description: "Collaborative interface design tool for creating beautiful products.",
    rating: 4.9,
    link: "https://figma.com"
  },
  {
    name: "Stripe",
    category: "Payments",
    icon: Code,
    description: "Complete payment infrastructure for internet businesses.",
    rating: 4.7,
    link: "https://stripe.com"
  },
  {
    name: "Mixpanel",
    category: "Analytics",
    icon: BarChart3,
    description: "Advanced product analytics to understand user behavior.",
    rating: 4.6,
    link: "https://mixpanel.com"
  },
  {
    name: "Intercom",
    category: "Support",
    icon: MessageSquare,
    description: "Customer messaging platform for support and engagement.",
    rating: 4.5,
    link: "https://intercom.com"
  }
];

export default function TopTools({ darkMode }) {
  return (
    <section className={`py-20 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Top 5 Startup Tools
          </h2>
          <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Essential tools every startup should consider
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {tools.map((tool, index) => (
            <motion.a
              key={index}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className={`${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-50'} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer`}
            >
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg mb-4">
                <tool.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {tool.name}
              </h3>

              <div className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-3 font-medium`}>
                {tool.category}
              </div>

              <p className={`text-sm mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'} line-clamp-2`}>
                {tool.description}
              </p>

              <div className="flex items-center">
                <span className="text-yellow-500 text-lg mr-1">★</span>
                <span className={`text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  {tool.rating}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
