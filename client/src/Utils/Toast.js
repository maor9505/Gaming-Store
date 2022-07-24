import { toast } from 'react-toastify';

toast.configure();
  export  const ToastAlert = (messege) => {
        toast.info(messege, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
    }