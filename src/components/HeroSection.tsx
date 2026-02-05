import { motion } from 'motion/react';
import { Button } from './ui/button';
import { GraduationCap, BookOpen, Users } from 'lucide-react';
import videoBg from '/School aerial view.mp4';


interface HeroSectionProps {
  language: string;
}

export function HeroSection({ language }: HeroSectionProps) {
  const floatingElements = [
    { icon: GraduationCap, x: 10, y: 20, delay: 0 },
    { icon: BookOpen, x: 85, y: 30, delay: 0.5 },
    { icon: Users, x: 15, y: 70, delay: 1 },
  ];

  const translations = {
    'English': {
      'Welcome to': 'Welcome to',
      'Shah Abdul Latif': 'Shah Abdul Latif',
      'Higher Secondary School': 'Higher Secondary School',
      'Nurturing minds, building futures, and creating tomorrow\'s leaders through excellence in education.': 'Nurturing minds, building futures, and creating tomorrow\'s leaders through excellence in education.',
      'Explore Programs': 'Explore Programs',
      'Contact Us': 'Contact Us',
      'Students': 'Students',
      'Teachers': 'Teachers',
      'Years of Excellence': 'Years of Excellence',
    },
    'Sindhi': {
      'Welcome to': 'ڀلي ڪري آيا',
      'Shah Abdul Latif': 'شاهه عبداللطيف',
      'Higher Secondary School': 'اعليٰ ثانوي اسڪول',
      'Nurturing minds, building futures, and creating tomorrow\'s leaders through excellence in education.': 'ذهنن جي پرورش، مستقبل جي تعمير، ۽ تعليم ۾ شانداريت جي ذريعي سڀاڻي جا اڳواڻ پيدا ڪرڻ.',
      'Explore Programs': 'پروگرام دريافت ڪريو',
      'Contact Us': 'اسان سان رابطو ڪريو',
      'Students': 'شاگرد',
      'Teachers': 'استاد',
      'Years of Excellence': 'شانداريت جا سال',
    },
    'Urdu': {
      'Welcome to': 'خوش آمدید',
      'Shah Abdul Latif': 'شاہ عبداللطیف',
      'Higher Secondary School': 'ہائر سیکنڈری اسکول',
      'Nurturing minds, building futures, and creating tomorrow\'s leaders through excellence in education.': 'ذہنوں کی پرورش، مستقبل کی تعمیر، اور تعلیم میں بہترین کارکردگی کے ذریعے کل کے رہنما بنانا۔',
      'Explore Programs': 'پروگرام دریافت کریں',
      'Contact Us': 'ہم سے رابطہ کریں',
      'Students': 'طلباء',
      'Teachers': 'اساتذہ',
      'Years of Excellence': 'فضیلت کے سال',
    },
  };

  const t = translations[language as keyof typeof translations];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Background Video */}
      <div className="absolute inset-0">
      <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src={videoBg} type="video/mp4" />
          </video>
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
      </div>
      
      {/* Animated background with sandpaper texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0),
              linear-gradient(45deg, transparent 25%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 50%, transparent 50%, transparent 75%, rgba(0,0,0,0.05) 75%)
            `,
            backgroundSize: '12px 12px, 24px 24px'
          }}
        />
      </div>

      {/* Floating elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.3, 
            scale: 1,
            y: [0, -20, 0],
          }}
          transition={{ 
            opacity: { duration: 1, delay: element.delay },
            scale: { duration: 0.8, delay: element.delay },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute hidden lg:block"
          style={{ left: `${element.x}%`, top: `${element.y}%` }}
        >
          <element.icon size={40} className="text-primary/30" />
        </motion.div>
      ))}

<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 bg-[rgba(233,4,4,0)]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main heading with staggered animation */}
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="block"
            >
              {t['Welcome to']}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            >
              {t['Shah Abdul Latif']}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="block"
            >
              {t['Higher Secondary School']}
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            {t['Nurturing minds, building futures, and creating tomorrow\'s leaders through excellence in education.']}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => {
                  const programsSection = document.getElementById('programs');
                  if (programsSection) {
                    programsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                size="lg"
                className="text-lg px-8 py-3 bg-primary hover:bg-primary/90"
              >
                {t['Explore Programs']}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-3">
                {t['Contact Us']}
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: "1300+", label: t.Students },
              { number: "25+", label: t.Teachers },
              { number: "8+", label: t['Years of Excellence'] }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.9 + index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 2.1 + index * 0.2, type: "spring" }}
                  className="text-2xl sm:text-3xl font-bold text-primary mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>


    </section>
  );
}