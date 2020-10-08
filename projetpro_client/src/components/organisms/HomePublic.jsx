import React from "react";
import ButtonMenu from "../atoms/ButtonMenu";

export const HomePublic = () => {

  return (
    <div className="homePublic">
      <ButtonMenu
        className="homePublic-connexion"
        buttonType="connexion"
        name="Connexion"
      />
      <div className="homePublic-presentation">
        <h3 className="homePublic-presentation-title">Présentation</h3>
        <p className="homePublic-presentation-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam
          velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate
          commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed
          eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam
          nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet
          quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu
          diam.
        </p>
      </div>
      <div className="homePublic-buttons">
        <ButtonMenu buttonType="carré" name="Contact" />
        <ButtonMenu buttonType="carré" name="Inscription" />
      </div>
    </div>
  );
};
