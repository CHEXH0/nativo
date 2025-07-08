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
    'nav.instructors': 'Instructores',
    'nav.store': 'Tienda',
    'nav.login': 'Iniciar sesión',
    'nav.logout': 'Cerrar sesión',
    'nav.profile': 'Perfil',

    // Hero Section
    'hero.title': 'Tu Camino Hacia el Bienestar Holístico',
    'hero.subtitle': 'Descubre el equilibrio perfecto entre cuerpo, mente y espíritu con NATIVO Holístico',
    'hero.cta': 'Comienza Tu Viaje',

    // Welcome Section
    'welcome.title': 'Bienvenido a NATIVO',
    'welcome.subtitle': 'Tu Viaje Hacia el Bienestar Comienza Aquí',
    'welcome.description1': 'En NATIVO, creemos en un enfoque holístico del bienestar que nutre el cuerpo, la mente y el espíritu. Nuestro espacio está diseñado para ser tu santuario, donde podrás reconectar con tu esencia natural y descubrir un camino hacia una vida más equilibrada y consciente.',
    'welcome.description2': 'Te invitamos a ser parte de nuestra comunidad, donde cada persona es valorada en su individualidad y apoyada en su viaje hacia el bienestar integral.',

    // Testimonials Section
    'testimonials.title': 'Testimonios',
    'testimonials.brenda.role': 'Participante del Programa de Bienestar',
    'testimonials.brenda.quote': 'Fui acompañada respetuosamente hacia lograr mis objetivos. Hacen de este programa algo muy completo en todas las áreas de la vida.',
    'testimonials.vilma.role': 'Miembro de NATIVO Holistico',
    'testimonials.vilma.quote': 'Me encanta que es un programa bien completo. Estoy feliz de los resultados que estoy viendo con mi programa personalizada.',
    'testimonials.priscilla.role': 'Estudiante de Talleres Holísticos',
    'testimonials.priscilla.quote': 'De verdad aprecié la tenacidad y el compromiso por parte de Juan Manuel porque eso me ayudó a lograr mis objetivos.',

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

    // Store
    'store.title': 'Nuestra Tienda',
    'store.subtitle': 'Descubre productos especiales para tu bienestar',
    'store.view': 'Ver en Etsy',

    // Common
    'common.error': 'Error',
    'common.loading': 'Cargando...',
    'common.success': 'Éxito',
    'common.cancel': 'Cancelar',
    'common.continue': 'Continuar',
    'common.back': 'Atrás',
    'common.next': 'Siguiente',
    'common.previous': 'Anterior',
    'common.save': 'Guardar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.close': 'Cerrar',
    'common.open': 'Abrir',
    'common.yes': 'Sí',
    'common.no': 'No',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.instructors': 'Instructors',
    'nav.store': 'Store',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.profile': 'Profile',

    // Hero Section
    'hero.title': 'Your Path to Holistic Wellness',
    'hero.subtitle': 'Discover the perfect balance between body, mind and spirit with NATIVO Holistic',
    'hero.cta': 'Start Your Journey',

    // Welcome Section
    'welcome.title': 'Welcome to NATIVO',
    'welcome.subtitle': 'Your Wellness Journey Starts Here',
    'welcome.description1': 'At NATIVO, we believe in a holistic approach to wellness that nourishes the body, mind and spirit. Our space is designed to be your sanctuary, where you can reconnect with your natural essence and discover a path to a more balanced and conscious life.',
    'welcome.description2': 'We invite you to be part of our community, where each person is valued in their individuality and supported in their journey toward integral wellness.',

    // Testimonials Section
    'testimonials.title': 'Testimonials',
    'testimonials.brenda.role': 'Wellness Program Participant',
    'testimonials.brenda.quote': 'I was respectfully guided toward achieving my goals. They make this program something very complete in all areas of life.',
    'testimonials.vilma.role': 'NATIVO Holistic Member',
    'testimonials.vilma.quote': 'I love that it is a very complete program. I am happy with the results I am seeing with my personalized program.',
    'testimonials.priscilla.role': 'Holistic Workshop Student',
    'testimonials.priscilla.quote': 'I really appreciated the tenacity and commitment from Juan Manuel because that helped me achieve my goals.',

    // Login Page
    'login.title': 'Welcome to NATIVO',
    'login.subtitle': 'Sign in to continue',
    'login.loading': 'Loading...',
    'login.error.session': 'Error verifying session',
    'login.error.registered': 'This email is already registered. Please sign in.',
    'login.error.credentials': 'Incorrect email or password. Please check your credentials and try again.',
    'login.error.confirm': 'Please confirm your email before signing in.',
    'login.error.requests': 'Too many attempts. Please wait a few minutes before trying again.',
    'login.session.closed': 'Session closed',
    'login.session.success': 'You have successfully logged out',
    'login.session.error': 'Could not log out',

    // Profile
    'profile.loading': 'Loading...',

    // Store
    'store.title': 'Our Store',
    'store.subtitle': 'Discover special products for your wellness',
    'store.view': 'View on Etsy',

    // Common
    'common.error': 'Error',
    'common.loading': 'Loading...',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.continue': 'Continue',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.yes': 'Yes',
    'common.no': 'No',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['es', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};