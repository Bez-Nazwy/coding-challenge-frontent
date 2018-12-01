export interface IPatient {
    id?: string;
    name: string;
    surname: string;
    diagnose: string;
    peselNumber: string;
    doctor: string;
    serviceTime: number;
    priority?: number;
    patientNumber?: number;
}
