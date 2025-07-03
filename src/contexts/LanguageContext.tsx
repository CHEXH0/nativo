import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.programs': 'Programas',
    'nav.instructors': 'Instructores',
    'nav.memberships': 'Membresías',
    'nav.store': 'Tienda',
    'nav.login': 'Iniciar sesión',
    'nav.logout': 'Cerrar sesión',
    'nav.profile': 'Perfil',

    // Hero Section
    'hero.title': 'Tu Camino Hacia el Bienestar Holístico',
    'hero.subtitle': 'Descubre el equilibrio perfecto entre cuerpo, mente y espíritu con NATIVO Holístico',
    'hero.cta': 'Comienza Tu Viaje',
    'hero.memberships.title': 'Nuestras Membresías',
    'hero.memberships.subtitle': 'Elige el plan que mejor se adapte a tu viaje hacia el bienestar holístico',

    // Welcome Section
    'welcome.title': 'Bienvenido a NATIVO',
    'welcome.subtitle': 'Tu Viaje Hacia el Bienestar Comienza Aquí',
    'welcome.description1': 'En NATIVO, creemos en un enfoque holístico del bienestar que nutre el cuerpo, la mente y el espíritu. Nuestro espacio está diseñado para ser tu santuario, donde podrás reconectar con tu esencia natural y descubrir un camino hacia una vida más equilibrada y consciente.',
    'welcome.description2': 'Te invitamos a ser parte de nuestra comunidad, donde cada persona es valorada en su individualidad y apoyada en su viaje hacia el bienestar integral.',

    // Programs Section
    'programs.title': 'Nuestros Programas',

    // Testimonials Section
    'testimonials.title': 'Testimonios',
    'testimonials.brenda.role': 'Participante del Programa de Bienestar',
    'testimonials.brenda.quote': 'Fui acompañada respetuosamente hacia lograr mis objetivos. Hacen de este programa algo muy completo en todas las áreas de la vida.',
    'testimonials.vilma.role': 'Miembro de NATIVO Holistico',
    'testimonials.vilma.quote': 'Me encanta que es un programa bien completo. Estoy feliz de los resultados que estoy viendo con mi programa personalizada.',
    'testimonials.priscilla.role': 'Estudiante de Talleres Holísticos',
    'testimonials.priscilla.quote': 'De verdad aprecié la tenacidad y el compromiso por parte de Juan Manuel porque eso me ayudó a lograr mis objetivos.',

    // Memberships Section

    // Login Page
    'login.title': 'Bienvenido a NATIVO',
    'login.subtitle': 'Inicia sesión para continuar',
    'login.loading': 'Cargando...',
    'login.error.session': 'Error al verificar la sesión',
    'login.error.registered': 'Este correo ya está registrado. Por favor inicia sesión.',
    'login.error.credentials': 'Correo o contraseña incorrectos. Por favor verifica tus credenciales e intenta de nuevo.',
    'login.error.confirm': 'Por favor confirma tu correo electrónico antes de iniciar sesión.',
    'login.error.requests': 'Demasiados intentos. Por favor espera unos minutos antes de intentar de nuevo.',
    'login.session.closed': 'Sesión cerrada',
    'login.session.success': 'Has cerrado sesión exitosamente',
    'login.session.error': 'No se pudo cerrar la sesión',

    // Profile
    'profile.loading': 'Cargando...',
    'profile.content.basic': 'Contenido Básico',
    'profile.content.gold': 'Contenido GOLD',
    'profile.content.vip': 'Contenido VIP',
    'profile.content.locked': 'Contenido Bloqueado',
    'profile.content.locked.subtitle': 'Suscríbete a un plan para acceder a contenido exclusivo diseñado para tu bienestar integral',
    'profile.upgrade': 'Mejorar mi Plan',
    'profile.upgrade.vip': 'Mejorar a VIP',

    // Programs
    'program.notfound.title': 'Programa no encontrado',
    'program.notfound.message': 'Lo sentimos, el programa que buscas no está disponible.',

    // Program Details
    'program.tabs.overview': 'Descripción',
    'program.tabs.details': 'Detalles',
    'program.tabs.schedule': 'Horarios',
    'program.overview.title': 'Descripción General',
    'program.details.title': 'Incluye',
    'program.schedule.title': 'Horarios y Disponibilidad',
    'program.video.unsupported': 'Tu navegador no soporta la etiqueta de video.',

    // Program Data
    'program.talleres.title': 'Talleres Holisticos',
    'program.talleres.description': 'Descubre tu camino hacia una vida más equilibrada y consciente con nuestros talleres.',
    'program.talleres.overview': 'Nuestros talleres holísticos están diseñados para ayudarte a encontrar el equilibrio en todas las áreas de tu vida. A través de prácticas ancestrales y modernas, te guiaremos en un viaje de autodescubrimiento y crecimiento personal.',
    'program.talleres.schedule': 'Talleres disponibles las 24 horas. Duración aproximada 12 minutos por taller.',
    'program.bienestar.title': 'Programa De Bienestar',
    'program.bienestar.description': 'Lleva una vida saludable integrando el ejercicio la nutrición, las emociones, y la espiritualidad mediante asesorías personalizadas.',
    'program.bienestar.overview': 'Un programa integral que combina ejercicio físico, nutrición personalizada y apoyo emocional para alcanzar un estado óptimo de bienestar. Trabajamos con un enfoque personalizado para ayudarte a alcanzar tus objetivos de salud.',
    'program.bienestar.schedule': 'Planes personalizados | Seguimiento semanal',
    'program.casa.title': 'Casa NATIVA',
    'program.casa.description': 'Es un lugar donde podrás conectar contigo mismo, con las plantas, con los animales, y con la espiritualidad.',
    'program.casa.overview': 'Un espacio sagrado diseñado para reconectar con tu esencia natural. Casa NATIVO te ofrece un ambiente único donde podrás experimentar la conexión con la naturaleza, las prácticas ancestrales y la sabiduría tradicional.',
    'program.casa.schedule': 'Retiros de fin de semana | Experiencias diarias',

    // Membership Features
    'membership.basic.features.0': 'Acceso a contenido básico',
    'membership.basic.features.1': 'Comunidad en línea',
    'membership.basic.features.2': 'Newsletter mensual',
    'membership.basic.features.3': 'Acesoria virtual al mes',
    'membership.gold.features.0': 'Todo lo del plan Básico',
    'membership.gold.features.1': 'Acceso a dos talleres grupales al mes',
    'membership.gold.features.2': 'Seguimiento personalizado por Chat',
    'membership.gold.features.3': '2 acesorias en vivo al mes',
    'membership.vip.features.0': 'Todo lo del plan GOLD',
    'membership.vip.features.1': 'Acesorias privadas',
    'membership.vip.features.2': 'Talleres virtuales ilimitadas',
    'membership.vip.features.3': 'Limpieza energetica medicina tradicional',

    // Profile Page
    'profile.account.settings': 'Ajustes de cuenta',
    'profile.tabs.subscription': 'Suscripción',
    'profile.tabs.payment': 'Pagos',
    'profile.tabs.settings': 'Ajustes',
    'profile.content.title': 'Contenido Premium',
    'profile.content.description': 'Accede a tu contenido exclusivo según tu plan',
    'profile.admin.access': 'Acceso Completo',

    // Memberships
    'memberships.title': 'Membresías',
    'memberships.popular': 'Más Popular',
    'memberships.select': 'Seleccionar Plan',
    'memberships.start': 'Empezar Ahora',
    'memberships.login.required': 'Debes iniciar sesión para suscribirte',
    'memberships.payment.error': 'No se pudo procesar el pago. Intenta nuevamente.',
    'memberships.plan.updated': 'Plan actualizado a',
    'memberships.plan.update.error': 'No se pudo actualizar el plan',
    'memberships.payment.cancelled': 'Pago cancelado. No se ha realizado ningún cargo.',

    // Instructors Page
    'instructors.title': 'Nuestros Instructores',
    'instructors.description': 'Conoce a nuestro equipo de instructores especializados, cada uno comprometido con guiarte en tu viaje hacia el bienestar integral y la transformación personal.',
    'instructors.join.title': '¿Quieres formar parte de nuestro equipo?',
    'instructors.join.description': 'Si eres un profesional del bienestar y compartes nuestra visión holística, nos encantaría conocerte.',
    'instructors.contact': 'Contáctanos',
    'instructors.contact.title': 'Información de Contacto',
    'instructors.contact.phone': 'Teléfono',
    'instructors.contact.email': 'Email',
    'instructors.contact.message': 'Estamos aquí para ayudarte en tu viaje hacia el bienestar integral',

    // Store Page
    'store.title': 'Nuestra Tienda',
    'store.buy': 'Comprar Ahora',
    'store.processing': 'Procesando...',
    'store.error.title': 'Error',
    'store.error.description': 'Hubo un problema al procesar tu compra. Por favor intenta de nuevo.',

    // Newsletter Section
    'newsletter.title': 'Nuestros Productos',
    'newsletter.subtitle': 'Descubre nuestra selección exclusiva de productos de bienestar holístico',

    // Common
    'common.error': 'Error',
    'common.loading': 'Cargando...',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.programs': 'Programs',
    'nav.instructors': 'Instructors',
    'nav.memberships': 'Memberships',
    'nav.store': 'Store',
    'nav.login': 'Sign In',
    'nav.logout': 'Sign Out',
    'nav.profile': 'Profile',

    // Hero Section
    'hero.title': 'Your Path to Holistic Wellness',
    'hero.subtitle': 'Discover the perfect balance between body, mind and spirit with NATIVO Holistic',
    'hero.cta': 'Start Your Journey',
    'hero.memberships.title': 'Our Memberships',
    'hero.memberships.subtitle': 'Choose the plan that best fits your holistic wellness journey',

    // Welcome Section
    'welcome.title': 'Welcome to NATIVO',
    'welcome.subtitle': 'Your Wellness Journey Starts Here',
    'welcome.description1': 'At NATIVO, we believe in a holistic approach to wellness that nourishes the body, mind and spirit. Our space is designed to be your sanctuary, where you can reconnect with your natural essence and discover a path toward a more balanced and conscious life.',
    'welcome.description2': 'We invite you to be part of our community, where each person is valued for their individuality and supported on their journey toward integral wellness.',

    // Programs Section
    'programs.title': 'Our Programs',

    // Testimonials Section
    'testimonials.title': 'Testimonials',
    'testimonials.brenda.role': 'Wellness Program Participant',
    'testimonials.brenda.quote': 'I was respectfully guided toward achieving my goals. They make this program something very complete in all areas of life.',
    'testimonials.vilma.role': 'NATIVO Holistic Member',
    'testimonials.vilma.quote': 'I love that it is a very complete program. I am happy with the results I am seeing with my personalized program.',
    'testimonials.priscilla.role': 'Holistic Workshops Student',
    'testimonials.priscilla.quote': 'I really appreciated the tenacity and commitment from Juan Manuel because that helped me achieve my goals.',

    // Memberships Section

    // Login Page
    'login.title': 'Welcome to NATIVO',
    'login.subtitle': 'Sign in to continue',
    'login.loading': 'Loading...',
    'login.error.session': 'Error checking session',
    'login.error.registered': 'This email is already registered. Please sign in.',
    'login.error.credentials': 'Incorrect email or password. Please verify your credentials and try again.',
    'login.error.confirm': 'Please confirm your email before signing in.',
    'login.error.requests': 'Too many attempts. Please wait a few minutes before trying again.',
    'login.session.closed': 'Session closed',
    'login.session.success': 'You have successfully signed out',
    'login.session.error': 'Could not sign out',

    // Profile
    'profile.loading': 'Loading...',
    'profile.content.basic': 'Basic Content',
    'profile.content.gold': 'GOLD Content',
    'profile.content.vip': 'VIP Content',
    'profile.content.locked': 'Locked Content',
    'profile.content.locked.subtitle': 'Subscribe to a plan to access exclusive content designed for your integral wellness',
    'profile.upgrade': 'Upgrade My Plan',
    'profile.upgrade.vip': 'Upgrade to VIP',

    // Programs
    'program.notfound.title': 'Program not found',
    'program.notfound.message': 'Sorry, the program you are looking for is not available.',

    // Program Details
    'program.tabs.overview': 'Overview',
    'program.tabs.details': 'Details',
    'program.tabs.schedule': 'Schedule',
    'program.overview.title': 'General Overview',
    'program.details.title': 'Includes',
    'program.schedule.title': 'Schedule and Availability',
    'program.video.unsupported': 'Your browser does not support the video tag.',

    // Program Data
    'program.talleres.title': 'Holistic Workshops',
    'program.talleres.description': 'Discover your path to a more balanced and conscious life with our workshops.',
    'program.talleres.overview': 'Our holistic workshops are designed to help you find balance in all areas of your life. Through ancestral and modern practices, we will guide you on a journey of self-discovery and personal growth.',
    'program.talleres.schedule': 'Workshops available 24 hours. Approximate duration 12 minutes per workshop.',
    'program.bienestar.title': 'Wellness Program',
    'program.bienestar.description': 'Live a healthy life by integrating exercise, nutrition, emotions, and spirituality through personalized consultations.',
    'program.bienestar.overview': 'A comprehensive program that combines physical exercise, personalized nutrition and emotional support to achieve optimal wellness. We work with a personalized approach to help you achieve your health goals.',
    'program.bienestar.schedule': 'Personalized plans | Weekly follow-up',
    'program.casa.title': 'Casa NATIVA',
    'program.casa.description': 'It is a place where you can connect with yourself, with plants, with animals, and with spirituality.',
    'program.casa.overview': 'A sacred space designed to reconnect with your natural essence. Casa NATIVO offers you a unique environment where you can experience connection with nature, ancestral practices and traditional wisdom.',
    'program.casa.schedule': 'Weekend retreats | Daily experiences',

    // Membership Features
    'membership.basic.features.0': 'Access to basic content',
    'membership.basic.features.1': 'Online community',
    'membership.basic.features.2': 'Monthly newsletter',
    'membership.basic.features.3': 'Virtual consultation per month',
    'membership.gold.features.0': 'Everything from Basic plan',
    'membership.gold.features.1': 'Access to two group workshops per month',
    'membership.gold.features.2': 'Personalized chat follow-up',
    'membership.gold.features.3': '2 live consultations per month',
    'membership.vip.features.0': 'Everything from GOLD plan',
    'membership.vip.features.1': 'Private consultations',
    'membership.vip.features.2': 'Unlimited virtual workshops',
    'membership.vip.features.3': 'Traditional medicine energy cleansing',

    // Profile Page
    'profile.account.settings': 'Account Settings',
    'profile.tabs.subscription': 'Subscription',
    'profile.tabs.payment': 'Payments',
    'profile.tabs.settings': 'Settings',
    'profile.content.title': 'Premium Content',
    'profile.content.description': 'Access your exclusive content according to your plan',
    'profile.admin.access': 'Full Access',

    // Memberships
    'memberships.title': 'Memberships',
    'memberships.popular': 'Most Popular',
    'memberships.select': 'Select Plan',
    'memberships.start': 'Start Now',
    'memberships.login.required': 'You must sign in to subscribe',
    'memberships.payment.error': 'Payment could not be processed. Please try again.',
    'memberships.plan.updated': 'Plan updated to',
    'memberships.plan.update.error': 'Could not update plan',
    'memberships.payment.cancelled': 'Payment cancelled. No charges have been made.',

    // Instructors Page
    'instructors.title': 'Our Instructors',
    'instructors.description': 'Meet our team of specialized instructors, each committed to guiding you on your journey toward integral wellness and personal transformation.',
    'instructors.join.title': 'Want to be part of our team?',
    'instructors.join.description': 'If you are a wellness professional who shares our holistic vision, we would love to meet you.',
    'instructors.contact': 'Contact Us',
    'instructors.contact.title': 'Contact Information',
    'instructors.contact.phone': 'Phone',
    'instructors.contact.email': 'Email',
    'instructors.contact.message': 'We are here to help you on your journey toward integral wellness',

    // Store Page
    'store.title': 'Our Store',
    'store.buy': 'Buy Now',
    'store.processing': 'Processing...',
    'store.error.title': 'Error',
    'store.error.description': 'There was a problem processing your purchase. Please try again.',

    // Newsletter Section
    'newsletter.title': 'Our Products',
    'newsletter.subtitle': 'Discover our exclusive selection of holistic wellness products',

    // Common
    'common.error': 'Error',
    'common.loading': 'Loading...',
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('nativo-language');
    return (saved as Language) || 'es';
  });

  useEffect(() => {
    localStorage.setItem('nativo-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};