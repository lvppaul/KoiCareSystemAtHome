import { confirmAlert } from 'react-confirm-alert'; // Import
import './confirm-alert.css'; // Import css
import 'react-confirm-alert/src/react-confirm-alert.css'

export function showConfirmAlert(title, message) {
    return new Promise((option) => {
        confirmAlert({
            title: title,
            message: message,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => option(true)
                },
                {
                    label: 'No',
                    onClick: () => option(false)
                }
            ]
        });
    })
}