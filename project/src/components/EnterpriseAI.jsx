import { motion } from 'framer-motion';
import { Brain, Shield, Zap, BarChart, Cloud, Lock } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "Advanced ML Models",
    description: "Custom-trained machine learning models tailored to your business needs and data.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption and compliance with SOC2, GDPR, and HIPAA standards.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Lightning-fast AI inference with sub-second response times at scale.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: BarChart,
    title: "Predictive Analytics",
    description: "Leverage AI to forecast trends and make data-driven decisions.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Cloud,
    title: "Scalable Infrastructure",
    description: "Auto-scaling cloud architecture that grows with your business.",
    color: "from-indigo-500 to-blue-500"
  },
  {
    icon: Lock,
    title: "Data Privacy",
    description: "Your data stays yours. On-premise deployment options available.",
    color: "from-red-500 to-pink-500"
  }
];

export default function EnterpriseAI({ darkMode }) {
  return (
    <section id="enterprise" className={`py-20 ${darkMode ? 'bg-slate-900' : 'bg-white'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full mb-4">
            <Brain className="w-5 h-5" />
            <span className="font-semibold">Enterprise Solutions</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Enterprise AI Platform
          </h2>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Transform your business with AI-powered solutions designed for scale, security, and performance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`${darkMode ? 'bg-slate-800' : 'bg-slate-50'} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all`}
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {feature.title}
              </h3>
              <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`${darkMode ? 'bg-gradient-to-br from-blue-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 to-cyan-50'} rounded-2xl p-8 md:p-12 text-center`}
        >
          <h3 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Ready to Scale with AI?
          </h3>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Join hundreds of enterprises leveraging our AI platform to drive innovation and growth
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg"
            >
              Schedule Demo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-white hover:bg-slate-50 text-slate-900'} px-8 py-3 rounded-lg font-semibold shadow-lg border ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}
            >
              View Pricing
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
