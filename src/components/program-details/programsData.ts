
import { useLanguage } from "@/contexts/LanguageContext";

export const usePrograms = () => {
  const { t } = useLanguage();
  
  return {
    "limpieza-indigena-ancestral": {
      title: "Limpieza Indígena Ancestral",
      description: "Purificación del cuerpo las emociones la mente y el alma",
      image: "/laptop-uploads/Detox.jpg",
      video: "https://player.vimeo.com/video/1091659998?h=26f8a831b8&badge=0&autopause=0&player_id=0&app_id=58479",
      details: {
        overview: "Una práctica ancestral de purificación que limpia no solo el cuerpo físico, sino también las emociones, la mente y el alma. Esta terapia utiliza técnicas tradicionales que han sido transmitidas por generaciones para restaurar el equilibrio energético y espiritual.",
        schedule: "Sesiones disponibles bajo cita previa | Duración: 2-3 horas",
        includes: [
          "Limpieza energética corporal",
          "Purificación emocional",
          "Equilibrio mental y espiritual",
          "Técnicas ancestrales tradicionales",
          "Seguimiento post-sesión"
        ]
      }
    },
    "armonizacion-proteccion": {
      title: "Armonización y Protección",
      description: "De casas, negocios y coches. Los espacios guardan memorias, limpiar las memorias de los lugares y sembrar energía armoniosa y abundante.",
      image: "/laptop-uploads/Casa_Nativa.jpg",
      video: "/laptop-uploads/Casa-Nativa.mp4",
      details: {
        overview: "Los espacios que habitamos y frecuentamos absorben energías y memorias. Esta terapia se enfoca en limpiar las memorias negativas de lugares como casas, negocios y vehículos, sembrando energía armoniosa y abundante para crear ambientes protegidos y prósperos.",
        schedule: "Visitas programadas | Duración variable según el espacio",
        includes: [
          "Limpieza energética de espacios",
          "Eliminación de memorias negativas",
          "Protección energética permanente",
          "Armonización del ambiente",
          "Activación de energía de abundancia"
        ]
      }
    },
    "conciencia-corporal": {
      title: "Conciencia Corporal y Recuperación Física",
      description: "Nuestro cuerpo habla y las memorias salen a la superficie, la terapia física hace fluir los conflictos represados",
      image: "/laptop-uploads/Bienestar.jpg",
      video: "/laptop-uploads/Bienestar.mp4",
      details: {
        overview: "El cuerpo almacena memorias y emociones que pueden manifestarse como tensiones y dolores. Esta terapia combina técnicas físicas con conciencia corporal para liberar conflictos represados y restaurar la armonía entre cuerpo, mente y espíritu.",
        schedule: "Sesiones semanales recomendadas | Duración: 60-90 minutos",
        includes: [
          "Evaluación de memorias corporales",
          "Terapia física especializada",
          "Técnicas de liberación emocional",
          "Ejercicios de conciencia corporal",
          "Plan de recuperación personalizado"
        ]
      }
    },
    "conexion-mascota": {
      title: "Conexión con tu Mascota",
      description: "Mediante la técnica de meditación guiada el vínculo con nuestro peludito se hace más profundo",
      image: "/laptop-uploads/Pets.webp",
      video: "https://player.vimeo.com/video/1091659773?h=8ff58471ab&badge=0&autopause=0&player_id=0&app_id=58479",
      details: {
        overview: "Las mascotas son seres sensibles que pueden beneficiarse enormemente de una conexión más profunda con sus compañeros humanos. A través de meditación guiada y técnicas energéticas, fortalecemos el vínculo entre tú y tu mascota, mejorando su bienestar mutuo.",
        schedule: "Sesiones familiares | Duración: 45-60 minutos",
        includes: [
          "Meditación guiada para conexión",
          "Técnicas de comunicación energética",
          "Fortalecimiento del vínculo",
          "Sanación energética para mascotas",
          "Ejercicios para practicar en casa"
        ]
      }
    }
  };
};

