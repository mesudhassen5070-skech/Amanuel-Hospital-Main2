import {
  Stethoscope,
  Siren,
  Slice,
  ScanLine,
  FlaskConical,
  Baby,
  HeartPulse,
  Pill,
  Brain,
  Bone,
  Eye,
  Activity,
  Ear,
  type LucideIcon,
} from "lucide-react";

// Use public folder paths for doctor images
const doctor1 = "/doctor1.jpg";
const doctor2 = "/doctor2.jpg";
const doctor3 = "/doctor3.jpg";
const doctor4 = "/doctor4.jpg";
const doctor5 = "/doctor1.jpg";
const doctor6 = "/doctor2.jpg";
import galleryLab from "@/assets/machine.jpg";
import gallerySurgery from "@/assets/room.jpg";
import galleryPediatrics from "@/assets/baby.jpg";
import galleryRadiology from "@/assets/machine.jpg";
import galleryPharmacy from "@/assets/aman pharmacy.jpg";
import galleryWard from "@/assets/room.jpg";
import aboutLobby from "@/assets/bero.jpg";

export interface Service {
  id: string;
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    id: "emergency-services",
    title: "Emergency Services",
    description: "24-hour emergency medical services with rapid response and critical care capabilities.",
    detail:
      "Our emergency department operates 24/7 with trained emergency physicians, advanced life support equipment, and ambulance coordination for immediate medical attention. Emergency surgeries, deliveries, and critical care available round-the-clock.",
    icon: Siren,
  },
  {
    id: "medical-services",
    title: "Medical Services",
    description: "Comprehensive internal medicine and general practice for diagnosis and treatment.",
    detail:
      "Expert medical care including general consultations, chronic disease management, preventive health check-ups, and specialized diagnostic services.",
    icon: Stethoscope,
  },
  {
    id: "surgical-services",
    title: "Surgical Services",
    description: "24-hour surgical capabilities with modern operating theaters and experienced surgeons.",
    detail:
      "Advanced surgical procedures including general surgery, orthopedic operations, and emergency surgeries performed in state-of-the-art operating rooms. 24/7 emergency surgical services available round-the-clock.",
    icon: Slice,
  },
  {
    id: "pediatric-care",
    title: "Pediatric Care",
    description: "Specialized healthcare for infants, children, and adolescents with compassionate experts.",
    detail:
      "Complete pediatric services including well-child visits, immunizations, growth monitoring, and treatment of childhood illnesses in a child-friendly environment.",
    icon: Baby,
  },
  {
    id: "gynecology-obstetrics",
    title: "Gynecology & Obstetrics",
    description: "Women's health services including prenatal care, safe delivery, and gynecological treatment.",
    detail:
      "Comprehensive maternal and women's healthcare with antenatal clinics, delivery services, caesarean sections, family planning, and gynecological consultations. 24/7 emergency deliveries and critical maternal care available round-the-clock.",
    icon: HeartPulse,
  },
  {
    id: "ent-services",
    title: "ENT Services",
    description: "Specialized ear, nose, and throat procedures by experienced ENT specialists.",
    detail:
      "Comprehensive ENT care including tonsillectomy, adenoidectomy, sinus treatments, ear infections, hearing evaluations, and advanced diagnostic procedures for ear, nose, and throat conditions.",
    icon: Ear,
  },
  {
    id: "orthopedic-services",
    title: "Orthopedic Surgical Services",
    description: "24-hour orthopedic surgery and trauma care for bone, joint, and musculoskeletal injuries.",
    detail:
      "Comprehensive orthopedic surgical care including fracture repairs, joint surgeries, sports injuries, and trauma management. 24/7 emergency orthopedic surgical services available round-the-clock for urgent bone and joint injuries.",
    icon: Bone,
  },
];

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  availableToday: boolean;
  isOnline: boolean;
  photo: string;
}

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Amanuel Kassa",
    specialty: "Cardiologist",
    experience: 15,
    availableToday: true,
    isOnline: false,
    photo: "/doctor1.jpg",
  },
  {
    id: "2",
    name: "Dr. Tigist Haile",
    specialty: "Pediatrician",
    experience: 12,
    availableToday: true,
    isOnline: false,
    photo: "/doctor2.jpg",
  },
  {
    id: "3",
    name: "Dr. Bekele Gerba",
    specialty: "Orthopedic Surgeon",
    experience: 18,
    availableToday: false,
    isOnline: false,
    photo: "/doctor3.jpg",
  },
  {
    id: "4",
    name: "Dr. Selamawit Tadesse",
    specialty: "Neurologist",
    experience: 10,
    availableToday: true,
    isOnline: false,
    photo: "/doctor1.jpg",
  },
  {
    id: "5",
    name: "Dr. Kifle Demissie",
    specialty: "Dermatologist",
    experience: 8,
    availableToday: true,
    isOnline: false,
    photo: "/doctor2.jpg",
  },
  {
    id: "6",
    name: "Dr. Almaz Bekele",
    specialty: "Gynecologist",
    experience: 14,
    availableToday: false,
    isOnline: false,
    photo: "/doctor3.jpg",
  },
];

