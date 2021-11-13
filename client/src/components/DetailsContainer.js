import React from "react";

function DetailsContainer({ vehicles }) {
  return (
    <div
      style={{
        overflow: "scroll",
        width: "100%",
        height: "50vh",
        marginTop: "30px",
        paddingLeft: "4rem",
        paddingRight: "4rem",
      }}>
      <table className="striped">
        <thead>
          <tr >
            <th>Car ID</th>
            <th>Car State</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((car) => (            
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.state}</td>
            </tr>            
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DetailsContainer;