// Fallback static export for backward compatibility
export const programs = {
  "limpieza-indigena-ancestral": {
    title: "Limpieza Indígena Ancestral",
    description: "Purificación del cuerpo las emociones la mente y el alma",
    image: "/laptop-uploads/Detox.jpg",
    video: "https://player.vimeo.com/video/1091659998?h=26f8a831b8&badge=0&autopause=0&player_id=0&app_id=58479",
    details: {
      overview: "Una práctica ancestral de purificación que limpia no solo el cuerpo físico, sino también las emociones, la mente y el alma. Esta terapia utiliza técnicas tradicionales que han sido transmitidas por generaciones para restaurar el equilibrio energético y espiritual.",
      schedule: "Sesiones disponibles bajo cita previa | Duración: 2-3 horas",
      includes: [
        "Limpieza energética corporal",
        "Purificación emocional",
        "Equilibrio mental y espiritual",
        "Técnicas ancestrales tradicionales",
        "Seguimiento post-sesión"
      ]
    }
  },
  "armonizacion-proteccion": {
    title: "Armonización y Protección",
    description: "De casas, negocios y coches. Los espacios guardan memorias, limpiar las memorias de los lugares y sembrar energía armoniosa y abundante.",
    image: "/laptop-uploads/Casa_Nativa.jpg",
    video: "/laptop-uploads/Casa-Nativa.mp4",
    details: {
      overview: "Los espacios que habitamos y frecuentamos absorben energías y memorias. Esta terapia se enfoca en limpiar las memorias negativas de lugares como casas, negocios y vehículos, sembrando energía armoniosa y abundante para crear ambientes protegidos y prósperos.",
      schedule: "Visitas programadas | Duración variable según el espacio",
      includes: [
        "Limpieza energética de espacios",
        "Eliminación de memorias negativas",
        "Protección energética permanente",
        "Armonización del ambiente",
        "Activación de energía de abundancia"
      ]
    }
  },
  "conciencia-corporal": {
    title: "Conciencia Corporal y Recuperación Física",
    description: "Nuestro cuerpo habla y las memorias salen a la superficie, la terapia física hace fluir los conflictos represados",
    image: "/laptop-uploads/Bienestar.jpg",
    video: "/laptop-uploads/Bienestar.mp4",
    details: {
      overview: "El cuerpo almacena memorias y emociones que pueden manifestarse como tensiones y dolores. Esta terapia combina técnicas físicas con conciencia corporal para liberar conflictos represados y restaurar la armonía entre cuerpo, mente y espíritu.",
      schedule: "Sesiones semanales recomendadas | Duración: 60-90 minutos",
      includes: [
        "Evaluación de memorias corporales",
        "Terapia física especializada",
        "Técnicas de liberación emocional",
        "Ejercicios de conciencia corporal",
        "Plan de recuperación personalizado"
      ]
    }
  },
  "conexion-mascota": {
    title: "Conexión con tu Mascota",
    description: "Mediante la técnica de meditación guiada el vínculo con nuestro peludito se hace más profundo",
    image: "/laptop-uploads/Pets.webp",
    video: "https://player.vimeo.com/video/1091659773?h=8ff58471ab&badge=0&autopause=0&player_id=0&app_id=58479",
    details: {
      overview: "Las mascotas son seres sensibles que pueden beneficiarse enormemente de una conexión más profunda con sus compañeros humanos. A través de meditación guiada y técnicas energéticas, fortalecemos el vínculo entre tú y tu mascota, mejorando su bienestar mutuo.",
      schedule: "Sesiones familiares | Duración: 45-60 minutos",
      includes: [
        "Meditación guiada para conexión",
        "Técnicas de comunicación energética",
        "Fortalecimiento del vínculo",
        "Sanación energética para mascotas",
        "Ejercicios para practicar en casa"
      ]
    }
  }
};
