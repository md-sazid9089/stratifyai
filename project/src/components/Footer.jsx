import { Linkedin, Twitter, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer({ darkMode }) {
  return (
    <footer className={`${darkMode ? 'bg-slate-900 text-slate-300' : 'bg-slate-100 text-slate-700'} py-12 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">StratifyAi</h3>
            <p className="text-sm">
              Empowering entrepreneurs to plan, validate, and grow their startup ideas with AI-powered insights.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-blue-500 transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a></li>
              <li><a href="#privacy" className="hover:text-blue-500 transition-colors">Privacy</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className={`mt-8 pt-8 border-t ${darkMode ? 'border-slate-800' : 'border-slate-300'} text-center text-sm`}
        >
          <p>&copy; 2025 StratifyAi. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
