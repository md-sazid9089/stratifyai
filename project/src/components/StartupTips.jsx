import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Users, DollarSign, Rocket } from 'lucide-react';
import { gsap } from 'gsap';

const tips = [
	{
		icon: Lightbulb,
		title: 'Validate Your Idea',
		description:
			'Test your concept with real customers before investing heavily. Use MVP strategies to gather feedback quickly.',
		color: 'from-yellow-500 to-orange-500',
	},
	{
		icon: Users,
		title: 'Build the Right Team',
		description:
			'Surround yourself with people who complement your skills. A strong team is your greatest asset.',
		color: 'from-blue-500 to-cyan-500',
	},
	{
		icon: DollarSign,
		title: 'Master Your Finances',
		description:
			'Keep a close eye on burn rate and runway. Financial discipline is critical in early stages.',
		color: 'from-green-500 to-emerald-500',
	},
	{
		icon: Rocket,
		title: 'Focus on Growth',
		description:
			'Prioritize customer acquisition and retention. Growth momentum attracts investors and talent.',
		color: 'from-pink-500 to-purple-500',
	},
];

export default function StartupTips({ darkMode }) {
	const cardsRef = useRef(null);

	useEffect(() => {
		const cards = cardsRef.current?.children;
		if (!cards) return;

		Array.from(cards).forEach((card) => {
			const handleMouseMove = (e) => {
				const rect = card.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				const centerX = rect.width / 2;
				const centerY = rect.height / 2;
				const rotateX = (y - centerY) / 10;
				const rotateY = (centerX - x) / 10;

				gsap.to(card, {
					rotationX: rotateX,
					rotationY: rotateY,
					transformPerspective: 1000,
					duration: 0.3,
					ease: 'power2.out',
				});
			};

			const handleMouseLeave = () => {
				gsap.to(card, {
					rotationX: 0,
					rotationY: 0,
					duration: 0.5,
					ease: 'elastic.out(1, 0.3)',
				});
			};

			card.addEventListener('mousemove', handleMouseMove);
			card.addEventListener('mouseleave', handleMouseLeave);

			return () => {
				card.removeEventListener('mousemove', handleMouseMove);
				card.removeEventListener('mouseleave', handleMouseLeave);
			};
		});
	}, []);

	return (
		<section
			className={`py-20 ${
				darkMode ? 'bg-slate-800' : 'bg-white'
			} transition-colors duration-300`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2
						className={`text-4xl font-bold mb-4 ${
							darkMode ? 'text-white' : 'text-slate-900'
						}`}
					>
						AI Startup Tips
					</h2>
					<p
						className={`text-lg ${
							darkMode ? 'text-slate-300' : 'text-slate-600'
						}`}
					>
						Essential insights to guide your entrepreneurial journey
					</p>
				</motion.div>

				<div
					ref={cardsRef}
					className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
				>
					{tips.map((tip, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className={`${
								darkMode ? 'bg-slate-900' : 'bg-slate-50'
							} rounded-xl p-6 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl transform-gpu`}
							style={{ transformStyle: 'preserve-3d' }}
						>
							<div
								className={`w-12 h-12 bg-gradient-to-r ${tip.color} rounded-lg flex items-center justify-center mb-4`}
							>
								<tip.icon className="w-6 h-6 text-white" />
							</div>
							<h3
								className={`text-xl font-bold mb-3 ${
									darkMode ? 'text-white' : 'text-slate-900'
								}`}
							>
								{tip.title}
							</h3>
							<p
								className={`${
									darkMode ? 'text-slate-300' : 'text-slate-600'
								}`}
							>
								{tip.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
