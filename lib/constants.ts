export const SESSION_COOKIE = "diagnovet_session";

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  analyze: "/analyze",
  studies: "/studies",
  studyDetail: (id: string) => `/studies/${id}`,
  settings: "/settings",
  onboarding: {
    almostDone: "/onboarding/almost-done",
    clinic: "/onboarding/clinic",
  },
} as const;

export type Locale = "es" | "en";

/** Copy structure for i18n */
export type CopyType = {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    myStudies: string;
    newReport: string;
    settings: string;
    logout: string;
    personal: string;
    veterinary: string;
  };
  studies: {
    patient: string;
    tutor: string;
    studyType: string;
    status: string;
    date: string;
    actions: string;
    draft: string;
    inProgress: string;
    active: string;
    completed: string;
    continue: string;
    download: string;
    deleteStudy: string;
    deleteConfirmTitle: string;
    deleteConfirmMessage: string;
    cancel: string;
    delete: string;
    changeStatus: string;
    showing: (from: number, to: number, total: number) => string;
    previous: string;
    next: string;
    saving: string;
  };
  statusLabels: { draft: string; active: string; completed: string };
  settings: {
    title: string;
    personal: string;
    veterinary: string;
    profileOverview: string;
    profileDescription: string;
    contactInfo: string;
    memberSince: string;
    email: string;
    phone: string;
    fullName: string;
    professionalTitle: string;
    license: string;
    clinicDataTitle: string;
    clinicDataDescription: string;
    pageDescription: string;
  };
  dashboard: {
    successMessage: string;
    totalReports: string;
    totalPatients: string;
    activeReports: string;
    searchPlaceholder: string;
    createNewReport: string;
    noReports: string;
    noReportsDescription: string;
    createFirstReport: string;
  };
  emptyStudies: {
    title: string;
    description: string;
    actionLabel: string;
  };
  speciesLabels: Record<string, string>;
  studyTypeLabels: Record<string, string>;
  studyDetail: {
    backToStudies: string;
    reportLabel: string;
    species: string;
    breed: string;
    age: string;
    gender: string;
    tutor: string;
    studyType: string;
    referringProfessional: string;
    images: string;
  };
  auth: {
    loginTitle: string;
    emailOrUsername: string;
    password: string;
    continueButton: string;
    noAccount: string;
    registerLink: string;
    registerTitle: string;
    registerSubtitle: string;
    fullName: string;
    email: string;
    username: string;
    passwordLabel: string;
    createAccount: string;
    haveAccount: string;
    loginLink: string;
    loginError: string;
    connectionError: string;
    registerError: string;
  };
  analyze: {
    pageTitle: string;
    patientSection: string;
    date: string;
    animalName: string;
    age: string;
    unit: string;
    species: string;
    breed: string;
    gender: string;
    referrerSection: string;
    referringProfessional: string;
    professionalEmail: string;
    guardian: string;
    guardianPlaceholder: string;
    guardianEmail: string;
    studySection: string;
    studyType: string;
    createAsDraft: string;
    clear: string;
    saveButton: string;
    createError: string;
    connectionError: string;
  };
  onboarding: {
    almostDone: {
      title: string;
      subtitle: string;
      phone: string;
      professionalTitle: string;
      fullName: string;
      license: string;
      saveButton: string;
      saving: string;
      skipForNow: string;
      whyTitle: string;
      bullet1: string;
      bullet2: string;
      bullet3: string;
    };
    clinic: {
      title: string;
      subtitle: string;
      legalName: string;
      address: string;
      phone: string;
      saveButton: string;
      saving: string;
      skipForNow: string;
      whyTitle: string;
      bullet1: string;
      bullet2: string;
      bullet3: string;
    };
  };
};