export interface Department {
  name: string;
  description: string;
  icon: LucideIcon;
}

export const departments: Department[] = [
  {
    name: "Internal Medicine",
    description: "Diagnosis and treatment of adult diseases, chronic condition management.",
    icon: Activity,
  },
  {
    name: "Surgery",
    description: "General and specialized surgical procedures in modern theaters. 24/7 emergency surgical services available.",
    icon: Slice,
  },
  {
    name: "Pediatrics",
    description: "Dedicated child healthcare from newborns to adolescents.",
    icon: Baby,
  },
  {
    name: "Obstetrics & Gynecology",
    description: "Women's health, antenatal care and safe delivery services. 24/7 emergency deliveries and maternal care available.",
    icon: HeartPulse,
  },
  {
    name: "Emergency Medicine",
    description: "24/7 rapid response emergency and trauma care available round-the-clock.",
    icon: Siren,
  },
  {
    name: "Radiology & Imaging",
    description: "X-ray, ultrasound and CT diagnostics with expert reading.",
    icon: ScanLine,
  },
  {
    name: "Neurology",
    description: "Care for disorders of the brain, spine and nervous system.",
    icon: Brain,
  },
  {
    name: "Orthopedics",
    description: "Bone, joint and musculoskeletal treatment and rehabilitation. 24/7 emergency orthopedic surgical services available.",
    icon: Bone,
  },
  {
    name: "ENT (Ear, Nose & Throat)",
    description: "Specialized ear, nose and throat procedures including tonsillectomy and advanced ENT care.",
    icon: Ear,
  },
  {
    name: "Ophthalmology",
    description: "Eye examinations, treatment and minor eye surgery.",
    icon: Eye,
  },
];

export interface Vacancy {
  title: string;
  type: string;
  department: string;
  requirements: string[];
}

