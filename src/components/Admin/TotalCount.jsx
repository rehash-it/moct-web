function TotalCount({ count, text = 'registered'}) {
  return (
    <div className="card border border-primary py-2 d-flex align-items-center">
      <h2 className="text-center">
        Total {text}
        <span className="text-primary rounded block mt-1 bg-primary px-2 mx-2 text-white">
          {count}
        </span>
      </h2>
    </div>
  );
}

export default TotalCount;
