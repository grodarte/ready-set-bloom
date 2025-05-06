import "../styles/statusfilter.css"

const labelMap = {
    all: "All",
    active: "Active",
    this_week: "This Week",
    completed: "Completed"
}

function StatusFilter({ currentFilter, setFilter }) {
    const options = Object.keys(labelMap)

    return (
        <div className="filter-bar">
            {options.map(option => (
                <button
                    key={option}
                    className={currentFilter === option ? "active" : ""}
                    onClick={() => setFilter(option)}
                >
                    {labelMap[option]}
                </button>
            ))}
        </div>
    )
}

export default StatusFilter