export interface Loan {
    id?: number;
    books: number[]; // array of book IDs
    deliveryAddress: string;
    paymentMethod: string;
    requestDate?: string;
    status?: 'Pending' | 'Approved' | 'Rejected';
  }

  export interface PrestamoRequest {
    clienteId: number; // ID del cliente que solicita el préstamo
    copias: number[]; // Array de IDs de las copias de libros que se solicitan
  }
  
  export interface PrestamoResponse {
    reservaId: number;  // ID único para la reserva realizada
    fechaReserva: string; // Fecha en la que se realizó la reserva
    estado: string; // Estado del préstamo, e.g., "confirmado", "pendiente", "rechazado"
    mensaje: string; // Mensaje adicional, por ejemplo, detalles del error o confirmación
  }