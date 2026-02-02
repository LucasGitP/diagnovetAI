export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  createdAt: string;
}

export interface UserRecord extends User {
  password: string;
  phone?: string;
  professionalTitle?: string;
  license?: string;
}

export interface SessionUser {
  id: string;
  email: string;
  username: string;
  fullName: string;
}

export type ProfessionalTitle = "Dr." | "Dra." | "M.V.";

export interface ClinicInfo {
  userId: string;
  legalName: string;
  address: string;
  phone: string;
  updatedAt: string;
}

export interface ReportRecord {
  id: string;
  userId: string;
  date: string;
  animalName: string;
  age: string;
  unit: string;
  species: string;
  breed: string;
  gender: string;
  referringProfessional: string;
  professionalEmail: string;
  guardian: string;
  guardianEmail: string;
  studyType: string;
  imageCount: number;
  status: "draft" | "active" | "completed";
  createdAt: string;
}