export const COPY_ES: CopyType = {
  metadata: {
    title: "DiagnovetAI – Inicia sesión",
    description:
      "Plataforma de diagnóstico veterinario con IA. Inicia sesión en DiagnovetAI.",
  },
  nav: {
    myStudies: "Mis Estudios",
    newReport: "Nuevo Reporte",
    settings: "Configuración",
    logout: "Cerrar Sesión",
    personal: "Personal",
    veterinary: "Veterinaria",
  },
  studies: {
    patient: "Paciente",
    tutor: "Tutor",
    studyType: "Tipo de estudio",
    status: "Estado",
    date: "Fecha",
    actions: "Acciones",
    draft: "Borrador",
    inProgress: "En progreso",
    active: "Activo",
    completed: "Completado",
    continue: "Continuar",
    download: "Descargar",
    deleteStudy: "Eliminar estudio",
    deleteConfirmTitle: "¿Eliminar este estudio?",
    deleteConfirmMessage:
      "Se borrará el estudio y todos los datos asociados. Esta acción no se puede deshacer.",
    cancel: "Cancelar",
    delete: "Eliminar",
    changeStatus: "Cambiar estado",
    showing: (from, to, total) =>
      `Mostrando ${from}-${to} de ${total} informes`,
    previous: "Anterior",
    next: "Siguiente",
    saving: "Guardando...",
  },
  statusLabels: {
    draft: "Borrador",
    active: "Activo",
    completed: "Completado",
  },
  settings: {
    title: "Configuración",
    personal: "Configuración personal",
    veterinary: "Datos veterinarios",
    profileOverview: "Resumen del perfil",
    profileDescription: "Tu información básica y detalles de la cuenta.",
    contactInfo: "Información de contacto",
    memberSince: "Miembro desde",
    email: "Email",
    phone: "Teléfono",
    fullName: "Nombre",
    professionalTitle: "Título profesional",
    license: "Matrícula / Licencia",
    clinicDataTitle: "Datos de la clínica veterinaria",
    clinicDataDescription:
      "Completa o actualiza los datos de tu clínica para aparecer en informes y comunicaciones.",
    pageDescription: "Gestiona tu información personal y datos de la clínica.",
  },
  dashboard: {
    successMessage:
      "Información guardada correctamente. Tu reporte fue creado.",
    totalReports: "Total reportes",
    totalPatients: "Total pacientes",
    activeReports: "Reportes activos",
    searchPlaceholder: "Buscar pacientes, tutores, derivantes...",
    createNewReport: "Crear nuevo reporte",
    noReports: "No hay reportes",
    noReportsDescription:
      "Crea tu primer reporte para comenzar y ahorrar tiempo en diagnósticos.",
    createFirstReport: "Crear primer reporte",
  },
  emptyStudies: {
    title: "No hay estudios aún",
    description: "Crea tu primer reporte para comenzar.",
    actionLabel: "Crear primer reporte",
  },
  speciesLabels: {
    Canine: "Canino",
    Feline: "Felino",
    Equine: "Equino",
    Bovine: "Bovino",
    Other: "Otro",
  },
  studyTypeLabels: {
    Ultrasound: "Ecografía",
    Radiography: "Radiografía",
    MRI: "Resonancia",
    CT: "Tomografía",
    Other: "Otro",
  },
  studyDetail: {
    backToStudies: "Volver a Mis Estudios",
    reportLabel: "Reporte",
    species: "Especie",
    breed: "Raza",
    age: "Edad",
    gender: "Género",
    tutor: "Tutor",
    studyType: "Tipo de estudio",
    referringProfessional: "Profesional referente",
    images: "Imágenes",
  },
  auth: {
    loginTitle: "Inicia sesión en DiagnovetAI",
    emailOrUsername: "Email o nombre de usuario",
    password: "Contraseña",
    continueButton: "Continuar",
    noAccount: "¿No tienes cuenta?",
    registerLink: "Regístrate en DiagnovetAI",
    registerTitle: "Regístrate en DiagnovetAI",
    registerSubtitle: "Crea tu cuenta para empezar a usar la plataforma.",
    fullName: "Nombre completo *",
    email: "Email *",
    username: "Nombre de usuario *",
    passwordLabel: "Contraseña * (mín. 6 caracteres)",
    createAccount: "Crear cuenta",
    haveAccount: "¿Ya tienes cuenta?",
    loginLink: "Inicia sesión",
    loginError: "Error al iniciar sesión.",
    connectionError: "Error de conexión. Intenta de nuevo.",
    registerError: "Error al crear la cuenta.",
  },
  analyze: {
    pageTitle: "Analizar paciente",
    patientSection: "Paciente",
    date: "Fecha *",
    animalName: "Nombre del animal *",
    age: "Edad *",
    unit: "Unidad *",
    species: "Especie *",
    breed: "Raza",
    gender: "Género *",
    referrerSection: "Referente y tutor",
    referringProfessional: "Profesional referente",
    professionalEmail: "Email del profesional",
    guardian: "Tutor *",
    guardianPlaceholder: "Nombre del tutor",
    guardianEmail: "Email del tutor",
    studySection: "Estudio",
    studyType: "Tipo de estudio *",
    createAsDraft: "Crear como borrador (podrás cambiar el estado después)",
    clear: "Limpiar",
    saveButton: "Continuar",
    createError: "Error al crear el reporte.",
    connectionError: "Error de conexión. Intenta de nuevo.",
  },
  onboarding: {
    almostDone: {
      title: "Casi listo",
      subtitle: "Necesitamos un par de datos más para mejorar tu experiencia:",
      phone: "Teléfono *",
      professionalTitle: "Título profesional *",
      fullName: "Nombre completo *",
      license: "Matrícula / Licencia (opcional)",
      saveButton: "Continuar",
      saving: "Guardando...",
      skipForNow: "Omitir por ahora",
      whyTitle: "¿Por qué pedimos esta información?",
      bullet1: "Personaliza tu perfil profesional",
      bullet2: "Muestra tus credenciales a los clientes",
      bullet3: "Genera reportes con tu información",
    },
    clinic: {
      title: "Datos de la clínica",
      subtitle: "Completa los datos de tu clínica veterinaria para continuar.",
      legalName: "Razón social de la clínica *",
      address: "Dirección *",
      phone: "Teléfono *",
      saveButton: "Guardar datos",
      saving: "Guardando...",
      skipForNow: "Omitir por ahora",
      whyTitle: "¿Por qué pedimos esta información?",
      bullet1: "Identifica tu clínica en el sistema",
      bullet2: "Facilita la comunicación con clientes",
      bullet3: "Cumple requisitos legales",
    },
  },
};

