import React, { useMemo, useState } from "react";
import { API_BASE_URL } from "../../../config";
import {
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  InputAdornment,
  FormHelperText,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import "./patients_tab_add.css";

function PatientAdd({ setGeneralTab, setAddTab }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Options
  const provinces = useMemo(
    () => [
      "Adana",
      "Adıyaman",
      "Afyonkarahisar",
      "Ağrı",
      "Amasya",
      "Ankara",
      "Antalya",
      "Artvin",
      "Aydın",
      "Balıkesir",
      "Bilecik",
      "Bingöl",
      "Bitlis",
      "Bolu",
      "Burdur",
      "Bursa",
      "Çanakkale",
      "Çankırı",
      "Çorum",
      "Denizli",
      "Diyarbakır",
      "Edirne",
      "Elazığ",
      "Erzincan",
      "Erzurum",
      "Eskişehir",
      "Gaziantep",
      "Giresun",
      "Gümüşhane",
      "Hakkari",
      "Hatay",
      "Isparta",
      "Mersin",
      "İstanbul",
      "İzmir",
      "Kars",
      "Kastamonu",
      "Kayseri",
      "Kırklareli",
      "Kırşehir",
      "Kocaeli",
      "Konya",
      "Kütahya",
      "Malatya",
      "Manisa",
      "Kahramanmaraş",
      "Mardin",
      "Muğla",
      "Muş",
      "Nevşehir",
      "Niğde",
      "Ordu",
      "Rize",
      "Sakarya",
      "Samsun",
      "Siirt",
      "Sinop",
      "Sivas",
      "Tekirdağ",
      "Tokat",
      "Trabzon",
      "Tunceli",
      "Şanlıurfa",
      "Uşak",
      "Van",
      "Yozgat",
      "Zonguldak",
      "Aksaray",
      "Bayburt",
      "Karaman",
      "Kırıkkale",
      "Batman",
      "Şırnak",
      "Bartın",
      "Ardahan",
      "Iğdır",
      "Yalova",
      "Karabük",
      "Kilis",
      "Osmaniye",
      "Düzce",
      "Yurt Dışı",
      "Bilinmiyor",
    ],
    []
  );

  const genders = ["Erkek", "Kadın", "Belirtilmek İstenmiyor"];
  const maritalStatuses = ["Evli", "Bekar", "Dul", "Boşanmış"];
  const educationStatuses = [
    "Okuma/Yazma Bilmiyor",
    "Okuma/Yazma Biliyor",
    "İlkokul/Ortaokul",
    "Lise",
    "Üniversite",
    "Yüksek Öğretim",
  ];
  const workStatuses = ["Emekli", "Yarı Zamanlı", "Tam Zamanlı"];
  const insurances = ["Sosyal Güvencesi Yok", "SGK", "SSK", "Özel"];
  const bloodTypes = ["A RH+", "B RH+", "AB RH+", "0 RH+", "A RH-", "B RH-", "AB RH-", "0 RH-"];
  const relationDegrees = ["1. Derece Akraba", "2. Derece Akraba", "3. Derece Akraba", "4. Derece Akraba", "Akraba Değil"];
  const mealWithOptions = ["Tek Başına", "Eşiyle", "Ailesiyle", "Bakıcısıyla", "Diğer"];

  // UI State
  const [errors, setErrors] = useState({});
  const [patientPage, setPatientPage] = useState(0);

  // Patient personal info
  const [image, setImage] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [citizenID, setCitizenID] = useState("");
  const [motherName, setMotherName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [currentRelation, setCurrentRelation] = useState("");
  const [patientHeight, setPatientHeight] = useState("");
  const [patientWeight, setPatientWeight] = useState("");
  const [patientRoom, setPatientRoom] = useState("");
  const [deviceID, setDeviceID] = useState("");
  const [bloodType, setBloodType] = useState("");

  // Education/Employment/Security
  const [education, setEducation] = useState("");
  const [workStatus, setWorkStatus] = useState("");
  const [insurance, setInsurance] = useState("");
  const [income, setIncome] = useState("");
  const [backgroundInfo, setBackgroundInfo] = useState("");

  // Contact person's personal info
  const [contactFirstname, setContactFirstname] = useState("");
  const [contactLastname, setContactLastname] = useState("");
  const [contactCitizenID, setContactCitizenID] = useState("");
  const [contactMotherName, setContactMotherName] = useState("");
  const [contactFatherName, setContactFatherName] = useState("");
  const [contactDateOfBirth, setContactDateOfBirth] = useState("");
  const [contactBirthPlace, setContactBirthPlace] = useState("");
  const [contactPatientGender, setContactPatientGender] = useState("");
  const [contactCurrentRelationship, setContactCurrentRelationship] = useState("");

  // Contact person's communication info
  const [contactRelation, setContactRelation] = useState("");
  const [contactEducation, setContactEducation] = useState("");
  const [contactWorkStatus, setContactWorkStatus] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [contactWorkAddress, setContactWorkAddress] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactApply, setContactApply] = useState("");

  // Health - Diseases & Medicines
  const [onGoingProblems, setOnGoingProblems] = useState([]);
  const [oldProblems, setOldProblems] = useState([]);
  const [doctorContacts, setDoctorContacts] = useState([]);
  const [oldMedicines, setOldMedicines] = useState([]);
  const [onGoingMedicines, setOnGoingMedicines] = useState([]);
  const [system1, setSystem1] = useState("");
  const [system2, setSystem2] = useState("");
  const [system3, setSystem3] = useState("");
  const [system4, setSystem4] = useState("");

  // Care
  const [onGoingCare, setOnGoingCare] = useState([]);
  const [oldCare, setOldCare] = useState([]);
  const [medicalState, setMedicalState] = useState([]); // devices free text tags (legacy)
  const [fallingStory, setFallingStory] = useState("");
  const [balanceState, setBalanceState] = useState("");
  // New care structured fields
  const [selectedDevices, setSelectedDevices] = useState([]); // checkboxes
  const careDevices = [
    "Oksijen Cihazı",
    "Mama Cihazı",
    "Walker/Baston",
    "Tekerlekli Sandalye",
    "Protez/Ortez",
    "İşitme cihazı",
    "Bez",
    "Yatak Malzemesi",
  ];
  const [dengeYurumeBozuklugu, setDengeYurumeBozuklugu] = useState(""); // "Var" | "Yok"
  const [needsPhysicalSupport, setNeedsPhysicalSupport] = useState(""); // "Var" | "Yok"
  const [physicalSupportDetails, setPhysicalSupportDetails] = useState("");
  const [nutritionType, setNutritionType] = useState(""); // "Oral" | "PEG" | "Diğer"
  const [nutritionOther, setNutritionOther] = useState("");
  const [specialDiet, setSpecialDiet] = useState(""); // "Evet" | "Hayır"
  const [specialDietDetails, setSpecialDietDetails] = useState("");
  const [oralEngel, setOralEngel] = useState(""); // "Evet" | "Hayır"
  const [oralEngelDetails, setOralEngelDetails] = useState("");
  const [kiloKaybi6Ay, setKiloKaybi6Ay] = useState(""); // "Evet" | "Hayır"
  const [kiloKaybiDetails, setKiloKaybiDetails] = useState("");
  const [mealsWith, setMealsWith] = useState([]); // multiple checkboxes
  const [mealsWithOther, setMealsWithOther] = useState("");
  const [mainMealsPerDay, setMainMealsPerDay] = useState("");
  const [snacksPerDay, setSnacksPerDay] = useState("");
  const [waterLitersPerDay, setWaterLitersPerDay] = useState("");
  const [doesNotConsume, setDoesNotConsume] = useState("");
  const [allergies, setAllergies] = useState("");
  const [favoriteFoods, setFavoriteFoods] = useState("");

  // Psychological tab
  const [psychIssues, setPsychIssues] = useState([]); // free text tags
  const [psychEvaluation, setPsychEvaluation] = useState("");
  const [psychiatricMedUse, setPsychiatricMedUse] = useState(""); // "Yes" | "No"
  const [psychiatricMedPrescriptionFile, setPsychiatricMedPrescriptionFile] = useState(null); // if Yes (optional)
  const [psychiatricMedNoReason, setPsychiatricMedNoReason] = useState(""); // if No
  const [depressionScale, setDepressionScale] = useState(""); // "Yes" | "No"
  const [depressionScaleFile, setDepressionScaleFile] = useState(null); // if Yes
  const [depressionScaleNoReason, setDepressionScaleNoReason] = useState(""); // if No
  const [moca, setMoca] = useState(""); // Montreal ... "Yes" | "No"
  const [mocaFile, setMocaFile] = useState(null);
  const [mocaNoReason, setMocaNoReason] = useState("");
  const [miniCog, setMiniCog] = useState(""); // "Yes" | "No"
  const [miniCogFile, setMiniCogFile] = useState(null);
  const [miniCogNoReason, setMiniCogNoReason] = useState("");
  const [socialReport, setSocialReport] = useState(""); // "Yes" | "No"
  const [socialReportFile, setSocialReportFile] = useState(null);
  const [socialReportNoReason, setSocialReportNoReason] = useState("");

  // Helpers: Validation
  const nameRegex = /^[a-zA-ZığüşöçİĞÜŞÖÇ\s'-]{2,}$/u;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateTCKN = (tckn) => {
    if (!/^\d{11}$/.test(tckn)) return false;
    if (tckn[0] === "0") return false;
    const digits = tckn.split("").map((d) => parseInt(d, 10));
    const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
    const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
    const d10 = ((oddSum * 7 - evenSum) % 10 + 10) % 10;
    const d11 = digits.slice(0, 10).reduce((a, b) => a + b, 0) % 10;
    return d10 === digits[9] && d11 === digits[10];
  };

  const isPastDate = (yyyyMmDd) => {
    if (!yyyyMmDd) return false;
    const d = new Date(yyyyMmDd + "T00:00:00");
    const today = new Date();
    d.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return d <= today && d >= new Date("1900-01-01");
  };

  const toNumberOrEmpty = (val) => {
    if (val === "" || val === null || typeof val === "undefined") return "";
    const n = Number(val);
    return Number.isFinite(n) ? n : "";
  };

  const toggleArrayItem = (arr, value) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    const newErrors = { ...errors };
    if (!file) {
      setImage(null);
      delete newErrors.image;
      setErrors(newErrors);
      return;
    }
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024;
    if (!allowed.includes(file.type)) {
      newErrors.image = "Sadece JPG, PNG veya WEBP yükleyiniz.";
    } else if (file.size > maxSize) {
      newErrors.image = "Dosya boyutu 5MB'ı geçemez.";
    } else {
      delete newErrors.image;
      setImage(file);
    }
    setErrors(newErrors);
  };

  const handleOptionalFile = (setter, key) => (e) => {
    const file = e.target.files?.[0] || null;
    const newErrors = { ...errors };
    const maxSize = 10 * 1024 * 1024;
    if (file && file.size > maxSize) {
      newErrors[key] = "Dosya boyutu 10MB'ı geçemez.";
    } else {
      delete newErrors[key];
      setter(file);
    }
    setErrors(newErrors);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Page-wise validation
  const validatePage = (page) => {
    const newErrors = {};

    // Page 0: Patient personal + education/security
    if (page === 0) {
      if (!firstname.trim()) newErrors.firstname = "Ad zorunludur.";
      else if (!nameRegex.test(firstname.trim()))
        newErrors.firstname = "Ad en az 2 karakter ve yalnızca harf/boşluk/(-) içermelidir.";

      if (!lastname.trim()) newErrors.lastname = "Soyad zorunludur.";
      else if (!nameRegex.test(lastname.trim()))
        newErrors.lastname = "Soyad en az 2 karakter ve yalnızca harf/boşluk/(-) içermelidir.";

      if (!citizenID.trim()) newErrors.citizenID = "TC Kimlik Numarası zorunludur.";
      else if (!/^\d{11}$/.test(citizenID)) newErrors.citizenID = "TC Kimlik No 11 haneli olmalıdır.";
      else if (!validateTCKN(citizenID)) newErrors.citizenID = "TC Kimlik No geçersiz.";

      if (fatherName.trim() && !nameRegex.test(fatherName.trim()))
        newErrors.fatherName = "Baba adı yalnızca harf/boşluk/(-) içermelidir (min 2).";
      if (motherName.trim() && !nameRegex.test(motherName.trim()))
        newErrors.motherName = "Anne adı yalnızca harf/boşluk/(-) içermelidir (min 2).";

      if (!dateOfBirth) newErrors.dateOfBirth = "Doğum tarihi zorunludur.";
      else if (!isPastDate(dateOfBirth)) newErrors.dateOfBirth = "Doğum tarihi geçmişte olmalıdır (1900 sonrası).";
      else {
        const birth = new Date(dateOfBirth + "T00:00:00");
        const age = (Date.now() - birth.getTime()) / (365.25 * 24 * 3600 * 1000);
        if (age <= 0 || age > 120) newErrors.dateOfBirth = "Yaş 0-120 aralığında olmalıdır.";
      }

      if (!birthPlace) newErrors.birthPlace = "Doğum yeri zorunludur.";
      else if (!provinces.includes(birthPlace)) newErrors.birthPlace = "Geçersiz doğum yeri.";

      if (!patientGender) newErrors.patientGender = "Cinsiyet zorunludur.";
      else if (!genders.includes(patientGender)) newErrors.patientGender = "Geçersiz cinsiyet.";

      if (!currentRelation) newErrors.currentRelation = "Medeni durum zorunludur.";
      else if (!maritalStatuses.includes(currentRelation)) newErrors.currentRelation = "Geçersiz medeni durum.";

      if (!education) newErrors.education = "Öğrenim durumu zorunludur.";
      else if (!educationStatuses.includes(education)) newErrors.education = "Geçersiz öğrenim durumu.";

      if (!workStatus) newErrors.workStatus = "Çalışma durumu zorunludur.";
      else if (!workStatuses.includes(workStatus)) newErrors.workStatus = "Geçersiz çalışma durumu.";

      if (!insurance) newErrors.insurance = "Sosyal güvence zorunludur.";
      else if (!insurances.includes(insurance)) newErrors.insurance = "Geçersiz sosyal güvence.";

      if (patientHeight !== "" && patientHeight !== null) {
        const h = Number(patientHeight);
        if (!Number.isFinite(h)) newErrors.patientHeight = "Geçersiz sayı.";
        else if (h < 50 || h > 250) newErrors.patientHeight = "Boy 50-250 cm aralığında olmalıdır.";
      }
      if (patientWeight !== "" && patientWeight !== null) {
        const w = Number(patientWeight);
        if (!Number.isFinite(w)) newErrors.patientWeight = "Geçersiz sayı.";
        else if (w < 2 || w > 300) newErrors.patientWeight = "Kilo 2-300 kg aralığında olmalıdır.";
      }
      if (bloodType && !bloodTypes.includes(bloodType)) newErrors.bloodType = "Geçersiz kan grubu.";

      if (income !== "" && income !== null) {
        const inc = Number(income);
        if (!Number.isFinite(inc)) newErrors.income = "Geçersiz sayı.";
        else if (inc < 0) newErrors.income = "Gelir negatif olamaz.";
        else if (inc > 1_000_000_000) newErrors.income = "Gelir çok yüksek görünüyor.";
      }
    }

    // Page 1: Contact person (personal + communication)
    if (page === 1) {
      if (!contactFirstname.trim()) newErrors.contactFirstname = "Ad zorunludur.";
      else if (!nameRegex.test(contactFirstname.trim()))
        newErrors.contactFirstname = "Ad en az 2 karakter ve yalnızca harf/boşluk/(-) içermelidir.";

      if (!contactLastname.trim()) newErrors.contactLastname = "Soyad zorunludur.";
      else if (!nameRegex.test(contactLastname.trim()))
        newErrors.contactLastname = "Soyad en az 2 karakter ve yalnızca harf/boşluk/(-) içermelidir.";

      if (!contactCitizenID.trim()) newErrors.contactCitizenID = "TC Kimlik Numarası zorunludur.";
      else if (!/^\d{11}$/.test(contactCitizenID))
        newErrors.contactCitizenID = "TC Kimlik No 11 haneli olmalıdır.";
      else if (!validateTCKN(contactCitizenID))
        newErrors.contactCitizenID = "TC Kimlik No geçersiz.";

      if (contactFatherName.trim() && !nameRegex.test(contactFatherName.trim()))
        newErrors.contactFatherName = "Baba adı yalnızca harf/boşluk/(-) içermelidir (min 2).";
      if (contactMotherName.trim() && !nameRegex.test(contactMotherName.trim()))
        newErrors.contactMotherName = "Anne adı yalnızca harf/boşluk/(-) içermelidir (min 2).";

      if (!contactDateOfBirth) newErrors.contactDateOfBirth = "Doğum tarihi zorunludur.";
      else if (!isPastDate(contactDateOfBirth))
        newErrors.contactDateOfBirth = "Doğum tarihi geçmişte olmalıdır (1900 sonrası).";

      if (!contactBirthPlace) newErrors.contactBirthPlace = "Doğum yeri zorunludur.";
      else if (!provinces.includes(contactBirthPlace))
        newErrors.contactBirthPlace = "Geçersiz doğum yeri.";

      if (!contactPatientGender) newErrors.contactPatientGender = "Cinsiyet zorunludur.";
      else if (!genders.includes(contactPatientGender))
        newErrors.contactPatientGender = "Geçersiz cinsiyet.";

      if (!contactCurrentRelationship) {
        newErrors.contactCurrentRelationship = "Medeni durum zorunludur.";
      } else if (!maritalStatuses.includes(contactCurrentRelationship)) {
        newErrors.contactCurrentRelationship = "Geçersiz medeni durum.";
      }

      if (!contactRelation) newErrors.contactRelation = "Yakınlık derecesi zorunludur.";
      else if (!relationDegrees.includes(contactRelation))
        newErrors.contactRelation = "Geçersiz yakınlık derecesi.";

      if (!contactEducation) newErrors.contactEducation = "Öğrenim durumu zorunludur.";
      else if (!educationStatuses.includes(contactEducation))
        newErrors.contactEducation = "Geçersiz öğrenim durumu.";

      // Work status (free text) optional

      // Phone: exactly 9 digits (as requested)
      if (!/^\d{9}$/.test(contactPhone)) newErrors.contactPhone = "Telefon 9 haneli olmalıdır.";

      if (contactEmail && !emailRegex.test(contactEmail)) newErrors.contactEmail = "E-posta formatı geçersiz.";
      // Addresses optional
    }

    // Page 2: Health (mostly optional, but sanity checks)
    if (page === 2) {
      const longTextLimit = 2000;
      if (system1.length > longTextLimit) newErrors.system1 = "Maksimum 2000 karakter.";
      if (system2.length > longTextLimit) newErrors.system2 = "Maksimum 2000 karakter.";
      if (system3.length > longTextLimit) newErrors.system3 = "Maksimum 2000 karakter.";
      if (system4.length > longTextLimit) newErrors.system4 = "Maksimum 2000 karakter.";
    }

    // Page 3: Care
    if (page === 3) {
      // If 'Var' -> details required
      if (needsPhysicalSupport === "Var" && !physicalSupportDetails.trim())
        newErrors.physicalSupportDetails = "Lütfen detay belirtiniz.";
      if (nutritionType === "Diğer" && !nutritionOther.trim())
        newErrors.nutritionOther = "Beslenme şeklini belirtiniz.";
      if (specialDiet === "Evet" && !specialDietDetails.trim())
        newErrors.specialDietDetails = "Diyet detayını belirtiniz.";
      if (oralEngel === "Evet" && !oralEngelDetails.trim())
        newErrors.oralEngelDetails = "Engel detayını belirtiniz.";
      if (kiloKaybi6Ay === "Evet" && !kiloKaybiDetails.trim())
        newErrors.kiloKaybiDetails = "Detay belirtiniz.";
      if (mealsWith.includes("Diğer") && !mealsWithOther.trim())
        newErrors.mealsWithOther = "Diğer alanını belirtiniz.";

      // Numbers sanity
      if (mainMealsPerDay !== "" && (!Number.isInteger(Number(mainMealsPerDay)) || Number(mainMealsPerDay) < 0 || Number(mainMealsPerDay) > 10))
        newErrors.mainMealsPerDay = "0-10 arasında tam sayı giriniz.";
      if (snacksPerDay !== "" && (!Number.isInteger(Number(snacksPerDay)) || Number(snacksPerDay) < 0 || Number(snacksPerDay) > 10))
        newErrors.snacksPerDay = "0-10 arasında tam sayı giriniz.";
      if (waterLitersPerDay !== "" && (Number(waterLitersPerDay) < 0 || Number(waterLitersPerDay) > 20))
        newErrors.waterLitersPerDay = "0-20 litre aralığında olmalıdır.";
    }

    // Page 4: Psychological
    if (page === 4) {
      // Require selection for yes/no where relevant to avoid missing info
      if (!psychiatricMedUse) newErrors.psychiatricMedUse = "Seçim yapınız.";
      if (psychiatricMedUse === "No" && psychiatricMedNoReason.length > 0 && psychiatricMedNoReason.length > 2000)
        newErrors.psychiatricMedNoReason = "Maksimum 2000 karakter.";
      if (!depressionScale) newErrors.depressionScale = "Seçim yapınız.";
      if (depressionScale === "No" && depressionScaleNoReason.length > 2000)
        newErrors.depressionScaleNoReason = "Maksimum 2000 karakter.";
      if (!moca) newErrors.moca = "Seçim yapınız.";
      if (moca === "No" && mocaNoReason.length > 2000) newErrors.mocaNoReason = "Maksimum 2000 karakter.";
      if (!miniCog) newErrors.miniCog = "Seçim yapınız.";
      if (miniCog === "No" && miniCogNoReason.length > 2000) newErrors.miniCogNoReason = "Maksimum 2000 karakter.";
      if (!socialReport) newErrors.socialReport = "Seçim yapınız.";
      if (socialReport === "No" && socialReportNoReason.length > 2000)
        newErrors.socialReportNoReason = "Maksimum 2000 karakter.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const convertOptionalFile = async (file) => {
    if (!file) return null;
    const base64 = await convertToBase64(file);
    return String(base64).replace(/^data:.*;base64,/, "");
    };

  const addPatient = async () => {
    try {
      const base64Image = image ? await convertToBase64(image) : null;
      // Optional uploads (psych tab)
      const psychPrescriptionFile64 = await convertOptionalFile(psychiatricMedPrescriptionFile);
      const depressionFile64 = await convertOptionalFile(depressionScaleFile);
      const mocaFile64 = await convertOptionalFile(mocaFile);
      const miniCogFile64 = await convertOptionalFile(miniCogFile);
      const socialReportFile64 = await convertOptionalFile(socialReportFile);

      const resp = await fetch(`${API_BASE_URL}/patients/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {'email': user.email,
                    'type': 'new',
                    'patient_personal_info': {
                        "section_1": {
                            "image": base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
                            "firstname": firstname,
                            "lastname": lastname,
                            "citizenID": citizenID,
                            "motherName": motherName,
                            "fatherName": fatherName,
                            "dateOfBirth": dateOfBirth,
                            "birthPlace": birthPlace,
                            "patientGender": patientGender,
                            "currentRelation": currentRelation,
                            "patientHeight": patientHeight,
                            "patientWeight": patientWeight,
                            "deviceID": deviceID,
                            "education": education,
                            "workStatus": workStatus,
                            "insurance": insurance,
                            "income": income,
                            "backgroundInfo": backgroundInfo,
                            "patientRoom": patientRoom,
                            "bloodType": bloodType
                        },
                        "section_2": {
                            "contactFirstname": contactFirstname,
                            "contactLastname": contactLastname,
                            "contactCitizenID": contactCitizenID,
                            "contactMotherName": contactMotherName,
                            "contactFatherName": contactFatherName,
                            "contactDateOfBirth": contactDateOfBirth,
                            "contactBirthPlace": contactBirthPlace,
                            "contactPatientGender": contactPatientGender,
                            "contactCurrentRelationship": contactCurrentRelationship,
                            "contactRelation": contactRelation,
                            "contactEducation": contactEducation,
                            "contactWorkStatus": contactWorkStatus,
                            "contactPhone": contactPhone,
                            "contactAddress": contactAddress,
                            "contactWorkAddress": contactWorkAddress,
                            "contactEmail": contactEmail,
                            "contactApply": contactApply
                        },
                        "section_3": {
                            "onGoingProblems": onGoingProblems,
                            "oldProblems": oldProblems,
                            "doctorContacts": doctorContacts,
                            "oldMedicines": oldMedicines,
                            "onGoingMedicines": onGoingMedicines,
                            "system1": system1,
                            "system2": system2,
                            "system3": system3,
                            "system4": system4,
                            "onGoingCare": onGoingCare,
                            "oldCare": oldCare,
                            "medicalState": medicalState,
                            "fallingStory": fallingStory,
                            "balanceState": balanceState,
                            "selectedDevices": selectedDevices,
                            "dengeYurumeBozuklugu": dengeYurumeBozuklugu,
                            "needsPhysicalSupport": needsPhysicalSupport,
                            "physicalSupportDetails": physicalSupportDetails,
                            "nutritionType": nutritionType,
                            "nutritionOther": nutritionOther,
                            "specialDiet": specialDiet,
                            "specialDietDetails": specialDietDetails,
                            "oralEngel": oralEngel,
                            "oralEngelDetails": oralEngelDetails,
                            "kiloKaybi6Ay": kiloKaybi6Ay,
                            "kiloKaybiDetails": kiloKaybiDetails,
                            "mealsWith": mealsWith,
                            "mealsWithOther": mealsWithOther,
                            "mainMealsPerDay": mainMealsPerDay,
                            "snacksPerDay": snacksPerDay,
                            "waterLitersPerDay": waterLitersPerDay,
                            "doesNotConsume": doesNotConsume,
                            "allergies": allergies,
                            "favoriteFoods": favoriteFoods
                        },
                        "section_4": {
                            "psychIssues": psychIssues,
                            "psychEvaluation": psychEvaluation,
                            "psychiatricMedUse": psychiatricMedUse,
                            "psychiatricMedPrescriptionFile": psychPrescriptionFile64,
                            "psychiatricMedNoReason": psychiatricMedNoReason,
                            "depressionScale": depressionScale,
                            "depressionScaleFile": depressionFile64,
                            "depressionScaleNoReason": depressionScaleNoReason,
                            "moca": moca,
                            "mocaFile": mocaFile64,
                            "mocaNoReason": mocaNoReason,
                            "miniCog": miniCog,
                            "miniCogFile": miniCogFile64,
                            "miniCogNoReason": miniCogNoReason,
                            "socialReport": socialReport,
                            "socialReportFile": socialReportFile64,
                            "socialReportNoReason": socialReportNoReason,
                        }
                }
            }),
      });
      const data = await resp.json();
      if (data.status === "success") {
        window.alert("Patient is successfully saved.");
        onCancelClick();
      } else {
        window.alert("Patient is NOT saved!");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("Patient is NOT saved!");
    }
  };

  const onAddClick = async () => {
    // Validate last page before submit
    if (!validatePage(patientPage)) return;
    await addPatient();
  };

  const onCancelClick = () => {
    setAddTab(false);
    setGeneralTab(true);
  };

  const setPatientPage0 = () => setPatientPage(0);
  const setPatientPage1 = () => setPatientPage(1);
  const setPatientPage2 = () => setPatientPage(2);
  const setPatientPage3 = () => setPatientPage(3);
  const setPatientPage4 = () => setPatientPage(4);

  const setPatientPageInc = () => {
    if (!validatePage(patientPage)) return;
    if (patientPage === 4) setPatientPage(0);
    else setPatientPage(patientPage + 1);
  };

  const setPatientPageDecr = () => {
    if (!validatePage(patientPage)) return;
    if (patientPage === 0) setPatientPage(4);
    else setPatientPage(patientPage - 1);
  };

  return (
    <div className="main-container-add-patient">
      <div className="header-add-patient">
        {patientPage === 0 ? (
          <button className="clicked">Danışan Özlük Bilgileri</button>
        ) : (
          <button onClick={setPatientPage0}>Danışan Özlük Bilgileri</button>
        )}
        {patientPage === 1 ? (
          <button className="clicked">Danışan Kontağının Özlük Bilgileri</button>
        ) : (
          <button onClick={setPatientPage1}>Danışan Kontağının Özlük Bilgileri</button>
        )}
        {patientPage === 2 ? (
          <button className="clicked">Danışan Sağlık Durumu</button>
        ) : (
          <button onClick={setPatientPage2}>Danışan Sağlık Durumu</button>
        )}
        {patientPage === 3 ? (
          <button className="clicked">Danışan Bakım Durumu</button>
        ) : (
          <button onClick={setPatientPage3}>Danışan Bakım Durumu</button>
        )}
        {patientPage === 4 ? (
          <button className="clicked">Danışanın Psikolojik Durumu</button>
        ) : (
          <button onClick={setPatientPage4}>Danışanın Psikolojik Durumu</button>
        )}
      </div>
      {patientPage === 0 ? (
        <div className="container-add-patient">
          <h1 className="page-title">Danışan Özlük Bilgileri</h1>
          <h1 className="page-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent finibus ipsum ac nibh bibendum, quis sodales orci elementum. Fusce gravida vel quam eleifend ultrices.
          </h1>

          <div className="information-block">
            <div className="photograph-container">
              <label htmlFor="file-input" className="photograph-label" style={{ cursor: "pointer" }}>
                {!image ? (
                  <div>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5168a45362de20f7f0b317084f0918f3bb13f3a77ad5e08dfd70c170e760f86?apiKey=873db62e82664057a5c151e6201a84f6&"
                      alt="addPhotographAlt"
                      className="photograph"
                    />
                    <p>Fotoğraf Ekleyiniz</p>
                  </div>
                ) : (
                  <img src={URL.createObjectURL(image)} alt="Uploaded" className="photograph" />
                )}
              </label>
              <input id="file-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
              {errors.image ? <div style={{ color: "#d32f2f", marginTop: 6 }}>{errors.image}</div> : null}
            </div>

            <h2 className="section-title">Özlük Bilgileri</h2>

            <div className="input-group">
              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.firstname}>
                  <InputLabel htmlFor="outlined-adornment-firstname">Adı</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-firstname"
                    type="text"
                    label="Adı"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  {errors.firstname ? <FormHelperText>{errors.firstname}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.lastname}>
                  <InputLabel htmlFor="outlined-adornment-lastname">Soyadı</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-lastname"
                    type="text"
                    label="Soyadı"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  {errors.lastname ? <FormHelperText>{errors.lastname}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.citizenID}>
                  <InputLabel htmlFor="outlined-adornment-citizenID">TC Kimlik Numarası</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-citizenID"
                    type="text"
                    inputMode="numeric"
                    label="TC Kimlik Numarası"
                    value={citizenID}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
                      setCitizenID(digits);
                    }}
                  />
                  {errors.citizenID ? <FormHelperText>{errors.citizenID}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.motherName}>
                  <InputLabel htmlFor="outlined-adornment-motherName">Anne Adı</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-motherName"
                    type="text"
                    label="Anne Adı"
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                  />
                  {errors.motherName ? <FormHelperText>{errors.motherName}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.fatherName}>
                  <InputLabel htmlFor="outlined-adornment-fatherName">Baba Adı</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-fatherName"
                    type="text"
                    label="Baba Adı"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                  />
                  {errors.fatherName ? <FormHelperText>{errors.fatherName}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.dateOfBirth}>
                  <InputLabel shrink htmlFor="outlined-adornment-dateOfBirth">
                    Doğum Tarihi
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-dateOfBirth"
                    type="date"
                    label="Doğum Tarihi"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                  {errors.dateOfBirth ? <FormHelperText>{errors.dateOfBirth}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.birthPlace}>
                  <InputLabel id="birthPlace-label">Doğum Yeri</InputLabel>
                  <Select
                    labelId="birthPlace-label"
                    id="outlined-adornment-birthPlace"
                    label="Doğum Yeri"
                    value={birthPlace}
                    onChange={(e) => setBirthPlace(e.target.value)}
                  >
                    {provinces.map((p) => (
                      <MenuItem key={p} value={p}>
                        {p}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.birthPlace ? <FormHelperText>{errors.birthPlace}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.patientGender}>
                  <InputLabel id="patientGender-label">Cinsiyet</InputLabel>
                  <Select
                    labelId="patientGender-label"
                    id="outlined-adornment-patientGender"
                    label="Cinsiyet"
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                  >
                    {genders.map((g) => (
                      <MenuItem key={g} value={g}>
                        {g}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.patientGender ? <FormHelperText>{errors.patientGender}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.currentRelation}>
                  <InputLabel id="currentRelation-label">Medeni Durum</InputLabel>
                  <Select
                    labelId="currentRelation-label"
                    id="outlined-adornment-currentRelation"
                    label="Medeni Durum"
                    value={currentRelation}
                    onChange={(e) => setCurrentRelation(e.target.value)}
                  >
                    {maritalStatuses.map((m) => (
                      <MenuItem key={m} value={m}>
                        {m}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.currentRelation ? <FormHelperText>{errors.currentRelation}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.patientHeight}>
                  <InputLabel htmlFor="outlined-adornment-height">Boy</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-height"
                    type="number"
                    inputProps={{ step: "0.1", min: 0 }}
                    endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                    label="Boy"
                    value={patientHeight}
                    onChange={(e) => setPatientHeight(toNumberOrEmpty(e.target.value))}
                  />
                  {errors.patientHeight ? <FormHelperText>{errors.patientHeight}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.patientWeight}>
                  <InputLabel htmlFor="outlined-adornment-weight">Kilo</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    type="number"
                    inputProps={{ step: "0.1", min: 0 }}
                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                    label="Kilo"
                    value={patientWeight}
                    onChange={(e) => setPatientWeight(toNumberOrEmpty(e.target.value))}
                  />
                  {errors.patientWeight ? <FormHelperText>{errors.patientWeight}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.bloodType}>
                  <InputLabel id="bloodType-label">Kan Grubu</InputLabel>
                  <Select
                    labelId="bloodType-label"
                    id="outlined-adornment-bloodType"
                    label="Kan Grubu"
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                  >
                    {bloodTypes.map((b) => (
                      <MenuItem key={b} value={b}>
                        {b}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.bloodType ? <FormHelperText>{errors.bloodType}</FormHelperText> : null}
                </FormControl>
              </div>
            </div>
          </div>

          <div className="divider">.</div>

          <div className="information-block">
            <h2 className="section-title">Eğitim/İş/Güvenlik Bilgileri</h2>
            <div className="input-group">
              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.education}>
                  <InputLabel id="education-label">Öğrenim Durumu</InputLabel>
                  <Select
                    labelId="education-label"
                    id="outlined-adornment-education"
                    label="Öğrenim Durumu"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  >
                    {educationStatuses.map((eStatus) => (
                      <MenuItem key={eStatus} value={eStatus}>
                        {eStatus}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.education ? <FormHelperText>{errors.education}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.workStatus}>
                  <InputLabel id="workStatus-label">Çalışma Durumu</InputLabel>
                  <Select
                    labelId="workStatus-label"
                    id="outlined-adornment-workStatus"
                    label="Çalışma Durumu"
                    value={workStatus}
                    onChange={(e) => setWorkStatus(e.target.value)}
                  >
                    {workStatuses.map((ws) => (
                      <MenuItem key={ws} value={ws}>
                        {ws}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.workStatus ? <FormHelperText>{errors.workStatus}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.insurance}>
                  <InputLabel id="insurance-label">Sosyal Güvence</InputLabel>
                  <Select
                    labelId="insurance-label"
                    id="outlined-adornment-insurance"
                    label="Sosyal Güvence"
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                  >
                    {insurances.map((ins) => (
                      <MenuItem key={ins} value={ins}>
                        {ins}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.insurance ? <FormHelperText>{errors.insurance}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.income}>
                  <InputLabel htmlFor="outlined-adornment-income">Aylık Gelir</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-income"
                    type="number"
                    inputProps={{ step: "1", min: 0 }}
                    endAdornment={<InputAdornment position="end">₺</InputAdornment>}
                    label="Aylık Gelir"
                    value={income}
                    onChange={(e) => setIncome(toNumberOrEmpty(e.target.value))}
                  />
                  {errors.income ? <FormHelperText>{errors.income}</FormHelperText> : null}
                </FormControl>
              </div>
              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.patientRoom}>
                  <InputLabel htmlFor="outlined-adornment-patientRoom">Danışan Oda Numarası</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-patientRoom"
                    label="Danışan Oda Numarası"
                    value={patientRoom}
                    onChange={(e) => setPatientRoom(e.target.value)}
                  />
                  {errors.patientRoom ? <FormHelperText>{errors.patientRoom}</FormHelperText> : null}
                </FormControl>
              </div>
            </div>
          </div>

          <div className="divider">.</div>

          <div className="information-block">
            <div className="patient-add-button-container">
              <button style={{ backgroundColor: "#E77169", float: "left" }} onClick={setPatientPageDecr}>
                Geri
              </button>
              <button style={{ backgroundColor: "#A695CC", float: "right" }} onClick={setPatientPageInc}>
                İleri
              </button>
            </div>
          </div>
        </div>
      ) : patientPage === 1 ? (
        <div className="container-add-patient">
          <h1 className="page-title">Danışan Kontağının Özlük Bilgileri</h1>
          <h1 className="page-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent finibus ipsum ac nibh bibendum, quis sodales orci elementum. Fusce gravida vel quam eleifend ultrices.
          </h1>
          <div className="information-block">
            <h2 className="section-title">Özlük Bilgileri</h2>
            <div className="input-group">
              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.contactFirstname}>
                  <InputLabel htmlFor="outlined-adornment-contactFirstname">Adı</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-contactFirstname"
                    type="text"
                    value={contactFirstname}
                    label="Adı"
                    onChange={(e) => setContactFirstname(e.target.value)}
                  />
                  {errors.contactFirstname ? <FormHelperText>{errors.contactFirstname}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.contactLastname}>
                  <InputLabel htmlFor="outlined-adornment-contactLastname">Soyadı</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-contactLastname"
                    type="text"
                    value={contactLastname}
                    label="Soyadı"
                    onChange={(e) => setContactLastname(e.target.value)}
                  />
                  {errors.contactLastname ? <FormHelperText>{errors.contactLastname}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.contactCitizenID}>
                  <InputLabel htmlFor="outlined-adornment-contactCitizenID">TC Kimlik Numarası</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-contactCitizenID"
                    type="text"
                    inputMode="numeric"
                    value={contactCitizenID}
                    label="TC Kimlik Numarası"
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
                      setContactCitizenID(digits);
                    }}
                  />
                  {errors.contactCitizenID ? <FormHelperText>{errors.contactCitizenID}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.contactMotherName}>
                  <InputLabel htmlFor="outlined-adornment-contactMotherName">Anne Adı</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-contactMotherName"
                    type="text"
                    value={contactMotherName}
                    label="Anne Adı"
                    onChange={(e) => setContactMotherName(e.target.value)}
                  />
                  {errors.contactMotherName ? <FormHelperText>{errors.contactMotherName}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.contactFatherName}>
                  <InputLabel htmlFor="outlined-adornment-contactFatherName">Baba Adı</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-contactFatherName"
                    type="text"
                    value={contactFatherName}
                    label="Baba Adı"
                    onChange={(e) => setContactFatherName(e.target.value)}
                  />
                  {errors.contactFatherName ? <FormHelperText>{errors.contactFatherName}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.contactDateOfBirth}>
                  <InputLabel shrink htmlFor="outlined-adornment-contactDateOfBirth">
                    Doğum Tarihi
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-contactDateOfBirth"
                    type="date"
                    value={contactDateOfBirth}
                    label="Doğum Tarihi"
                    onChange={(e) => setContactDateOfBirth(e.target.value)}
                  />
                  {errors.contactDateOfBirth ? <FormHelperText>{errors.contactDateOfBirth}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.contactBirthPlace}>
                  <InputLabel id="contactBirthPlace-label">Doğum Yeri</InputLabel>
                  <Select
                    labelId="contactBirthPlace-label"
                    id="outlined-adornment-contactBirthPlace"
                    label="Doğum Yeri"
                    value={contactBirthPlace}
                    onChange={(e) => setContactBirthPlace(e.target.value)}
                  >
                    {provinces.map((p) => (
                      <MenuItem key={p} value={p}>
                        {p}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.contactBirthPlace ? <FormHelperText>{errors.contactBirthPlace}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.contactPatientGender}>
                  <InputLabel id="contactPatientGender-label">Cinsiyet</InputLabel>
                  <Select
                    labelId="contactPatientGender-label"
                    id="outlined-adornment-contactPatientGender"
                    label="Cinsiyet"
                    value={contactPatientGender}
                    onChange={(e) => setContactPatientGender(e.target.value)}
                  >
                    {genders.map((g) => (
                      <MenuItem key={g} value={g}>
                        {g}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.contactPatientGender ? <FormHelperText>{errors.contactPatientGender}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.contactCurrentRelationship}>
                  <InputLabel id="contactCurrentRelationship-label">Medeni Durum</InputLabel>
                  <Select
                    labelId="contactCurrentRelationship-label"
                    id="outlined-adornment-contactCurrentRelationship"
                    label="Medeni Durum"
                    value={contactCurrentRelationship}
                    onChange={(e) => setContactCurrentRelationship(e.target.value)}
                  >
                    {maritalStatuses.map((m) => (
                      <MenuItem key={m} value={m}>
                        {m}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.contactCurrentRelationship ? <FormHelperText>{errors.contactCurrentRelationship}</FormHelperText> : null}
                </FormControl>
              </div>
            </div>
          </div>

          <div className="divider">.</div>

          <div className="information-block">
            <h2 className="section-title">İletişim Bilgileri</h2>
            <div className="input-group">
              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.contactRelation}>
                  <InputLabel id="contactRelation-label">Yakınlık Derecesi</InputLabel>
                  <Select
                    labelId="contactRelation-label"
                    id="outlined-adornment-contactRelation"
                    label="Yakınlık Derecesi"
                    value={contactRelation}
                    onChange={(e) => setContactRelation(e.target.value)}
                  >
                    {relationDegrees.map((rel) => (
                      <MenuItem key={rel} value={rel}>
                        {rel}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.contactRelation ? <FormHelperText>{errors.contactRelation}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.contactEducation}>
                  <InputLabel id="contactEducation-label">Öğrenim Durumu</InputLabel>
                  <Select
                    labelId="contactEducation-label"
                    id="outlined-adornment-contactEducation"
                    label="Öğrenim Durumu"
                    value={contactEducation}
                    onChange={(e) => setContactEducation(e.target.value)}
                  >
                    {educationStatuses.map((eStatus) => (
                      <MenuItem key={eStatus} value={eStatus}>
                        {eStatus}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.contactEducation ? <FormHelperText>{errors.contactEducation}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-contactWorkStatus">İşi</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-contactWorkStatus"
                    type="text"
                    value={contactWorkStatus}
                    label="İşi"
                    onChange={(e) => setContactWorkStatus(e.target.value)}
                  />
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.contactPhone}>
                  <InputLabel htmlFor="outlined-adornment-contactPhone">Telefon Numarası</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-contactPhone"
                    type="tel"
                    value={contactPhone}
                    label="Telefon Numarası"
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 9);
                      setContactPhone(digits);
                    }}
                    placeholder="9 hane"
                  />
                  {errors.contactPhone ? <FormHelperText>{errors.contactPhone}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-contactAddress">İkamet Adresi</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-contactAddress"
                    type="text"
                    value={contactAddress}
                    label="İkamet Adresi"
                    onChange={(e) => setContactAddress(e.target.value)}
                  />
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-contactWorkAddress">İş Adresi</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-contactWorkAddress"
                    type="text"
                    value={contactWorkAddress}
                    label="İş Adresi"
                    onChange={(e) => setContactWorkAddress(e.target.value)}
                  />
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.contactEmail}>
                  <InputLabel htmlFor="outlined-adornment-contactEmail">E-Posta Adresi</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-contactEmail"
                    type="email"
                    value={contactEmail}
                    label="E-Posta Adresi"
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                  {errors.contactEmail ? <FormHelperText>{errors.contactEmail}</FormHelperText> : null}
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel shrink htmlFor="outlined-adornment-contactApply">
                    Müracaat Tarihi
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-contactApply"
                    type="date"
                    value={contactApply}
                    label="Müracaat Tarihi"
                    onChange={(e) => setContactApply(e.target.value)}
                  />
                </FormControl>
              </div>
            </div>
          </div>

          <div className="divider">.</div>
          <div className="information-block">
            <div className="patient-add-button-container">
              <button style={{ backgroundColor: "#E77169", float: "left" }} onClick={setPatientPageDecr}>
                Geri
              </button>
              <button style={{ backgroundColor: "#A695CC", float: "right" }} onClick={setPatientPageInc}>
                İleri
              </button>
            </div>
          </div>
        </div>
      ) : patientPage === 2 ? (
        <div className="container-add-patient">
          <h1 className="page-title">Danışan Sağlık Durumu</h1>
          <h1 className="page-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent finibus ipsum ac nibh bibendum, quis sodales orci elementum. Fusce gravida vel quam eleifend ultrices.
          </h1>
          <div className="information-block">
            <h2 className="section-title">Hastalıklar & İlaçlar</h2>
            <div className="input-group-2">
              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }}>
                  <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={onGoingProblems}
                    onChange={(e, newValue) => {
                      const cleaned = Array.from(
                        new Set((newValue || []).map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean))
                      ).slice(0, 30);
                      setOnGoingProblems(cleaned);
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Devam Eden Hastalıklar"
                        placeholder=" "
                        helperText=" "
                        onPaste={(e) => {
                          const parts = e.clipboardData
                            .getData("text")
                            .split(/[,\n;]+/)
                            .map((s) => s.trim())
                            .filter(Boolean);
                          if (parts.length) {
                            e.preventDefault();
                            const next = Array.from(new Set([...(onGoingProblems || []), ...parts])).slice(0, 30);
                            setOnGoingProblems(next);
                          }
                        }}
                      />
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.stopPropagation();
                    }}
                  />
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }}>
                  <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={oldProblems}
                    onChange={(e, newValue) => {
                      const cleaned = Array.from(
                        new Set((newValue || []).map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean))
                      ).slice(0, 30);
                      setOldProblems(cleaned);
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Geçirmiş Olduğu Hastalıklar ve Operasyon Var Mı?"
                        placeholder=" "
                        helperText=" "
                        onPaste={(e) => {
                          const parts = e.clipboardData
                            .getData("text")
                            .split(/[,\n;]+/)
                            .map((s) => s.trim())
                            .filter(Boolean);
                          if (parts.length) {
                            e.preventDefault();
                            const next = Array.from(new Set([...(oldProblems || []), ...parts])).slice(0, 30);
                            setOldProblems(next);
                          }
                        }}
                      />
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.stopPropagation();
                    }}
                  />
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }}>
                  <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={doctorContacts}
                    onChange={(e, newValue) => {
                      const cleaned = Array.from(
                        new Set((newValue || []).map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean))
                      ).slice(0, 30);
                      setDoctorContacts(cleaned);
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Hastayı Tanıyan/Takip Eden Hastane-Doktor Adı ve İletişim Bilgileri Var Mı?"
                        placeholder=" "
                        helperText=" "
                        onPaste={(e) => {
                          const parts = e.clipboardData
                            .getData("text")
                            .split(/[,\n;]+/)
                            .map((s) => s.trim())
                            .filter(Boolean);
                          if (parts.length) {
                            e.preventDefault();
                            const next = Array.from(new Set([...(doctorContacts || []), ...parts])).slice(0, 30);
                            setDoctorContacts(next);
                          }
                        }}
                      />
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.stopPropagation();
                    }}
                  />
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }}>
                  <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={oldMedicines}
                    onChange={(e, newValue) => {
                      const cleaned = Array.from(
                        new Set((newValue || []).map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean))
                      ).slice(0, 30);
                      setOldMedicines(cleaned);
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Daha önce kullandığı fakat şu anda kesilen İlacı var mı?"
                        placeholder=" "
                        helperText=" "
                        onPaste={(e) => {
                          const parts = e.clipboardData
                            .getData("text")
                            .split(/[,\n;]+/)
                            .map((s) => s.trim())
                            .filter(Boolean);
                          if (parts.length) {
                            e.preventDefault();
                            const next = Array.from(new Set([...(oldMedicines || []), ...parts])).slice(0, 30);
                            setOldMedicines(next);
                          }
                        }}
                      />
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.stopPropagation();
                    }}
                  />
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }}>
                  <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={onGoingMedicines}
                    onChange={(e, newValue) => {
                      const cleaned = Array.from(
                        new Set((newValue || []).map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean))
                      ).slice(0, 30);
                      setOnGoingMedicines(cleaned);
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Kullanmakta Olduğu İlaçlar"
                        placeholder=" "
                        helperText=" "
                        onPaste={(e) => {
                          const parts = e.clipboardData
                            .getData("text")
                            .split(/[,\n;]+/)
                            .map((s) => s.trim())
                            .filter(Boolean);
                          if (parts.length) {
                            e.preventDefault();
                            const next = Array.from(new Set([...(onGoingMedicines || []), ...parts])).slice(0, 30);
                            setOnGoingMedicines(next);
                          }
                        }}
                      />
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.stopPropagation();
                    }}
                  />
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.system1}>
                  <TextField
                    label="Solunum Sistemi"
                    placeholder=" "
                    value={system1}
                    onChange={(e) => setSystem1(e.target.value)}
                    multiline
                    minRows={3}
                    error={Boolean(errors.system1)}
                    helperText={errors.system1 || " "}
                  />
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.system2}>
                  <TextField
                    label="Kardiyovasküler Sistem"
                    placeholder=" "
                    value={system2}
                    onChange={(e) => setSystem2(e.target.value)}
                    multiline
                    minRows={3}
                    error={Boolean(errors.system2)}
                    helperText={errors.system2 || " "}
                  />
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.system3}>
                  <TextField
                    label="Sindirim Sistemi"
                    placeholder=" "
                    value={system3}
                    onChange={(e) => setSystem3(e.target.value)}
                    multiline
                    minRows={3}
                    error={Boolean(errors.system3)}
                    helperText={errors.system3 || " "}
                  />
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.system4}>
                  <TextField
                    label="Genitoüriner Sistem"
                    placeholder=" "
                    value={system4}
                    onChange={(e) => setSystem4(e.target.value)}
                    multiline
                    minRows={3}
                    error={Boolean(errors.system4)}
                    helperText={errors.system4 || " "}
                  />
                </FormControl>
              </div>
            </div>
          </div>

          <div className="divider">.</div>
          <div className="information-block">
            <div className="patient-add-button-container">
              <button style={{ backgroundColor: "#E77169", float: "left" }} onClick={setPatientPageDecr}>
                Geri
              </button>
              <button style={{ backgroundColor: "#A695CC", float: "right" }} onClick={setPatientPageInc}>
                İleri
              </button>
            </div>
          </div>
        </div>
      ) : patientPage === 3 ? (
        <div className="container-add-patient">
          <h1 className="page-title">Danışan Bakım Durumu</h1>
          <h1 className="page-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent finibus ipsum ac nibh bibendum, quis sodales orci elementum. Fusce gravida vel quam eleifend ultrices.
          </h1>
          <div className="information-block">
            <h2 className="section-title">Hastalıklar & İlaçlar</h2>
            <div className="input-group-2">
              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }}>
                  <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={onGoingCare}
                    onChange={(e, newValue) => {
                      const cleaned = Array.from(
                        new Set((newValue || []).map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean))
                      ).slice(0, 30);
                      setOnGoingCare(cleaned);
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Devam Eden Bakım Durumu"
                        placeholder=" "
                        helperText=" "
                        onPaste={(e) => {
                          const parts = e.clipboardData
                            .getData("text")
                            .split(/[,\n;]+/)
                            .map((s) => s.trim())
                            .filter(Boolean);
                          if (parts.length) {
                            e.preventDefault();
                            const next = Array.from(new Set([...(onGoingCare || []), ...parts])).slice(0, 30);
                            setOnGoingCare(next);
                          }
                        }}
                      />
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.stopPropagation();
                    }}
                  />
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }}>
                  <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={oldCare}
                    onChange={(e, newValue) => {
                      const cleaned = Array.from(
                        new Set((newValue || []).map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean))
                      ).slice(0, 30);
                      setOldCare(cleaned);
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Daha önce Uygulanan fakat şu anda kesilen Bakım"
                        placeholder=" "
                        helperText=" "
                        onPaste={(e) => {
                          const parts = e.clipboardData
                            .getData("text")
                            .split(/[,\n;]+/)
                            .map((s) => s.trim())
                            .filter(Boolean);
                          if (parts.length) {
                            e.preventDefault();
                            const next = Array.from(new Set([...(oldCare || []), ...parts])).slice(0, 30);
                            setOldCare(next);
                          }
                        }}
                      />
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.stopPropagation();
                    }}
                  />
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }}>
                  <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={medicalState}
                    onChange={(e, newValue) => {
                      const cleaned = Array.from(
                        new Set((newValue || []).map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean))
                      ).slice(0, 30);
                      setMedicalState(cleaned);
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Kullanmakta Olduğu Medikal Durumlar"
                        placeholder=" "
                        helperText=" "
                        onPaste={(e) => {
                          const parts = e.clipboardData
                            .getData("text")
                            .split(/[,\n;]+/)
                            .map((s) => s.trim())
                            .filter(Boolean);
                          if (parts.length) {
                            e.preventDefault();
                            const next = Array.from(new Set([...(medicalState || []), ...parts])).slice(0, 30);
                            setMedicalState(next);
                          }
                        }}
                      />
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.stopPropagation();
                    }}
                  />
                </FormControl>
              </div>

              {/* Devices checkboxes */}
              <div className="patienceFormContainer">
                <FormControl component="fieldset" fullWidth sx={{ m: 2 }}>
                  <FormGroup row>
                    {careDevices.map((d) => (
                      <FormControlLabel
                        key={d}
                        control={
                          <Checkbox
                            checked={selectedDevices.includes(d)}
                            onChange={() => setSelectedDevices((prev) => toggleArrayItem(prev, d))}
                          />
                        }
                        label={d}
                      />
                    ))}
                  </FormGroup>
                  <FormHelperText>Kullanmakta Olduğu Medikal Cihazlar</FormHelperText>
                </FormControl>
              </div>

              {/* Düşme & Denge/Yürüme */}
              <div className="patienceFormContainer">
                <FormControl component="fieldset" fullWidth sx={{ m: 1 }}>
                  <RadioGroup
                    row
                    value={dengeYurumeBozuklugu}
                    onChange={(e) => setDengeYurumeBozuklugu(e.target.value)}
                  >
                    <FormControlLabel value="Yok" control={<Radio />} label="Denge ve Yürüme Bozukluğu Yok." />
                    <FormControlLabel value="Var" control={<Radio />} label="Denge ve Yürüme Bozukluğu Var." />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <TextField
                  fullWidth sx={{ m: 1 }}
                  label="Düşme Hikayesi"
                  placeholder=" "
                  value={fallingStory}
                  onChange={(e) => setFallingStory(e.target.value)}
                  multiline
                  minRows={3}
                  helperText="Düşme Hikayesini Anlatınız (Yoksa boş bırakınız)"
                />
              </div>

              <div className="patienceFormContainer">
                <TextField
                  fullWidth sx={{ m: 1 }}
                  label="Denge ve Yürüme Bozukluğu Detayı"
                  placeholder=" "
                  value={balanceState}
                  onChange={(e) => setBalanceState(e.target.value)}
                  multiline
                  minRows={3}
                  helperText="Denge ve Yürüme Bozukluklarını Anlatınız (Yoksa boş bırakınız)"
                />
              </div>

              {/* Physical support */}
              <div className="patienceFormContainer">
                <FormControl component="fieldset" fullWidth sx={{ m: 1 }} error={!!errors.physicalSupportDetails}>
                  <RadioGroup
                    row
                    value={needsPhysicalSupport}
                    onChange={(e) => setNeedsPhysicalSupport(e.target.value)}
                  >
                    <FormControlLabel value="Yok" control={<Radio />} label="Fiziksel Desteğe İhtiyacı Yok." />
                    <FormControlLabel
                      value="Var"
                      control={<Radio />}
                      label="Fiziksel Desteğe İhtiyacı Var. (Varsa aşağıda detaylıca anlatınız.)"
                    />
                  </RadioGroup>
                  {needsPhysicalSupport === "Var" && (
                    <TextField
                      sx={{ mt: 1 }}
                      label="Fiziksel Destek Detayı"
                      value={physicalSupportDetails}
                      onChange={(e) => setPhysicalSupportDetails(e.target.value)}
                      multiline
                      minRows={2}
                      error={!!errors.physicalSupportDetails}
                      helperText={errors.physicalSupportDetails || " "}
                    />
                  )}
                </FormControl>
              </div>

              {/* Nutrition type */}
              <div className="patienceFormContainer">
                <FormControl component="fieldset" fullWidth sx={{ m: 1 }} error={!!errors.nutritionOther}>
                  <RadioGroup row value={nutritionType} onChange={(e) => setNutritionType(e.target.value)}>
                    <FormControlLabel value="Oral" control={<Radio />} label="Oral Beslenme" />
                    <FormControlLabel value="PEG" control={<Radio />} label="PEG Beslenme" />
                    <FormControlLabel value="Diğer" control={<Radio />} label="Diğer (aşağıda detaylıca anlatınız.)" />
                  </RadioGroup>
                  {nutritionType === "Diğer" && (
                    <TextField
                      sx={{ mt: 1 }}
                      label="Diğer Beslenme Detayı"
                      value={nutritionOther}
                      onChange={(e) => setNutritionOther(e.target.value)}
                      error={!!errors.nutritionOther}
                      helperText={errors.nutritionOther || " "}
                    />
                  )}
                </FormControl>
              </div>

              {/* Special diet */}
              <div className="patienceFormContainer">
                <FormControl component="fieldset" fullWidth sx={{ m: 1 }} error={!!errors.specialDietDetails}>
                  <RadioGroup row value={specialDiet} onChange={(e) => setSpecialDiet(e.target.value)}>
                    <FormControlLabel value="Hayır" control={<Radio />} label="Özel Bir Diyet Alması Gerekiyor Mu? Hayır" />
                    <FormControlLabel
                      value="Evet"
                      control={<Radio />}
                      label="Özel Bir Diyet Alması Gerekiyor Mu? Evet (detay yazınız)"
                    />
                  </RadioGroup>
                  {specialDiet === "Evet" && (
                    <TextField
                      sx={{ mt: 1 }}
                      label="Özel Diyet Detayı"
                      value={specialDietDetails}
                      onChange={(e) => setSpecialDietDetails(e.target.value)}
                      error={!!errors.specialDietDetails}
                      helperText={errors.specialDietDetails || " "}
                    />
                  )}
                </FormControl>
              </div>

              {/* Oral feeding obstacle */}
              <div className="patienceFormContainer">
                <FormControl component="fieldset" fullWidth sx={{ m: 1 }} error={!!errors.oralEngelDetails}>
                  <RadioGroup row value={oralEngel} onChange={(e) => setOralEngel(e.target.value)}>
                    <FormControlLabel value="Hayır" control={<Radio />} label="Oral Yol İle Beslenmesine Engel Var Mı? Hayır" />
                    <FormControlLabel
                      value="Evet"
                      control={<Radio />}
                      label="Oral Yol İle Beslenmesine Engel Var Mı? Evet (detay yazınız)"
                    />
                  </RadioGroup>
                  {oralEngel === "Evet" && (
                    <TextField
                      sx={{ mt: 1 }}
                      label="Engel Detayı"
                      value={oralEngelDetails}
                      onChange={(e) => setOralEngelDetails(e.target.value)}
                      error={!!errors.oralEngelDetails}
                      helperText={errors.oralEngelDetails || " "}
                    />
                  )}
                </FormControl>
              </div>

              {/* Weight loss */}
              <div className="patienceFormContainer">
                <FormControl component="fieldset" fullWidth sx={{ m: 1 }} error={!!errors.kiloKaybiDetails}>
                  <RadioGroup row value={kiloKaybi6Ay} onChange={(e) => setKiloKaybi6Ay(e.target.value)}>
                    <FormControlLabel
                      value="Hayır"
                      control={<Radio />}
                      label="Son 6 Ayda İstem Dışı Kilo Kaybı Var Mı? Hayır"
                    />
                    <FormControlLabel
                      value="Evet"
                      control={<Radio />}
                      label="Son 6 Ayda İstem Dışı Kilo Kaybı Var Mı? Evet (detay yazınız)"
                    />
                  </RadioGroup>
                  {kiloKaybi6Ay === "Evet" && (
                    <TextField
                      sx={{ mt: 1 }}
                      label="Kilo Kaybı Detayı"
                      value={kiloKaybiDetails}
                      onChange={(e) => setKiloKaybiDetails(e.target.value)}
                      error={!!errors.kiloKaybiDetails}
                      helperText={errors.kiloKaybiDetails || " "}
                    />
                  )}
                </FormControl>
              </div>

              {/* Meals with */}
              <div className="patienceFormContainer">
                <FormControl component="fieldset" fullWidth sx={{ m: 1 }} error={!!errors.mealsWithOther}>
                  <FormGroup row>
                    {mealWithOptions.map((opt) => (
                      <FormControlLabel
                        key={opt}
                        control={
                          <Checkbox
                            checked={mealsWith.includes(opt)}
                            onChange={() => setMealsWith((prev) => toggleArrayItem(prev, opt))}
                          />
                        }
                        label={opt}
                      />
                    ))}
                  </FormGroup>
                  {mealsWith.includes("Diğer") && (
                    <TextField
                      sx={{ mt: 1 }}
                      label="Diğer (Detay)"
                      value={mealsWithOther}
                      onChange={(e) => setMealsWithOther(e.target.value)}
                      error={!!errors.mealsWithOther}
                      helperText={errors.mealsWithOther || " "}
                    />
                  )}
                </FormControl>
              </div>

              {/* Meal counts & water */}
              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.mainMealsPerDay}>
                  <TextField
                    label="Genellikle Günde Kaç Öğün Yemek Yiyor (ana öğün)"
                    type="number"
                    inputProps={{ min: 0, max: 10, step: 1 }}
                    value={mainMealsPerDay}
                    onChange={(e) => setMainMealsPerDay(e.target.value)}
                    helperText={errors.mainMealsPerDay || " "}
                    error={!!errors.mainMealsPerDay}
                  />
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.snacksPerDay}>
                  <TextField
                    label="Genellikle Günde Kaç Öğün Yemek Yiyor (ara öğün)"
                    type="number"
                    inputProps={{ min: 0, max: 10, step: 1 }}
                    value={snacksPerDay}
                    onChange={(e) => setSnacksPerDay(e.target.value)}
                    helperText={errors.snacksPerDay || " "}
                    error={!!errors.snacksPerDay}
                  />
                </FormControl>
              </div>

              <div className="patienceFormContainer">
                <FormControl fullWidth sx={{ m: 1 }} error={!!errors.waterLitersPerDay}>
                  <TextField
                    label="Genellikle Günde Kaç Litre Su İçiyor"
                    type="number"
                    inputProps={{ min: 0, max: 20, step: 0.1 }}
                    value={waterLitersPerDay}
                    onChange={(e) => setWaterLitersPerDay(e.target.value)}
                    helperText={errors.waterLitersPerDay || " "}
                    error={!!errors.waterLitersPerDay}
                  />
                </FormControl>
              </div>

              {/* Food preferences / restrictions */}
              <div className="patienceFormContainer">
                <TextField
                  fullWidth sx={{ m: 1 }}
                  label="Tüketmediği bir besin var mı?"
                  placeholder=" "
                  value={doesNotConsume}
                  onChange={(e) => setDoesNotConsume(e.target.value)}
                  multiline
                  minRows={2}
                />
              </div>
              <div className="patienceFormContainer">
                <TextField
                  fullWidth sx={{ m: 1 }}
                  label="Alerjisi olduğu bir besin var mı?"
                  placeholder=" "
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  multiline
                  minRows={2}
                />
              </div>
              <div className="patienceFormContainer">
                <TextField
                  fullWidth sx={{ m: 1 }}
                  label="Tüketmeyi Sevdiği Besinler Nelerdir?"
                  placeholder=" "
                  value={favoriteFoods}
                  onChange={(e) => setFavoriteFoods(e.target.value)}
                  multiline
                  minRows={2}
                />
              </div>
            </div>
          </div>

          <div className="divider">.</div>
          <div className="information-block">
            <div className="patient-add-button-container">
              <button style={{ backgroundColor: "#E77169", float: "left" }} onClick={setPatientPageDecr}>
                Geri
              </button>
              <button style={{ backgroundColor: "#A695CC", float: "right" }} onClick={setPatientPageInc}>
                İleri
              </button>
            </div>
          </div>
        </div>
      ) : patientPage === 4 ? (
        <div className="container-add-patient">
          <h1 className="page-title">Danışanın Psikolojik Durumu</h1>
          <h1 className="page-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent finibus ipsum ac nibh bibendum, quis sodales orci elementum.
          </h1>

          {/* Genel Psikolojik Durum */}
          <div className="information-block">
            <h2 className="section-title">Genel Psikolojik Durum</h2>
            <div className="input-group-2">
                <div className="patienceFormContainer">
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <Autocomplete
                      multiple
                      freeSolo
                      options={[]}
                      value={psychIssues}
                      onChange={(e, newValue) => {
                        const cleaned = Array.from(
                          new Set((newValue || []).map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean))
                        ).slice(0, 30);
                        setPsychIssues(cleaned);
                      }}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)
                      }
                      renderInput={(params) => <TextField {...params} label="Devam Eden Psikolojik Rahatsızlık" placeholder=" " helperText=" " />}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") e.stopPropagation();
                      }}
                    />
                  </FormControl>
                </div>

                <div className="patienceFormContainer">
                  <TextField
                    fullWidth sx={{ m: 1 }}
                    label="Danışan'ın Psikolojik Durumu ile ilgili değerlendirmenizi yazar mısınız?"
                    placeholder=" "
                    value={psychEvaluation}
                    onChange={(e) => setPsychEvaluation(e.target.value)}
                    multiline
                    minRows={3}
                  />
                </div>

                {/* Psychiatric Meds */}
                <div className="patienceFormContainer">
                  <FormControl component="fieldset" fullWidth sx={{ m: 1 }} error={!!errors.psychiatricMedUse}>
                    <RadioGroup row value={psychiatricMedUse} onChange={(e) => setPsychiatricMedUse(e.target.value)}>
                      <FormControlLabel value="Yes" control={<Radio />} label="Psikiyatrik İlaç Kullanıyor (Yes)" />
                      <FormControlLabel value="No" control={<Radio />} label="Psikiyatrik İlaç Kullanmıyor (No)" />
                    </RadioGroup>
                    {errors.psychiatricMedUse ? <FormHelperText error>{errors.psychiatricMedUse}</FormHelperText> : null}
                    {psychiatricMedUse === "Yes" ? (
                      <div style={{ marginTop: 8 }}>
                        <Button variant="outlined" component="label">
                          Reçete Yükle (opsiyonel)
                          <input type="file" hidden onChange={handleOptionalFile(setPsychiatricMedPrescriptionFile, "psychiatricMedPrescriptionFile")} />
                        </Button>
                        {errors.psychiatricMedPrescriptionFile ? (
                          <FormHelperText error>{errors.psychiatricMedPrescriptionFile}</FormHelperText>
                        ) : null}
                        {psychiatricMedPrescriptionFile ? (
                          <FormHelperText>{psychiatricMedPrescriptionFile.name}</FormHelperText>
                        ) : null}
                      </div>
                    ) : psychiatricMedUse === "No" ? (
                      <TextField
                        sx={{ mt: 1 }}
                        label="Kullanmama Sebebi (opsiyonel)"
                        value={psychiatricMedNoReason}
                        onChange={(e) => setPsychiatricMedNoReason(e.target.value)}
                      />
                    ) : null}
                  </FormControl>
                </div>
            </div>
          </div>

          {/* Ölçekler ve Raporlar */}
          <div className="information-block">
            <h2 className="section-title">Psikolojik Durum Değerlendirmeleri</h2>
            <div className="input-group-2">
                {/* Depression Scale */}
                <div className="patienceFormContainer">
                  <FormControl component="fieldset" fullWidth sx={{ m: 1 }} error={!!errors.depressionScale}>
                    <RadioGroup row value={depressionScale} onChange={(e) => setDepressionScale(e.target.value)}>
                      <FormControlLabel value="Yes" control={<Radio />} label="Depresyon Ölçeği Yapıldı (Yes)" />
                      <FormControlLabel value="No" control={<Radio />} label="Depresyon Ölçeği Yapılmadı (No)" />
                    </RadioGroup>
                    {errors.depressionScale ? <FormHelperText error>{errors.depressionScale}</FormHelperText> : null}
                    {depressionScale === "Yes" ? (
                      <div style={{ marginTop: 8 }}>
                        <Button variant="outlined" component="label">
                          Ölçek Dosyası Yükle (opsiyonel)
                          <input type="file" hidden onChange={handleOptionalFile(setDepressionScaleFile, "depressionScaleFile")} />
                        </Button>
                        {errors.depressionScaleFile ? <FormHelperText error>{errors.depressionScaleFile}</FormHelperText> : null}
                        {depressionScaleFile ? <FormHelperText>{depressionScaleFile.name}</FormHelperText> : null}
                      </div>
                    ) : depressionScale === "No" ? (
                      <TextField
                        sx={{ mt: 1 }}
                        label="Yapılmama Sebebi (opsiyonel)"
                        value={depressionScaleNoReason}
                        onChange={(e) => setDepressionScaleNoReason(e.target.value)}
                      />
                    ) : null}
                  </FormControl>
                </div>

                {/* MOCA */}
                <div className="patienceFormContainer">
                  <FormControl component="fieldset" fullWidth sx={{ m: 1 }} error={!!errors.moca}>
                    <RadioGroup row value={moca} onChange={(e) => setMoca(e.target.value)}>
                      <FormControlLabel value="Yes" control={<Radio />} label="Montreal Bilişsel Değerlendirme Ölçeği Yapıldı (Yes)" />
                      <FormControlLabel value="No" control={<Radio />} label="Montreal Bilişsel Değerlendirme Ölçeği Yapılmadı (No)" />
                    </RadioGroup>
                    {errors.moca ? <FormHelperText error>{errors.moca}</FormHelperText> : null}
                    {moca === "Yes" ? (
                      <div style={{ marginTop: 8 }}>
                        <Button variant="outlined" component="label">
                          Ölçek Dosyası Yükle (opsiyonel)
                          <input type="file" hidden onChange={handleOptionalFile(setMocaFile, "mocaFile")} />
                        </Button>
                        {errors.mocaFile ? <FormHelperText error>{errors.mocaFile}</FormHelperText> : null}
                        {mocaFile ? <FormHelperText>{mocaFile.name}</FormHelperText> : null}
                      </div>
                    ) : moca === "No" ? (
                      <TextField
                        sx={{ mt: 1 }}
                        label="Yapılmama Sebebi (opsiyonel)"
                        value={mocaNoReason}
                        onChange={(e) => setMocaNoReason(e.target.value)}
                      />
                    ) : null}
                  </FormControl>
                </div>

                {/* Mini-Cog */}
                <div className="patienceFormContainer">
              <FormControl component="fieldset" fullWidth sx={{ m: 1 }} error={!!errors.miniCog}>
                <RadioGroup row value={miniCog} onChange={(e) => setMiniCog(e.target.value)}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Mini-Cog Testi Yapıldı (Yes)" />
                  <FormControlLabel value="No" control={<Radio />} label="Mini-Cog Testi Yapılmadı (No)" />
                </RadioGroup>
                {errors.miniCog ? <FormHelperText error>{errors.miniCog}</FormHelperText> : null}
                {miniCog === "Yes" ? (
                  <div style={{ marginTop: 8 }}>
                    <Button variant="outlined" component="label">
                      Test Dosyası Yükle (opsiyonel)
                      <input type="file" hidden onChange={handleOptionalFile(setMiniCogFile, "miniCogFile")} />
                    </Button>
                    {errors.miniCogFile ? <FormHelperText error>{errors.miniCogFile}</FormHelperText> : null}
                    {miniCogFile ? <FormHelperText>{miniCogFile.name}</FormHelperText> : null}
                  </div>
                ) : miniCog === "No" ? (
                  <TextField
                    sx={{ mt: 1 }}
                    label="Yapılmama Sebebi (opsiyonel)"
                    value={miniCogNoReason}
                    onChange={(e) => setMiniCogNoReason(e.target.value)}
                  />
                ) : null}
              </FormControl>
            </div>
            </div>

          </div>

          <div className="information-block">
            <h2 className="section-title">Sosyal İnceleme Raporu</h2>
            <div className="input-group-2">

                <div className="patienceFormContainer">
              <FormControl component="fieldset" fullWidth sx={{ m: 1 }} error={!!errors.socialReport}>
                <RadioGroup row value={socialReport} onChange={(e) => setSocialReport(e.target.value)}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Sosyal İnceleme Raporu Düzenlendi (Yes)" />
                  <FormControlLabel value="No" control={<Radio />} label="Sosyal İnceleme Raporu Düzenlenmedi (No)" />
                </RadioGroup>
                {errors.socialReport ? <FormHelperText error>{errors.socialReport}</FormHelperText> : null}
                {socialReport === "Yes" ? (
                  <div style={{ marginTop: 8 }}>
                    <Button variant="outlined" component="label">
                      Rapor Dosyası Yükle (opsiyonel)
                      <input type="file" hidden onChange={handleOptionalFile(setSocialReportFile, "socialReportFile")} />
                    </Button>
                    {errors.socialReportFile ? <FormHelperText error>{errors.socialReportFile}</FormHelperText> : null}
                    {socialReportFile ? <FormHelperText>{socialReportFile.name}</FormHelperText> : null}
                  </div>
                ) : socialReport === "No" ? (
                  <TextField
                    sx={{ mt: 1 }}
                    label="Yapılmama Sebebi (opsiyonel)"
                    value={socialReportNoReason}
                    onChange={(e) => setSocialReportNoReason(e.target.value)}
                  />
                ) : null}
              </FormControl>
            </div>
            </div>

          </div>

          <div className="divider">.</div>
          <div className="information-block">
            <div className="patient-add-button-container">
              <button style={{ backgroundColor: "#E77169", float: "left" }} onClick={setPatientPageDecr}>
                Geri
              </button>
              <button style={{ backgroundColor: "#A695CC", float: "right" }} onClick={onAddClick}>
                Kaydet
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PatientAdd;