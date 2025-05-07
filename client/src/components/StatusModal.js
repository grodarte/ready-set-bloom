import "./../styles/statusmodal.css"

function StatusModal({ setShowModal, onMarkStatus }) {

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h3 className="modal-heading">Mark items as...</h3>
                <div className="modal-buttons">
                    <button onClick={() => onMarkStatus('prepped')}>Prepped</button>
                    <button onClick={() => onMarkStatus('completed')}>Completed</button>
                    <button className="cancel" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default StatusModal