export const COPY_EN: CopyType = {
  metadata: {
    title: "DiagnovetAI – Sign in",
    description:
      "Veterinary diagnosis platform with AI. Sign in to DiagnovetAI.",
  },
  nav: {
    myStudies: "My Studies",
    newReport: "New Report",
    settings: "Settings",
    logout: "Log Out",
    personal: "Personal",
    veterinary: "Veterinary",
  },
  studies: {
    patient: "Patient",
    tutor: "Tutor",
    studyType: "Study type",
    status: "Status",
    date: "Date",
    actions: "Actions",
    draft: "Draft",
    inProgress: "In progress",
    active: "Active",
    completed: "Completed",
    continue: "Continue",
    download: "Download",
    deleteStudy: "Delete study",
    deleteConfirmTitle: "Delete this study?",
    deleteConfirmMessage:
      "The study and all associated data will be permanently deleted. This action cannot be undone.",
    cancel: "Cancel",
    delete: "Delete",
    changeStatus: "Change status",
    showing: (from, to, total) => `Showing ${from}-${to} of ${total} reports`,
    previous: "Previous",
    next: "Next",
    saving: "Saving...",
  },
  statusLabels: { draft: "Draft", active: "Active", completed: "Completed" },
  settings: {
    title: "Settings",
    personal: "Personal settings",
    veterinary: "Veterinary data",
    profileOverview: "Profile overview",
    profileDescription: "Your basic information and account details.",
    contactInfo: "Contact information",
    memberSince: "Member since",
    email: "Email",
    phone: "Phone",
    fullName: "Name",
    professionalTitle: "Professional title",
    license: "License / Registration",
    clinicDataTitle: "Veterinary clinic data",
    clinicDataDescription:
      "Complete or update your clinic details for reports and communications.",
    pageDescription: "Manage your personal information and clinic data.",
  },
  dashboard: {
    successMessage: "Report saved successfully.",
    totalReports: "Total reports",
    totalPatients: "Total patients",
    activeReports: "Active reports",
    searchPlaceholder: "Search patients, guardians, referrers...",
    createNewReport: "Create new report",
    noReports: "No reports",
    noReportsDescription:
      "Create your first report to get started and save time on diagnostics.",
    createFirstReport: "Create first report",
  },
  emptyStudies: {
    title: "No studies yet",
    description: "Create your first report to get started.",
    actionLabel: "Create first report",
  },
  speciesLabels: {
    Canine: "Canine",
    Feline: "Feline",
    Equine: "Equine",
    Bovine: "Bovine",
    Other: "Other",
  },
  studyTypeLabels: {
    Ultrasound: "Ultrasound",
    Radiography: "Radiography",
    MRI: "MRI",
    CT: "CT",
    Other: "Other",
  },
  studyDetail: {
    backToStudies: "Back to My Studies",
    reportLabel: "Report",
    species: "Species",
    breed: "Breed",
    age: "Age",
    gender: "Gender",
    tutor: "Tutor",
    studyType: "Study type",
    referringProfessional: "Referring professional",
    images: "Images",
  },
  auth: {
    loginTitle: "Sign in to DiagnovetAI",
    emailOrUsername: "Email or username",
    password: "Password",
    continueButton: "Continue",
    noAccount: "Don't have an account?",
    registerLink: "Sign up for DiagnovetAI",
    registerTitle: "Sign up for DiagnovetAI",
    registerSubtitle: "Create your account to get started.",
    fullName: "Full name *",
    email: "Email *",
    username: "Username *",
    passwordLabel: "Password * (min. 6 characters)",
    createAccount: "Create account",
    haveAccount: "Already have an account?",
    loginLink: "Sign in",
    loginError: "Error signing in.",
    connectionError: "Connection error. Please try again.",
    registerError: "Error creating account.",
  },
  analyze: {
    pageTitle: "Analyze patient",
    patientSection: "Patient",
    date: "Date *",
    animalName: "Animal name *",
    age: "Age *",
    unit: "Unit *",
    species: "Species *",
    breed: "Breed",
    gender: "Gender *",
    referrerSection: "Referrer & Guardian",
    referringProfessional: "Referring professional",
    professionalEmail: "Professional's email",
    guardian: "Guardian *",
    guardianPlaceholder: "Owner name",
    guardianEmail: "Guardian's email",
    studySection: "Study",
    studyType: "Study type *",
    createAsDraft: "Create as draft (you can change status later)",
    clear: "Clear",
    saveButton: "Continue",
    createError: "Error creating report.",
    connectionError: "Connection error. Please try again.",
  },
  onboarding: {
    almostDone: {
      title: "Almost done",
      subtitle: "We need a couple more details to improve your experience:",
      phone: "Phone *",
      professionalTitle: "Professional title *",
      fullName: "Full name *",
      license: "Professional license (optional)",
      saveButton: "Continue",
      saving: "Saving...",
      skipForNow: "Skip for now",
      whyTitle: "Why do we need this information?",
      bullet1: "Personalize your professional profile",
      bullet2: "Show your credentials to clients",
      bullet3: "Generate reports with your information",
    },
    clinic: {
      title: "Veterinary Information",
      subtitle: "Complete your veterinary clinic data to continue.",
      legalName: "Legal name of the veterinary clinic *",
      address: "Address *",
      phone: "Phone number *",
      saveButton: "Save data",
      saving: "Saving...",
      skipForNow: "Skip for now",
      whyTitle: "Why do we need this information?",
      bullet1: "Identify your clinic in the system",
      bullet2: "Facilitate communication with clients",
      bullet3: "Comply with legal requirements",
    },
  },
};

