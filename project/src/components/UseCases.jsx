import { motion } from 'framer-motion';
import { Megaphone, Users, ShoppingCart, TrendingUp, MessageSquare, FileText } from 'lucide-react';

const useCases = [
  {
    icon: Megaphone,
    title: "Marketing AI Assistant",
    description: "Automate campaign creation, content generation, and audience targeting with intelligent AI.",
    benefits: [
      "Generate high-converting ad copy",
      "Optimize marketing spend with AI insights",
      "Personalize customer journeys at scale"
    ],
    color: "from-pink-500 to-rose-500",
    image: "https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    icon: Users,
    title: "Human Resources (HR) AI",
    description: "Streamline recruitment, onboarding, and employee engagement with AI-powered solutions.",
    benefits: [
      "AI-powered resume screening",
      "Automated interview scheduling",
      "Employee sentiment analysis"
    ],
    color: "from-blue-500 to-cyan-500",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Optimization",
    description: "Boost sales with AI-driven product recommendations and dynamic pricing strategies.",
    benefits: [
      "Smart product recommendations",
      "Dynamic pricing optimization",
      "Inventory demand forecasting"
    ],
    color: "from-green-500 to-emerald-500",
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    icon: TrendingUp,
    title: "Sales Intelligence",
    description: "Accelerate your sales cycle with AI that identifies leads and predicts conversion.",
    benefits: [
      "Lead scoring and prioritization",
      "Automated follow-up sequences",
      "Sales forecasting accuracy"
    ],
    color: "from-purple-500 to-pink-500",
    image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    icon: MessageSquare,
    title: "Customer Support AI",
    description: "Deliver instant, 24/7 customer support with intelligent chatbots and automation.",
    benefits: [
      "24/7 automated support",
      "Multi-language capabilities",
      "Ticket routing and prioritization"
    ],
    color: "from-orange-500 to-red-500",
    image: "https://images.pexels.com/photos/5708069/pexels-photo-5708069.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    icon: FileText,
    title: "Document Intelligence",
    description: "Extract insights from documents automatically with AI-powered analysis.",
    benefits: [
      "Automated data extraction",
      "Document classification",
      "Intelligent search and retrieval"
    ],
    color: "from-cyan-500 to-blue-500",
    image: "https://images.pexels.com/photos/6347720/pexels-photo-6347720.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

export default function UseCases({ darkMode }) {
  return (
    <section id="usecases" className={`py-20 ${darkMode ? 'bg-slate-800' : 'bg-slate-50'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            AI Use Cases
          </h2>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Discover how AI can transform every aspect of your business operations
          </p>
        </motion.div>

        <div className="space-y-12">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${darkMode ? 'bg-slate-900' : 'bg-white'} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all`}
            >
              <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                <div className={`p-8 md:p-12 ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                  <div className={`w-14 h-14 bg-gradient-to-r ${useCase.color} rounded-xl flex items-center justify-center mb-6`}>
                    <useCase.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {useCase.title}
                  </h3>

                  <p className={`text-lg mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {useCase.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                      Key Benefits:
                    </h4>
                    {useCase.benefits.map((benefit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start space-x-2"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${useCase.color} mt-2`} />
                        <span className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`mt-8 bg-gradient-to-r ${useCase.color} text-white px-6 py-3 rounded-lg font-semibold shadow-lg`}
                  >
                    Learn More
                  </motion.button>
                </div>

                <div className={`relative h-64 md:h-auto ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${useCase.color} opacity-10`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
