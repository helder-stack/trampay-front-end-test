import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function SwallHandler(type, message){
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title: message,
        icon: type
    })
}