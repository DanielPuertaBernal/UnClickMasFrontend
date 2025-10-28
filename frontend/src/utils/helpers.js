import Swal from "sweetalert2";

export function showSuccess(message) {
  Swal.fire({
    icon: "success",
    title: "Éxito",
    text: message,
    timer: 2000,
    showConfirmButton: false
  });
}

export function showError(message) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
}
