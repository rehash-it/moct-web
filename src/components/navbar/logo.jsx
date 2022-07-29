import logo from "../../images/ET-emblem.png";

export const Logo = ({ width }) => {
  return (
    <div>
      <img src={logo} alt="MOCT" style={{ width, height: "auto" }} />
    </div>
  );
};
