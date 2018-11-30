export interface IPatient {
    id?: string;
    name: string;
    surname: string;
    diagnose: string;
    serviceTime: number;
    peselNumber: string;
    doctor: string;
    priority?: number;
}
