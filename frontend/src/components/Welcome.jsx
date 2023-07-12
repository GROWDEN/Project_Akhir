import React from "react";
import { useSelector } from "react-redux";
import wr from "../warehouse.jpg";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <section
        className="hero is-info is-fullheight"
        style={{ backgroundImage: `url(${wr})`, backgroundSize: "cover" }}
      >
        <div class="hero-body">
          <div class="">
            <p className="title">Product Data Storage</p>
            <p class="subtitle">
              Halo! <strong>{user && user.name}</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
