
import { useLanguage } from "@/contexts/LanguageContext";

export const usePrograms = () => {
  const { t } = useLanguage();
  
  return {
    "limpieza-indigena-ancestral": {
      title: "Limpieza Indígena Ancestral",
      description: "Purificación integral del cuerpo, las emociones, la mente y el alma a través de técnicas milenarias. Esta práctica ancestral utiliza métodos tradicionales transmitidos por generaciones para restaurar el equilibrio energético, liberar bloqueos emocionales y purificar el ser en su totalidad. Una experiencia transformadora que conecta con la sabiduría indígena para alcanzar un estado de armonía y renovación profunda.",
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
      description: "Especializado en la limpieza energética de casas, negocios y coches. Los espacios que habitamos absorben y guardan memorias energéticas que pueden afectar nuestro bienestar. Este servicio profesional se enfoca en limpiar las memorias negativas acumuladas en los lugares, neutralizar energías densas y sembrar una nueva vibración armoniosa y abundante que promueva la prosperidad, protección y bienestar de quienes los habitan.",
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
      description: "Terapia especializada donde nuestro cuerpo habla y las memorias emocionales emergen a la superficie. Esta práctica terapéutica facilita que los conflictos y tensiones represadas fluyan naturalmente, combinando técnicas físicas avanzadas con desarrollo de la conciencia corporal para lograr una sanación integral que restaure el equilibrio entre cuerpo, mente y espíritu, promoviendo una recuperación profunda y duradera.",
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
      description: "Mediante la técnica de meditación guiada especializada, el vínculo profundo con nuestro querido compañero peludo se fortalece significativamente. Esta práctica única utiliza métodos energéticos y de comunicación intuitiva para crear una conexión más consciente y armoniosa entre humanos y mascotas, mejorando el bienestar emocional y espiritual de ambos, y facilitando una comprensión mutua más profunda que enriquece la relación.",
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
    description: "Purificación integral del cuerpo, las emociones, la mente y el alma a través de técnicas milenarias. Esta práctica ancestral utiliza métodos tradicionales transmitidos por generaciones para restaurar el equilibrio energético, liberar bloqueos emocionales y purificar el ser en su totalidad. Una experiencia transformadora que conecta con la sabiduría indígena para alcanzar un estado de armonía y renovación profunda.",
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
    description: "Especializado en la limpieza energética de casas, negocios y coches. Los espacios que habitamos absorben y guardan memorias energéticas que pueden afectar nuestro bienestar. Este servicio profesional se enfoca en limpiar las memorias negativas acumuladas en los lugares, neutralizar energías densas y sembrar una nueva vibración armoniosa y abundante que promueva la prosperidad, protección y bienestar de quienes los habitan.",
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
    description: "Terapia especializada donde nuestro cuerpo habla y las memorias emocionales emergen a la superficie. Esta práctica terapéutica facilita que los conflictos y tensiones represadas fluyan naturalmente, combinando técnicas físicas avanzadas con desarrollo de la conciencia corporal para lograr una sanación integral que restaure el equilibrio entre cuerpo, mente y espíritu, promoviendo una recuperación profunda y duradera.",
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
    description: "Mediante la técnica de meditación guiada especializada, el vínculo profundo con nuestro querido compañero peludo se fortalece significativamente. Esta práctica única utiliza métodos energéticos y de comunicación intuitiva para crear una conexión más consciente y armoniosa entre humanos y mascotas, mejorando el bienestar emocional y espiritual de ambos, y facilitando una comprensión mutua más profunda que enriquece la relación.",
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