export function getCopy(locale: Locale): CopyType {
  return locale === "en" ? COPY_EN : COPY_ES;
}

/** Default copy (Spanish) for backward compatibility */
export const COPY = COPY_ES;

/** Especies en español para mostrar en listados */
export const SPECIES_LABEL_ES: Record<string, string> = {
  Canine: "Canino",
  Feline: "Felino",
  Equine: "Equino",
  Bovine: "Bovino",
  Other: "Otro",
};

/** Tipos de estudio en español */
export const STUDY_TYPE_LABEL_ES: Record<string, string> = {
  Ultrasound: "Ecografía",
  Radiography: "Radiografía",
  MRI: "Resonancia",
  CT: "Tomografía",
  Other: "Otro",
};

export const STUDY_TYPE_LABEL_EN: Record<string, string> = {
  Ultrasound: "Ultrasound",
  Radiography: "Radiography",
  MRI: "MRI",
  CT: "CT",
  Other: "Other",
};

export const PROFESSIONAL_TITLES = ["Dr.", "Dra.", "M.V."] as const;

export const SPECIES_OPTIONS = [
  "Canine",
  "Feline",
  "Equine",
  "Bovine",
  "Other",
];

export const GENDER_OPTIONS = ["Male", "Female", "Unknown"];

export const AGE_UNITS = ["Year(s)", "Month(s)", "Week(s)"];

export const STUDY_TYPES = ["Ultrasound", "Radiography", "MRI", "CT", "Other"];
