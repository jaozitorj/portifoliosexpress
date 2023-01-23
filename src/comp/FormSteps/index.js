import React, { useContext, useState } from "react";
import { HiUpload } from "react-icons/hi";
import code from "../../helpers/phonenumbers.json";

import "./style.css";

import DataContext from "../../context/DataContext";
import { Notification } from "../../helpers/util";
import Badge from "./badge";

const notif = new Notification(3000);

export function UserInfo({ nextStepFunc }) {
  const {
    fullname,
    jobtype,
    imageTemp,
    setTempImage,
    setJobType,
    setFullname,
  } = useContext(DataContext);

  function handleImage() {
    let fileInput = document.querySelector(".file");
    fileInput.click();

    fileInput.addEventListener("change", (e) => {
      let imageExt = ["png", "PNG", "jpeg", "JPEG", "jpg", "JPG", "svg", "SVG"];

      let type = fileInput.files[0].type.split("/")[1];

      if (imageExt.includes(type) === false) {
        notif.error("Image type selected is invalid");
        return;
      }
      let url = URL.createObjectURL(fileInput.files[0]);
      setTempImage(url);
    });
  }

  return (
    <div className="step-form-cont step1">
      <br />
      <div className="info-container">
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
          <input type="file" className="file" hidden />
          <div className="span upload-box">
            <HiUpload className="icon" onClick={handleImage} />
          </div>
        </div>
        {/* body */}
        <div className="bottom-cont">
          <div className="box box-1">
            <h3>Informações do usuário</h3>
            <input
              type="text"
              placeholder="Nome e sobrenome"
              maxLength={20}
              className="inp form-control"
              onChange={(e) => {
                setFullname(e.target.value);
              }}
              value={fullname ? fullname : ""}
            />
            <input
              type="text"
              placeholder="Seu cargo"
              maxLength={30}
              onChange={(e) => {
                setJobType(e.target.value);
              }}
              className="inp form-control"
              value={jobtype ? jobtype : ""}
            />
          </div>
          <div className="action-cont">
            <button
              className="btn next-btn"
              onClick={(e) => {
                if (fullname === "" || jobtype === "") {
                  return notif.error("Por favor preencha todos os campos.");
                }
                if (imageTemp === "") {
                  return notif.error("Por favor insira uma imagem.");
                }
                nextStepFunc();
              }}
            >
              Continue
            </button>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export function Address({ nextStepFunc, prevStep }) {
  const {
    phoneType,
    phonenumber,
    email,
    address,
    setPhoneType,
    setPhoneNumber,
    setEmail,
    setAddress,
  } = useContext(DataContext);

  return (
    <div className="step-form-cont step1">
      <br />
      <div className="info-container address">
        <div className="bottom-cont">
          <div className="box box-1">
            <h3>Address</h3>
            <br />
            <div className="join-cont">
              <select
                className="phonetype sel"
                onChange={(e) => {
                  setPhoneType(e.target.value);
                }}
              >
                {code.map((elm, i) => {
                  return (
                    <option value={elm.E164} key={i}>
                      +{elm.E164} {elm["Country Name"]}
                    </option>
                  );
                })}
              </select>
              <input
                type="number"
                placeholder="Seu telefone"
                className="inp form-control"
                defaultValue={phonenumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </div>
            <input
              type="email"
              placeholder="Seu e-mail"
              className="inp form-control"
              defaultValue={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Seu endereço"
              maxLength={50}
              className="inp form-control"
              defaultValue={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <br />
            {/* <button className="btn addbtn">Add Info</button> */}
          </div>
          <div className="action-cont">
            <button className="btn back-btn" onClick={prevStep}>
              Voltar
            </button>
            <button
              className="btn next-btn"
              onClick={() => {
                console.log(phoneType);
                if (phoneType === "") {
                  return notif.error("Selecione o código do país.");
                } else if (phonenumber === "") {
                  return notif.error("O número de telefone não pode estar vazio.");
                } else if (email === "") {
                  return notif.error("E-mail não pode estar vazio.");
                } else if (address === "") {
                  return notif.error("Endereço não pode estar vazio.");
                }
                nextStepFunc();
              }}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkExp({ nextStepFunc, prevStep }) {
  const {
    jobyear,
    jobtitle,
    jobLocation,
    jobexp,
    jobStore,
    setJobYear,
    setJobLocation,
    setJobExp,
    setJobStore,
    setJobTitle,
  } = useContext(DataContext);

  let jobMemory = {};

  const genId = () => {
    let char = "ABCDefghi09546".split("");
    let str = "";
    for (let i = 0; i < 5 + 1; i++) {
      const rand = Math.floor(Math.random() * char.length);

      str += char[rand];
    }
    return str;
  };

  function handleForm() {
    // validate
    if (jobyear === "") {
      return notif.error("job year cant be empty");
    }
    if (jobtitle === "") {
      return notif.error("job title cant be empty");
    }
    if (jobLocation === "") {
      return notif.error("job location cant be empty");
    }
    if (jobexp === "") {
      return notif.error("job experience cant be empty");
    }

    jobMemory = {
      id: genId(),
      year: jobyear,
      title: jobtitle,
      location: jobLocation,
      experience: jobexp,
    };

    setJobStore([...jobStore, jobMemory]);
  }

  return (
    <div className="step-form-cont step1">
      <br />
      <div className="info-container address">
        <div className="bottom-cont">
          <div className="box box-1">
            <h3>Experiência profissional</h3>
            <br />
            <div className="join-cont">
              <input
                type="number"
                min="1900"
                max="2099"
                step="1"
                placeholder="2023"
                className="date sel"
                defaultValue={jobyear}
                onChange={(e) => {
                  setJobYear(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Cargo e Empresa"
                className="inp form-control"
                defaultValue={jobtitle}
                onChange={(e) => {
                  setJobTitle(e.target.value);
                }}
              />
            </div>
            <input
              type="text"
              maxLength={50}
              placeholder="Localização"
              className="inp form-control"
              defaultValue={jobLocation}
              onChange={(e) => {
                setJobLocation(e.target.value);
              }}
            />
            <textarea
              cols="30"
              rows="2"
              className="inp form-control expText"
              placeholder="Descreva sua expreriência"
              defaultValue={jobexp}
              onChange={(e) => {
                setJobExp(e.target.value);
              }}
            ></textarea>
            <br />
            <div className="badge-container d-flex flex-wrap">
              <Badge list={jobStore} deleteItem={setJobStore} />
            </div>
            <button className="btn addbtn" onClick={handleForm}>
              Add Experiência
            </button>
          </div>
          <div className="action-cont">
            <button className="btn back-btn" onClick={prevStep}>
              Voltar
            </button>
            <button
              className="btn next-btn"
              onClick={() => {
                nextStepFunc();
              }}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Education({ nextStepFunc, prevStep }) {
  const {
    eduYear,
    eduName,
    eduExp,
    eduStore,
    setEduYear,
    setEducationName,
    setEduExp,
    setEduStore,
  } = useContext(DataContext);

  let eduMemory = {};

  const genId = () => {
    let char = "ABCDefghi09546".split("");
    let str = "";
    for (let i = 0; i < 5 + 1; i++) {
      const rand = Math.floor(Math.random() * char.length);

      str += char[rand];
    }
    return str;
  };

  function handleForm() {
    // validate
    if (eduYear === "") {
      return notif.error("education year cant be empty");
    }
    if (eduName === "") {
      return notif.error("education name cant be empty");
    }
    if (eduExp === "") {
      return notif.error("education experience cant be empty");
    }

    eduMemory = {
      id: genId(),
      year: eduYear,
      title: eduName,
      experience: eduExp,
    };

    setEduStore([...eduStore, eduMemory]);
  }

  return (
    <div className="step-form-cont step1">
      <br />
      <div className="info-container address">
        <div className="bottom-cont">
          <div className="box box-1">
            <h3>Educação</h3>
            <br />
            <div className="join-cont">
              <input
                type="number"
                min="1900"
                max="2099"
                step="1"
                placeholder="2023"
                className="date sel"
                defaultValue={eduYear}
                onChange={(e) => {
                  setEduYear(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Nome da universidade"
                className="inp form-control"
                defaultValue={eduName}
                onChange={(e) => {
                  setEducationName(e.target.value);
                }}
              />
            </div>
            <textarea
              cols="30"
              rows="3"
              maxLength={400}
              placeholder="Ensino superior"
              className="inp form-control expText"
              defaultValue={eduExp}
              onChange={(e) => {
                setEduExp(e.target.value);
              }}
            ></textarea>
            <div className="badge-container d-flex flex-wrap">
              <Badge list={eduStore} deleteItem={setEduStore} />
            </div>
            <button className="btn addbtn" onClick={handleForm}>
              Add Educação
            </button>
          </div>
          <div className="action-cont">
            <button className="btn back-btn" onClick={prevStep}>
              Voltar
            </button>
            <button
              className="btn next-btn"
              onClick={() => {
                // if (nextState === false) {
                //   return notif.error("you forgot to add the details");
                // }
                nextStepFunc();
              }}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hobbies({ nextStepFunc, prevStep }) {
  const { hobbies, setHobbies } = useContext(DataContext);

  return (
    <div className="step-form-cont step1">
      <br />
      <div className="info-container address">
        <div className="bottom-cont">
          <div className="box box-1">
            <h3>Hobbies & interesses</h3>
            <br />
            <textarea
              cols="30"
              rows="3"
              maxLength={300}
              className="inp form-control expText"
              placeholder="Escreva seus hobbies e interesses"
              defaultValue={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
            ></textarea>
            <br />
          </div>
          <div className="action-cont">
            <button className="btn back-btn" onClick={prevStep}>
              Voltar
            </button>
            <button
              className="btn next-btn"
              onClick={() => {
                if (hobbies === "") {
                  return notif.error("Por favor escreva um hobbie.");
                }
                nextStepFunc();
              }}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Quotes({ nextStepFunc, prevStep }) {
  const { quotes, setQuotes } = useContext(DataContext);

  return (
    <div className="step-form-cont step1">
      <br />
      <div className="info-container address">
        <div className="bottom-cont">
          <div className="box box-1">
            <h3>Citações motivacionais</h3>
            <br />
            <textarea
              cols="30"
              rows="3"
              maxLength={300}
              className="inp form-control expText"
              placeholder="Escreva uma citacão"
              defaultValue={quotes}
              onChange={(e) => setQuotes(e.target.value)}
            ></textarea>
            <br />
          </div>
          <div className="action-cont">
            <button className="btn back-btn" onClick={prevStep}>
              Voltar
            </button>
            <button
              className="btn next-btn"
              onClick={() => {
                if (quotes === "") {
                  return notif.error("Por favor escreva uma citacação motivacional.");
                }
                nextStepFunc();
              }}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProSkills({ nextStepFunc, prevStep }) {
  const {
    skillname,
    skillLevel,
    skillStore,
    setSkillname,
    setSkillLevel,
    setSkillStore,
  } = useContext(DataContext);

  let skillMemory = {};

  const genId = () => {
    let char = "ABCDefghi09546".split("");
    let str = "";
    for (let i = 0; i < 5 + 1; i++) {
      const rand = Math.floor(Math.random() * char.length);

      str += char[rand];
    }
    return str;
  };

  function handleForm() {
    // validate
    if (skillname === "") {
      return notif.error("Nome da habilidade não pode estar vazio.");
    }
    if (skillLevel === "") {
      return notif.error("Nome da habilidade não pode estar vazio.");
    }

    skillMemory = {
      id: genId(),
      name: skillname,
      level: skillLevel,
    };

    setSkillStore([...skillStore, skillMemory]);
  }

  return (
    <div className="step-form-cont step1">
      <br />
      <div className="info-container address">
        <div className="bottom-cont">
          <div className="box box-1">
            <h3>Habilidades Profissionais</h3>
            <br />
            <input
              type="number"
              placeholder="Porcentagem: 1-100"
              className="inp form-control"
              min={1}
              max={3}
              step={1}
              maxLength={3}
              minLength={1}
              defaultValue={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nome da habilidade"
              className="inp form-control"
              maxLength={150}
              defaultValue={skillname}
              onChange={(e) => setSkillname(e.target.value)}
            />
            <br />
            <div className="badge-container d-flex flex-wrap">
              <Badge list={skillStore} deleteItem={setSkillStore} />
            </div>
            <button className="btn addbtn" onClick={handleForm}>
              Add habilidade
            </button>
          </div>
          <div className="action-cont">
            <button className="btn back-btn" onClick={prevStep}>
              Voltar
            </button>
            <button className="btn next-btn" onClick={nextStepFunc}>
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PersonalSkills({ nextStepFunc, prevStep }) {
  const { personalSkill, setPersonalSkill, setPersonalStore } =
    useContext(DataContext);

  function handleForm() {
    // validate
    if (personalSkill === "") {
      return notif.error("O campo não pode estar vazio.");
    }

    let pskill = personalSkill
      .trim()
      .replace(/^\s+|\s+$/gm, "")
      .split(",");

    setPersonalStore([...pskill]);
  }

  return (
    <div className="step-form-cont step1">
      <br />
      <div className="info-container address">
        <div className="bottom-cont">
          <div className="box box-1">
            <h3>Habilidades Pessoais</h3>
            <br />
            <textarea
              cols="30"
              rows="3"
              maxLength={300}
              className="inp form-control expText"
              placeholder="Adicionar habilidades pessoais separados por vírgula. (,)"
              defaultValue={personalSkill}
              onChange={(e) => setPersonalSkill(e.target.value)}
            ></textarea>
            <br />
            <button className="btn addbtn" onClick={handleForm}>
              Add Habilidades Pessoais
            </button>
          </div>
          <div className="action-cont">
            <button className="btn back-btn" onClick={prevStep}>
              Volte
            </button>
            <button className="btn next-btn" onClick={nextStepFunc}>
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SocialLinks({ nextStepFunc, prevStep }) {
  const { socials, setSocials } = useContext(DataContext);
  const [url, setUrl] = useState("");

  function validUrl(text) {
    try {
      let url = new URL(text);
      return url.protocol ? true : false;
    } catch (err) {
      return false;
    }
  }
  const genId = () => {
    let char = "ABCDefghi09546".split("");
    let str = "";
    for (let i = 0; i < 5 + 1; i++) {
      const rand = Math.floor(Math.random() * char.length);

      str += char[rand];
    }
    return str;
  };

  function handleForm() {
    if (url === "") {
      return notif.error("Deve fornecer pelo menos uma url.");
    }
    if (validUrl(url) === false && url !== "") {
      return notif.error("Url da rede social inválida. Deve inserir http://");
    }

    let linkstore = {
      id: genId(),
      url,
    };

    setSocials([...socials, linkstore]);
  }

  return (
    <div className="step-form-cont step1">
      <br />
      <div className="info-container address">
        <div className="bottom-cont">
          <div className="box box-1">
            <h3>Rede Sociais</h3>
            <br />
            <input
              type="url"
              placeholder="http://www.instagram.com/example"
              className="inp form-control"
              maxLength="70"
              defaultValue={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
            <br />
            <div className="badge-container d-flex flex-wrap">
              <Badge list={socials} deleteItem={setSocials} />
            </div>
            <button className="btn addbtn" onClick={handleForm}>
              Add Rede Social
            </button>
          </div>
          <div className="action-cont">
            <button className="btn back-btn" onClick={prevStep}>
              Voltar
            </button>
            <button
              className="btn next-btn"
              onClick={() => {
                if (url === "") {
                  return notif.error("Deve fornecer pelo menos uma url.");
                }
                nextStepFunc();
              }}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SidebarStyles({ nextStepFunc, prevStep }) {
  const { saveData } = useContext(DataContext);

  return (
    <div className="step-form-cont step1">
      <br />
      <div className="info-container address">
        <div className="bottom-cont">
          <div className="action-cont">
            <button className="btn back-btn" onClick={prevStep}>
              Voltar
            </button>
            <button
              className="btn next-btn"
              onClick={() => {
                saveData();
                notif.success("Todos os dados foram salvos com sucesso");
                nextStepFunc();
              }}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
