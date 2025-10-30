import { motion } from 'framer-motion';
import { Award, TrendingUp, Users, Globe } from 'lucide-react';

export default function StartupOfWeek({ darkMode }) {
  return (
    <section className={`py-20 ${darkMode ? 'bg-slate-800' : 'bg-white'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full mb-4">
            <Award className="w-5 h-5" />
            <span className="font-semibold">Startup of the Week</span>
          </div>
          <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Featured Innovation
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`${darkMode ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-blue-50 to-cyan-50'} rounded-2xl overflow-hidden shadow-2xl`}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-auto">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Startup showcase"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent" />
            </div>

            <div className="p-8 md:p-12">
              <h3 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                CloudSync Pro
              </h3>
              <p className={`text-lg mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Revolutionary cloud collaboration platform that helps distributed teams work seamlessly across time zones and devices.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} p-4 rounded-lg text-center`}>
                  <Users className={`w-6 h-6 mx-auto mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>10K+</div>
                  <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Users</div>
                </div>

                <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} p-4 rounded-lg text-center`}>
                  <TrendingUp className={`w-6 h-6 mx-auto mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>300%</div>
                  <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Growth</div>
                </div>

                <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} p-4 rounded-lg text-center`}>
                  <Globe className={`w-6 h-6 mx-auto mb-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>25</div>
                  <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Countries</div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg"
              >
                Learn Their Story
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
