import React, { useState, useEffect, useContext } from "react";
import {
  HiPhone,
  HiMail,
  HiLocationMarker,
  HiBriefcase,
  HiBadgeCheck,
  HiLightBulb,
  HiGlobeAlt,
} from "react-icons/hi";

import ProgressBar from "../ProgressBar/ProgressBar";

import ZoomControl from "../ZoomControl/ZoomControl";
import DataContext from "../../context/DataContext";

import "./style.css";

function Default() {
  const [scale, setSCale] = useState(1);
  const [zoomState, setZoomState] = useState("in");
  const {
    tref,
    fullname,
    jobtype,
    imageTemp,
    phonenumber,
    email,
    phoneType,
    address,
    jobStore,
    eduStore,
    hobbies,
    quotes,
    skillStore,
    pskillStore,
    socials,
  } = useContext(DataContext);

  useEffect(() => {
    let temp = document.querySelector(".template-view");
    if (zoomState === "in") {
      temp.style.transform = `scale(${scale})`;
    } else {
      temp.style.transform = `scale(${scale})`;
    }
  }, [scale]);

  function capitalizeFullname(text) {
    if (fullname !== "") {
      let fN = text.split(" ");

      let fName = fN[0].charAt(0).toUpperCase() + fN[0].slice(1);
      let lName =
        fN[1] !== undefined
          ? fN[1].charAt(0).toUpperCase() + fN[1].slice(1)
          : "";
      return { fName, lName };
    }
  }

  return (
    <>
      <div className="template-view mt-5" ref={tref} data-template-view>
        <div className="left-cont">
          {/* info */}
          <div className="top">
            <img
              src={
                imageTemp === ""
                  ? "https://th.bing.com/th/id/OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa?pid=ImgDet&rs=1"
                  : imageTemp
              }
              alt=""
              className="img-fluid"
            />
            <div className="info-cont">
              <div className="t">
                <h5 className="name">
                  {fullname === ""
                    ? "Seu Nome"
                    : `${capitalizeFullname(fullname).fName}  
                    ${capitalizeFullname(fullname).lName}`}
                </h5>
                <span className="job-type">
                  {jobtype === "" ? "Seu Cargo" : jobtype}
                </span>
              </div>
              <div className="b">
                <ul className="list">
                  <li>
                    <HiPhone className="icon" style={iconsStyle.Sicon} />
                    <span className="phone">
                      {phonenumber === "" || phoneType === ""
                        ? "+55 - (19)9999-9999"
                        : `${phoneType} - ${phonenumber}`}
                    </span>
                  </li>
                  <li>
                    <HiMail className="icon" style={iconsStyle.Sicon} />
                    <span className="mail">
                      {email === "" ? "example@example.com" : email}
                    </span>
                  </li>
                  <li>
                    <HiLocationMarker
                      className="icon"
                      style={iconsStyle.Sicon}
                    />
                    <span className="location">
                      {address === ""
                        ? "S??o Paulo, SP, 639"
                        : address}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* work exp */}
          <div className="work-exp">
            <div className="head">
              <HiBriefcase className="icon" style={iconsStyle.Licon} />
              <span className="work-exp">Experi??ncia profissional</span>
            </div>
            {jobStore !== undefined && jobStore.length > 0 ? (
              jobStore.map((list, i) => {
                return (
                  <div className="cards-container" key={i}>
                    {/* <div className="work-cards"> */}
                    <div className="l">
                      <span className="year">{list.year}</span>
                      <HiBadgeCheck className="icon" style={iconsStyle.Licon} />
                    </div>
                    <div className="r">
                      <div className="t">
                        <h5>{list.title}</h5>
                        <span className="location">{list.location}</span>
                      </div>
                      <br />
                      <div className="b mounted">
                        <span>{list.experience.replace('"', "")}</span>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                );
              })
            ) : (
              <div className="cards-container">
                <div className="l">
                  <span className="year">2023</span>
                  <HiBadgeCheck className="icon" style={iconsStyle.Licon} />
                </div>
                <div className="r">
                  <div className="t">
                    <h5>Nome da Empresa</h5>
                    <span className="location">Localiza????o da Empresa</span>
                  </div>
                  <br />
                  <div className="b">
                    <span>
                      Sua experi??ncia do que foi realizado no tempo em que estava na empresa.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* education */}
          <div className="education-exp">
            <div className="head">
              <HiBriefcase className="icon" style={iconsStyle.Licon} />
              <span className="education-exp">Educa????o</span>
            </div>
            {eduStore !== undefined && eduStore.length > 0 ? (
              eduStore.map((list, i) => {
                return (
                  <div className="cards-container" key={i}>
                    <div className="l">
                      <span className="year">{list.year}</span>
                      <HiBadgeCheck className="icon" style={iconsStyle.Licon} />
                    </div>
                    <div className="r">
                      <div className="t">
                        <h5>{list.title}</h5>
                      </div>
                      <div className="b">
                        <span>{list.experience}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="cards-container">
                <div className="l">
                  <span className="year">2023</span>
                  <HiBadgeCheck className="icon" style={iconsStyle.Licon} />
                </div>
                <div className="r">
                  <div className="t">
                    <h5>Nome da Institui????o e o curso</h5>
                  </div>
                  <br />
                  <div className="b">
                    <span>
                       Quais habilidades foram desenvolvida diante do ensino em que estava.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Hobbies */}
          <div className="hobbies">
            <div className="head">
              <HiBriefcase className="icon" style={iconsStyle.Licon} />
              <span className="hobbies-exp">Hobbies & interesses</span>
            </div>
            <div className="body">
              {hobbies === "" ? (
                <span>
                  Seus hobbies e interesses.
                </span>
              ) : (
                <div className="mounted">
                  <span>{hobbies}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="right-cont">
          <div className="cont">
            {/* quotes */}
            <div className="quotes-cont box">
              <HiLightBulb className="icon" style={iconsStyle.Licon} />
              <br />
              <div className="body">
                {quotes === "" ? (
                  <>
                    Escolha uma frase motivacional para seu curr??culo.
                  </>
                ) : (
                  quotes
                )}
              </div>
            </div>
            {/* pro-skills */}
            <div className="pro-skills-cont box">
              <h4>Habilidades Profissionais</h4>
              <div className="skills-cont">
                {skillStore.length > 0 ? (
                  skillStore.map((list, i) => {
                    return (
                      <div className="skills-card" key={list.id}>
                        <span>{list.name}</span>
                        <ProgressBar completed={list.level} />
                      </div>
                    );
                  })
                ) : (
                  <div className="skills-card">
                    <span>Microsoft Office</span>
                    <ProgressBar completed={100} />
                  </div>
                )}
              </div>
            </div>
            {/* Personal Skills */}
            <div className="personal-skills box">
              <div className="head">
                <h5>Habilidades Pessoais</h5>
              </div>
              <div className="p-skills-cont">
                {pskillStore.length > 0 ? (
                  pskillStore.map((skill, i) => {
                    return (
                      <span className="skill" key={i}>
                        {skill}
                      </span>
                    );
                  })
                ) : (
                  <span className="skill">Trabalho em equipe</span>
                )}
              </div>
            </div>
            {/* socials */}
            <div className="socials box">
              <div className="head">
                <h5>Rede Sociais <HiGlobeAlt className="icon" style={iconsStyle.Sicon} /></h5>
                
              </div>
              <ul className="list">
                {socials.length > 0 ? (
                  socials.map((list, i) => {
                    return (
                      <li key={list.id}>
                        <a
                          href={list.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {list.url}
                        </a>
                      </li>
                    );
                  })
                ) : (
                  <li>
                    
                    <a
                      href="http://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                     
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="space"></div>
      <ZoomControl setSCale={setSCale} setZoomState={setZoomState} />
    </>
  );
}

export default Default;

// this styles is meant when genrating pdf

const iconsStyle = {
  Licon: {
    color: "#007bff",
  },
  Sicon: {
    color: "#007bff",
  },
};
