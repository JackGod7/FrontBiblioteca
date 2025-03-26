export interface PrestamoDetalle {
    detalleId: number;
    copiaId: number;
    codigoBarras: string;
    estado: string;
  }
  
  export interface Prestamo {
    alquilerId: number;
    clienteId: number;
    nombreCliente: string;
    fechaInicio: string;
    fechaFin: string;
    fechaDevolucion: string | null;
    penalidad: number;
    detalles: PrestamoDetalle[];
  }
  