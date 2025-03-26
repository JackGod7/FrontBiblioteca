export interface Loan {
    id?: number;
    books: number[]; // array of book IDs
    deliveryAddress: string;
    paymentMethod: string;
    requestDate?: string;
    status?: 'Pending' | 'Approved' | 'Rejected';
  }

  export interface PrestamoRequest {
    clienteId: number; 
    copias: number[]; 
  }
  
  export interface PrestamoResponse {
    reservaId: number;  
    fechaReserva: string; 
    estado: string; 
    mensaje: string; 
  }