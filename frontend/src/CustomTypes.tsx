type EmailList = {
    email: string,
    id: string,
    role: string,
    lastname:string,
    firstname: string
};

type Task = {
    id: number;
    title: string;
    description: string;
    students: string[]; 
    dueDate: string; 
    isCompleted: boolean;
}

export type {EmailList, Task};