import React from 'react'
import { Toast } from 'react-bootstrap'


const Alert = ({ handleAlert, show, title = "Mensaje del sistema" , message }) => {

    return (
        <Toast autohide show={show} onClose={() => handleAlert(false)} delay={3000} style={{ position: 'fixed', bottom: 50, right: 20, width: 400 }}>
            <Toast.Header>
            
                <strong className="mr-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    )
}



export default Alert