import Swal from 'sweetalert2';

export function successAlert(title: string, text: string) {
  Swal.fire({
    icon: 'success',
    title,
    text,
  });
}

export function errorAlert(title: string, text: string) {
  Swal.fire({
    icon: 'error',
    title,
    text,
  });
}

export function confirmationAlert(title: string, text: string, func: () => void) {
  Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, deletar!',
    cancelButtonText: 'Nope',
  }).then((result: any) => {
    if (result.isConfirmed) {
      func();
    }
  });
}
