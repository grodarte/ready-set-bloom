import "./../styles/statusmodal.css"

function StatusModal({ setShowStatusModal, onMarkStatus }) {

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h3 className="modal-heading">{`Mark item(s) as...`}</h3>
                <div className="modal-buttons">
                    <button onClick={() => onMarkStatus('prepped')}>Prepped</button>
                    <button onClick={() => onMarkStatus('completed')}>Completed</button>
                    <button className="cancel" onClick={() => setShowStatusModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default StatusModal