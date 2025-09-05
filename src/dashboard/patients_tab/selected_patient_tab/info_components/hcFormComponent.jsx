import * as React from "react";
import './hc_form_component.css'
import {useEffect, useState} from "react";

function getTodayForDjango() {
  const today = new Date();
  return today.toString();
}

function reformatDjangoDate(djangoDateString) {
  const d = new Date(djangoDateString);

  // pull out zero-padded components
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear() % 100).padStart(2, '0');

  return `${dd}-${mm}-${yy}`;
}

function PatientNotes({ note }) {
    let date = note["note_date"]
    let title = note["note_title"]
    let data = note["note_data"]
  return (
    <article className="note">
      <time className="note-date" style={{margin: 0}}>{date}</time>
      <h4>
        {title}
      </h4>
      <p className="note-data" style={{margin: 0}}>{data}</p>
    </article>
  );
}

function HCForm({ selectedPatient, setSelectedPatient, setNewHCContainer, hcDate }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const onCancelCareClick = () => {
      setNewHCContainer(false)
  }

  let hygieneCheckDailyMap = {
    mouthCare: "Ağız Bakımı/Dişlerin Temizliği",
    handFaceCare: "El-Yüz Temizliği",
    earNoseCare: "Burun-Kulak Temizliği",
    bottomCare: "Alt Bakımı",
    bodyCare: "Vücut  Muayenesi Kontrolü",
    rashCare: "Yara/Kızarıklık vb. kontrolü",
    moistureCare: "Cildi Nemlendirme",
  }
  let hygieneCheckWeeklyMap = {
    bathCare: "Banyo Yaptırılması",
    handFootCare: "El ve Ayak Tırnaklarının Kesilmesi",
    bodyHairCare: "İstenmeyen Tüylerin Temizliği",
    hairCare: "Saç-Sakal Tıraşının Yapılması",
    bedBathCare: "Yatak Banyosu/Vücut Silme/Yatakta Saç Yıkama",
    bedSheetCare: "Yatak Takımlarının Değiştirilmesi",
  }
  let mealCheckMap = {
    breakfastCare: "Kahvaltı",
    lunchCare: "Öğle Yemeği",
    midCare: "Ara Öğün",
    dinnerCare: "Akşam Yemeği",
    liquidCare: "Su ve Diğer Sıvı Alımı",
  }
  let postureCheckMap = {
    walkable: "Mobil/Yürüyen Misafir",
  }
  let dressingCheckMap = {
    isInjured: "Bası Yarası var mı?",
    stage: "Kaçıncı Evre?",
    dailyDressing: "Günlük Bası Yarası Pansumanı Yapıldı mı?",
    needDressing: "Pansuman gerektiren bir durum var mı?",
    isDressed: "Pansuman Yapıldı mı?",
    catheter: "Katater Bakımı Yapıldı mı?"
  }
  let edemaCheckMap = {
    edema: "Ödem var mı?",
    edemaPart: "Hangi bölgede?",
    liquidCheck: "Sıvı takibi yapıldı mı?"
  }
  let securityCheckMap = {
    reason1: "Yerde takılacağı kablo vs. herhangi bir şey var mı? Giymiş olduğu terlik ve oda zemini güvenli mi?",
    reason2: "Hemşire çağrı zilinin kullanıldı mı?",
    reason3: "Gözlük kullanıyor ise erişebileceği bir yere konuldu mu?",
    reason4: "Kenarlık koruması gerekli mi?",
    reason5: "Düşme riski oluştu mu?"
  }
  let urineCheckMap = {
    urine:  "İdrar Çıkışı (ml):",
    stool: "Gaita Çıkışı Var mı?"
  }

  const dict_key = reformatDjangoDate(hcDate)

  const [isLoading, setIsLoading] = useState(true);

  const [ hcType, setHcType ] = useState("day")

  const [hygieneCheckDaily, setHygieneCheckDaily] = useState({
    mouthCare: false,
    handFaceCare: false,
    earNoseCare: false,
    bottomCare: false,
    bodyCare: false,
    rashCare: false,
    moistureCare: false,
  });

  const [hygieneCheckWeekly, setHygieneCheckWeekly] = useState({
    bathCare: false,
    handFootCare: false,
    bodyHairCare:  false,
    hairCare:  false,
    bedBathCare:  false,
    bedSheetCare:  false,
  });

  const [mealCheck, setMealCheck] = useState({
    breakfastCare: false,
    lunchCare: false,
    midCare: false,
    dinnerCare: false,
    liquidCare: false,
  });

  const [postureCheck, setPostureCheck] = useState({
    walkable: false,
  });

  const [dressingCheck, setDressingCheck] = useState({
    isInjured: false,
    stage: 1,
    dailyDressing: false,
    needDressing: false,
    isDressed: false,
    catheter: false
  });

  const [edemaCheck, setEdemaCheck] = useState({
    edema: false,
    edemaPart: "",
    liquidCheck: false
  });

  const [securityCheck, setSecurityCheck] = useState({
    reason1: false,
    reason2: false,
    reason3: false,
    reason4: false,
    reason5: false
  });

  const [urineCheck, setUrineCheck] = useState({
    urine: 0,
    stool: false
  });

  const [roomChecks, setRoomChecks] = useState(
    new Array(12).fill(false)
  );

  const [feedingNote, setFeedingNote] = useState('');
  const [selectedNote, setSelectedNote] = useState('');

  const [oldNotes, setOldNotes] = useState([{
      note_date: "15.09.23",
      note_title: "Test1",
      note_data: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },{
      note_date: "15.09.23",
      note_title: "Test2",
      note_data: "bbbbb",
    }])

  const toggleList = (key, key_list, key_function) => {
    key_function({
      ...key_list,
      [key]: !key_list[key],
    });
  };

  const toggleRoomCheck = (index) => {
    setRoomChecks(roomChecks.map((check, i) =>
      i === index ? !check : check
    ));
  };
  const handleToggleHcType = () => {
    console.log(hcType)
    const nextMode = hcType === "day" ? "night" : "day";
    console.log(nextMode)
    console.log("---")

    setHcType(nextMode);
    setIsLoading(true)
    updateSelectedPatient(user.email, nextMode)
  };
  const submitSignedHC = () => {
    const hcs = selectedPatient["patient_signed_hc"];
    let payload = {}
    if (dict_key in hcs && hcType in hcs[dict_key]) {
      payload = {
        "patient_id": selectedPatient["patient_id"],
        "email": user.email,
        "type": "update_signed_hc",
        "signed_hc_id": hcs[dict_key][hcType].at(-1)["signed_hc_id"],
        "signed_hc_type": hcType,
        "today_date": getTodayForDjango()
      }
    }
    else {
      payload = {
        "patient_id": selectedPatient["patient_id"],
        "email": user.email,
        "type": "add_signed_hc",
        "signed_hc_type": hcType,
        "today_date": getTodayForDjango()
      }
    }
    payload["signed_hc_data"] = {
      "hygieneCheckDaily": hygieneCheckDaily,
      "hygieneCheckWeekly": hygieneCheckWeekly,
      "mealCheck": mealCheck,
      "postureCheck": postureCheck,
      "dressingCheck": dressingCheck,
      "edemaCheck": edemaCheck,
      "securityCheck": securityCheck,
      "urineCheck": urineCheck,
      "roomChecks": roomChecks
    }
    // setTakenMeds(prev => new Set([...prev, ...selectedGivenMeds]));
    // setSelectedGivenMeds(new Set());

    fetch("http://localhost:8000/api/patients/", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      })
      .then(r => r.json())
      .then(() => {
      })
      .catch(console.error);
  };

  const updateSelectedPatient = (email, hc_type) => {
    setIsLoading(true);
    fetch(`http://localhost:8000/api/patients/?email=${email}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(resp => {
      // Assuming the backend sends back a JSON response indicating success or failure
      if (resp.status === "success") {
        const selectedPatientNew = resp.data[0];
        if (selectedPatient !== selectedPatientNew){
          setSelectedPatient(selectedPatientNew);
        }
        const hcs = selectedPatientNew["patient_signed_hc"];

        if (dict_key in hcs && hc_type in hcs[dict_key]) {
           let hc = hcs[dict_key][hc_type].at(-1)["signed_hc_data"];
           setHygieneCheckDaily(hc["hygieneCheckDaily"])
           setHygieneCheckWeekly(hc["hygieneCheckWeekly"])
           setMealCheck(hc["mealCheck"])
           setPostureCheck(hc["postureCheck"])
           setDressingCheck(hc["dressingCheck"])
           setEdemaCheck(hc["edemaCheck"])
           setSecurityCheck(hc["securityCheck"])
           setUrineCheck(hc["urineCheck"])
           setRoomChecks(hc["roomChecks"])
        }
        else {
          setHygieneCheckDaily({
            mouthCare: false,
            handFaceCare: false,
            earNoseCare: false,
            bottomCare: false,
            bodyCare: false,
            rashCare: false,
            moistureCare: false,
          })
          setHygieneCheckWeekly({
            bathCare: false,
            handFootCare: false,
            bodyHairCare:  false,
            hairCare:  false,
            bedBathCare:  false,
            bedSheetCare:  false,
          })
          setMealCheck({
            breakfastCare: false,
            lunchCare: false,
            midCare: false,
            dinnerCare: false,
            liquidCare: false,
          })
          setPostureCheck({
            walkable: false,
          })
          setDressingCheck({
            isInjured: false,
            stage: 1,
            dailyDressing: false,
            needDressing: false,
            isDressed: false,
            catheter: false
          })
          setEdemaCheck({
            edema: false,
            edemaPart: "",
            liquidCheck: false
          })
          setSecurityCheck({
            reason1: false,
            reason2: false,
            reason3: false,
            reason4: false,
            reason5: false
          })
          setUrineCheck({
            urine: 0,
            stool: false
          })
          setRoomChecks(
              new Array(12).fill(false)
          )
        }
        setIsLoading(false);
      }
    }
    )
  };

  useEffect(() => {
      updateSelectedPatient(user.email, hcType)
    }, [user.email]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blackout-container">
            <div className="blackout"></div>
            <div className="blackout-care-page-container">
                <div className="care-page">
      <div className="content">
        <div className="header">
          <h2>Bakım - Aktif Yaşam</h2>
          <button onClick={handleToggleHcType} aria-pressed={hcType === "night"}>
          {hcType === "day" ? "Switch to night" : "Switch to day"}
          </button>
        </div>
        <div className="header" style={{justifyContent: "center"}}>
          <h3>Ahmet John Sugardoeoğlu</h3>
        </div>
        <div className="header" style={{justifyContent: "right"}}>
          <h4>01.25.2025 - 21:00</h4>
          <button className="close-button" aria-label="Close alert" type="button" onClick={onCancelCareClick}
                  style={{"border": "none", "backgroundColor": "inherit", "cursor": "pointer", "margin": "-2px 0 0 5px"}}>
            <h2 aria-hidden="true">&times;</h2>
          </button>
        </div>
      </div>
          <div className="divider"></div>


      <div className="content">
        <div className="care-column">
          <div>
          <h3>Hijyen Gereksinimleri</h3>
          <div className="divider-low-margin"></div>
          <div>
            <h4>Günlük Gereksinimler</h4>
            {Object.keys(hygieneCheckDaily).map((key) => (
              <div className="each-point" key={key}>
                <label>{hygieneCheckDailyMap[key]}</label>
                <input type="checkbox" checked={hygieneCheckDaily[key]} onChange={() => toggleList(key, hygieneCheckDaily, setHygieneCheckDaily)} />
              </div>
            ))}
          </div>
          <div style={{marginTop: "10px"}}>
            <h4>Haftalık Gereksinimler</h4>
            {Object.keys(hygieneCheckWeekly).map((key) => (
              <div className="each-point" key={key}>
                <label>{hygieneCheckWeeklyMap[key]}</label>
                <input type="checkbox" checked={hygieneCheckWeekly[key]} onChange={() => toggleList(key, hygieneCheckWeekly, setHygieneCheckWeekly)} />
              </div>
            ))}
          </div>
          </div>
          <div style={{marginTop: "20px"}}>
          <h3>Beslenme Takibi</h3>
          <div className="divider-low-margin"></div>
          <div>
            {Object.keys(mealCheck).map((key) => (
              <div className="each-point" key={key}>
                <label>{mealCheckMap[key]}</label>
                <input type="checkbox" checked={mealCheck[key]} onChange={() => toggleList(key, mealCheck, setMealCheck)} />
              </div>
            ))}
          </div>
          </div>
          <div style={{marginTop: "20px"}}>
          <h3>Pozisyon Takibi</h3>
          <div className="divider-low-margin"></div>
          <div>
            {Object.keys(postureCheck).map((key) => (
              <div className="each-point" key={key}>
                <label>{postureCheckMap[key]}</label>
                <input type="checkbox" checked={postureCheck[key]} onChange={() => toggleList(key, postureCheck, setPostureCheck)} />
              </div>
            ))}
          </div>
        </div>
        </div>


        <div className="care-column">
          <div>
          <h3>Pansuman ve Katater Bakımı</h3>
          <div className="divider-low-margin"></div>
          <div>
            {Object.keys(dressingCheck).map((key) => (
              <div className="each-point" key={key}>
                <label>{dressingCheckMap[key]}</label>
                <input type="checkbox" checked={dressingCheck[key]} onChange={() => toggleList(key, dressingCheck, setDressingCheck)} />
              </div>
            ))}
          </div>
        </div>
          <div style={{marginTop: "20px"}}>
          <h3>Ödem Takibi</h3>
          <div className="divider-low-margin"></div>
          <div>
            {Object.keys(edemaCheck).map((key) => (
              <div className="each-point" key={key}>
                <label>{edemaCheckMap[key]}</label>
                <input type="checkbox" checked={edemaCheck[key]} onChange={() => toggleList(key, edemaCheck, setEdemaCheck)} />
              </div>
            ))}
          </div>
        </div>
          <div style={{marginTop: "20px"}}>
          <h3>Misafir Güvenliği</h3>
          <div className="divider-low-margin"></div>
          <div>
            {Object.keys(securityCheck).map((key) => (
              <div className="each-point" key={key}>
                <label>{securityCheckMap[key]}</label>
                <input type="checkbox" checked={securityCheck[key]} onChange={() => toggleList(key, securityCheck, setSecurityCheck)} />
              </div>
            ))}
          </div>
        </div>
          <div style={{marginTop: "20px"}}>
          <h3>İdrar ve Gaita Takibi</h3>
          <div className="divider-low-margin"></div>
          <div>
            {Object.keys(urineCheck).map((key) => (
              <div className="each-point" key={key}>
                <label>{urineCheckMap[key]}</label>
                <input type="checkbox" checked={urineCheck[key]} onChange={() => toggleList(key, urineCheck, setUrineCheck)} />
              </div>
            ))}
          </div>
        </div>
        </div>

        <div >
          <div className="half-care-column">
            <h3>Bakım Notları</h3>
            <div className="divider"></div>
            <div className="care-notes">
              {oldNotes.map((note, index) => (
                <PatientNotes className="care-note" key={index} note={note} />
              ))}
            </div>
            <div className="divider"></div>
            <h4 style={{marginBottom: "10px"}}>{selectedNote ? selectedNote : "Başlık Seçiniz"}</h4>
            <textarea placeholder="Notunuzu giriniz..." value={feedingNote} onChange={(e) => setFeedingNote(e.target.value)} />
            <h5>Konu Başlığı</h5>
            <div className="half-care-note-submit">
              <select onChange={(e) => setSelectedNote(e.target.value)}>
                <option>Hijyen Gereksinimleri</option>
                <option>Beslenme Takibi</option>
                <option>Pozisyon Takibi</option>
                <option>Pansuman ve Katater Bakımı</option>
                <option>Ödem Takibi</option>
                <option>Misafir Güvenliği</option>
              </select>
              <button style={{"backgroundColor": "#A695CC"}}>Not Ekle</button>
            </div>
          </div>

          <div className="half-care-column">
          <h3>Oda Kontrolü</h3>
          <div className="divider"></div>
          <div className="room-checks">
            {roomChecks.map((checked, index) => (
              <div key={index} className={`room-check ${checked ? 'checked' : ''}`} onClick={() => toggleRoomCheck(index)}>
                {`${8 + index}:00 Kontrol edildi`}
              </div>
            ))}
          </div>
          <label>Kontrol Eden Hemşire: İsa Yusuf ORAK</label>
          <div style={{display: "inline-flex", "width": "100%", "justifyContent": "center", "marginBottom": "15px"}}>
            <button style={{backgroundColor: "#A695CC", "marginRight": "5px"}} onClick={submitSignedHC}>İmza</button>
            <button style={{backgroundColor: "#E77169"}} onClick={onCancelCareClick}>Geri</button>
          </div>
        </div>
        </div>
      </div>
    </div>
            </div>
          </div>
  );
}

export default HCForm;
