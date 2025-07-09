import * as React from "react";
import './hc_form_component.css'
import {useState} from "react";


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

function HCForm({ selectedPatient, setNewHCContainer, isFilled=false }) {

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

  const [hygieneCheckDaily, setHygieneCheckDaily] = useState({
    mouthCare: isFilled && selectedPatient["patient_signed_hc"].length !== 0 ? selectedPatient["patient_signed_hc"][-1]["hygieneCheckDaily"]["mouthCare"] : false,
    handFaceCare: isFilled && selectedPatient["patient_signed_hc"].length !== 0 ? selectedPatient["patient_signed_hc"][-1]["hygieneCheckDaily"]["handFaceCare"] : false,
    earNoseCare: isFilled && selectedPatient["patient_signed_hc"].length !== 0 ? selectedPatient["patient_signed_hc"][-1]["hygieneCheckDaily"]["earNoseCare"] : false,
    bottomCare: isFilled && selectedPatient["patient_signed_hc"].length !== 0 ? selectedPatient["patient_signed_hc"][-1]["hygieneCheckDaily"]["bottomCare"] : false,
    bodyCare: isFilled && selectedPatient["patient_signed_hc"].length !== 0 ? selectedPatient["patient_signed_hc"][-1]["hygieneCheckDaily"]["bodyCare"] : false,
    rashCare: isFilled && selectedPatient["patient_signed_hc"].length !== 0 ? selectedPatient["patient_signed_hc"][-1]["hygieneCheckDaily"]["rashCare"] : false,
    moistureCare: isFilled && selectedPatient["patient_signed_hc"].length !== 0 ? selectedPatient["patient_signed_hc"][-1]["hygieneCheckDaily"]["mouthCare"] : false,
  });

  const [hygieneCheckWeekly, setHygieneCheckWeekly] = useState({
    bathCare: isFilled && selectedPatient["patient_signed_hc"].length !== 0 ? selectedPatient["patient_signed_hc"][-1]["hygieneCheckWeekly"]["bathCare"] : false,
    handFootCare: isFilled && selectedPatient["patient_signed_hc"].length !== 0 ? selectedPatient["patient_signed_hc"][-1]["hygieneCheckWeekly"]["handFootCare"] : false,
    bodyHairCare:  isFilled && selectedPatient["patient_signed_hc"].length !== 0 ? selectedPatient["patient_signed_hc"][-1]["hygieneCheckWeekly"]["bodyHairCare"] : false,
    hairCare:  isFilled && selectedPatient["patient_signed_hc"].length !== 0 ? selectedPatient["patient_signed_hc"][-1]["hygieneCheckWeekly"]["hairCare"] : false,
    bedBathCare:  isFilled && selectedPatient["patient_signed_hc"].length !== 0 ? selectedPatient["patient_signed_hc"][-1]["hygieneCheckWeekly"]["bedBathCare"] : false,
    bedSheetCare:  isFilled && selectedPatient["patient_signed_hc"].length !== 0 ? selectedPatient["patient_signed_hc"][-1]["hygieneCheckWeekly"]["bedSheetCare"] : false,
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



  const [feedingNote, setFeedingNote] = useState('');
  const [selectedNote, setSelectedNote] = useState('');

  const [roomChecks, setRoomChecks] = useState(
    new Array(12).fill(false)
  );

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
    console.log(postureCheck)
  };

  const toggleRoomCheck = (index) => {
    setRoomChecks(roomChecks.map((check, i) =>
      i === index ? !check : check
    ));
  };

  return (
    <div className="blackout-container">
            <div className="blackout"></div>
            <div className="blackout-care-page-container">
                <div className="care-page">
      <div className="content">
        <div className="header">
          <h2>Bakım - Aktif Yaşam</h2>
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
            <button style={{backgroundColor: "#A695CC", "marginRight": "5px"}}>İmza</button>
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
