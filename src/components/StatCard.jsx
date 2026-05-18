function StatCard({ title, value, change, type, icon }) {
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-top">
        <div>
          <h4>{title}</h4>
          <h2>{value}</h2>
        </div>
        <div className="stat-icon">{icon}</div>
      </div>
      <p>{change}</p>
    </div>
  );
}

export default StatCard;     