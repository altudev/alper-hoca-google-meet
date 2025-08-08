import { Video, Calendar, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  return (
    <motion.div 
      id="features"
      className="mt-24 grid md:grid-cols-3 gap-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <motion.div 
        className="text-center space-y-3"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div 
          className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <Video className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className="font-semibold text-lg">HD Video Kalitesi</h3>
        <p className="text-sm text-muted-foreground">
          Kristal netliğinde görüntü ve ses kalitesi ile toplantılarınızı gerçekleştirin.
        </p>
      </motion.div>
      <motion.div 
        className="text-center space-y-3"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div 
          className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <Calendar className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className="font-semibold text-lg">Kolay Planlama</h3>
        <p className="text-sm text-muted-foreground">
          Toplantılarınızı önceden planlayın ve katılımcılarla paylaşın.
        </p>
      </motion.div>
      <motion.div 
        className="text-center space-y-3"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div 
          className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <Plus className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className="font-semibold text-lg">Anında Başlat</h3>
        <p className="text-sm text-muted-foreground">
          Kayıt olmadan hemen toplantı başlatın ve arkadaşlarınızı davet edin.
        </p>
      </motion.div>
    </motion.div>
  );
}