export const vacancies: Vacancy[] = [
  {
    title: "General Practitioner",
    type: "Full-time",
    department: "Outpatient Department",
    requirements: [
      "Doctor of Medicine (MD) degree",
      "Valid professional license",
      "2+ years clinical experience",
      "Strong communication skills in Amharic, Afaan Oromo and English",
    ],
  },
  {
    title: "Registered Nurse",
    type: "Full-time",
    department: "Inpatient Ward",
    requirements: [
      "BSc in Nursing",
      "Valid nursing license",
      "1+ years hospital experience preferred",
      "Willingness to work rotating shifts",
    ],
  },
  {
    title: "Laboratory Technologist",
    type: "Full-time",
    department: "Laboratory",
    requirements: [
      "BSc in Medical Laboratory Science",
      "Experience with automated analyzers",
      "Attention to detail and quality control mindset",
    ],
  },
  {
    title: "Midwife",
    type: "Full-time",
    department: "Maternity",
    requirements: [
      "BSc in Midwifery",
      "Valid professional license",
      "Experience in labor & delivery care",
    ],
  },
  {
    title: "Pharmacist",
    type: "Part-time",
    department: "Pharmacy",
    requirements: [
      "BPharm degree with valid license",
      "Knowledge of pharmacy inventory systems",
      "Customer-focused attitude",
    ],
  },
  {
    title: "Receptionist / Cashier",
    type: "Full-time",
    department: "Administration",
    requirements: [
      "Diploma or degree in a related field",
      "Basic computer skills",
      "Fluency in Amharic, Afaan Oromo and English",
    ],
  },
];

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const galleryImages: GalleryImage[] = [
  { src: galleryLab, alt: "Hospital laboratory with modern microscopes", width: 900, height: 1200 },
  { src: gallerySurgery, alt: "Modern operating theater with surgical lights", width: 1200, height: 800 },
  { src: galleryPediatrics, alt: "Nurse caring for a child in the pediatric ward", width: 1200, height: 900 },
  { src: galleryRadiology, alt: "CT scanner in the radiology department", width: 900, height: 1100 },
  { src: galleryPharmacy, alt: "Hospital pharmacy with organized medicine shelves", width: 1200, height: 800 },
  { src: galleryWard, alt: "Bright modern patient room", width: 900, height: 1200 },
  { src: aboutLobby, alt: "Hospital reception lobby", width: 1200, height: 900 },
];

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Tigist A.",
    role: "Maternity patient",
    quote:
      "The maternity team made my delivery safe and comfortable. The midwives were with me every step of the way — I felt truly cared for.",
  },
  {
    name: "Getachew M.",
    role: "Surgery patient",
    quote:
      "From admission to discharge, everything was professional and clean. My operation went smoothly and the follow-up care was excellent.",
  },
  {
    name: "Hiwot K.",
    role: "Parent of pediatric patient",
    quote:
      "My daughter was treated so gently in the pediatric ward. The doctors explained everything clearly and she recovered quickly.",
  },
  {
    name: "Bekele T.",
    role: "Emergency patient",
    quote:
      "I arrived at midnight with severe pain and was seen within minutes. The 24/7 emergency service truly saved my life.",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "What are the hospital's working hours?",
    answer:
      "Our outpatient departments operate Monday to Saturday from 8:00 AM to 8:00 PM. The emergency department is open 24 hours a day, 7 days a week.",
  },
  {
    question: "Do I need an appointment to see a doctor?",
    answer:
      "Walk-ins are welcome for general consultations, but we recommend booking an appointment to reduce your waiting time, especially for specialist visits.",
  },
  {
    question: "Does the hospital accept health insurance?",
    answer:
      "We work with several insurance providers and employer health schemes. Please contact our reception with your insurance details to confirm coverage.",
  },
  {
    question: "Is there a 24/7 emergency service?",
    answer:
      "Yes. Our emergency department is staffed around the clock with emergency physicians, nurses and ambulance coordination.",
  },
  {
    question: "Can I get laboratory tests without a doctor's referral?",
    answer:
      "Selected routine tests are available on request. For specialized tests we recommend a consultation first so results can be properly interpreted.",
  },
  {
    question: "How do I get my medical records or test results?",
    answer:
      "Test results can be collected at the laboratory reception or sent to your doctor directly. Medical record requests are handled by our administration office.",
  },
];

export const stats = [
  { label: "Emergency Service", value: 24, suffix: "/7" },
  { label: "Experienced Doctors", value: 35, suffix: "+" },
  { label: "Modern Equipment Units", value: 120, suffix: "+" },
  { label: "Patients Served", value: 85000, suffix: "+" },
];

export const contactInfo = {
  phone: "0114303030 / 00",
  emergency: "0114303030 / 00",
  email: "dramanuelhospital@gmail.com",
  location: "Bishoftu (Debre Zeyit), Oromia, Ethiopia",
  hours: "Mon–Sat: 8:00 AM – 8:00 PM · Emergency: 24/7",
};
