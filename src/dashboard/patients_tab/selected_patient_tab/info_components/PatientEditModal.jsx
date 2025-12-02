import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  IconButton,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Box,
  Typography,
  Divider,
  Chip,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { API_BASE_URL } from "../../../../config";
import "./patient_edit_modal.css";
import "../../patients_tab_add/patients_tab_add.css";

const PatientEditModal = ({ isOpen, onClose, selectedPatient, onSave }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Options
  const provinces = useMemo(
    () => [
      "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin",
      "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa",
      "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan",
      "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta",
      "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
      "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla",
      "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt",
      "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak",
      "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale",
      "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis",
      "Osmaniye", "Düzce", "Yurt Dışı", "Bilinmiyor",
    ],
    []
  );

  const genders = ["Erkek", "Kadın", "Belirtilmek İstenmiyor"];
  const maritalStatuses = ["Evli", "Bekar", "Dul", "Boşanmış"];
  const educationStatuses = [
    "Okuma/Yazma Bilmiyor", "Okuma/Yazma Biliyor", "İlkokul/Ortaokul",
    "Lise", "Üniversite", "Yüksek Öğretim",
  ];
  const workStatuses = ["Emekli", "Yarı Zamanlı", "Tam Zamanlı"];
  const insurances = ["Sosyal Güvencesi Yok", "SGK", "SSK", "Özel"];
  const bloodTypes = ["A RH+", "B RH+", "AB RH+", "0 RH+", "A RH-", "B RH-", "AB RH-", "0 RH-"];
  const relationDegrees = ["1. Derece Akraba", "2. Derece Akraba", "3. Derece Akraba", "4. Derece Akraba", "Akraba Değil"];
  const mealWithOptions = ["Tek Başına", "Eşiyle", "Ailesiyle", "Bakıcısıyla", "Diğer"];
  const onGoingCareOptions = ["Aktif Yaşam", "Destekli Yaşam", "Hafıza Bakımı", "Palyatif Bakım"];
  const careDevices = [
    "Oksijen Cihazı", "Mama Cihazı", "Walker/Baston", "Tekerlekli Sandalye",
    "Protez/Ortez", "İşitme cihazı", "Bez", "Yatak Malzemesi",
  ];

  // State for all form fields
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Initialize form data from selectedPatient
  useEffect(() => {
    if (selectedPatient && selectedPatient.patient_personal_info) {
      const info = selectedPatient.patient_personal_info;
      const s1 = info.section_1 || {};
      const s2 = info.section_2 || {};
      const s3 = info.section_3 || {};
      const s4 = info.section_4 || {};

      setFormData({
        // Section 1 - Personal Info (some read-only)
        image: s1.image || "",
        firstname: s1.firstname || "",
        lastname: s1.lastname || "",
        citizenID: s1.citizenID || "",
        motherName: s1.motherName || "",
        fatherName: s1.fatherName || "",
        dateOfBirth: s1.dateOfBirth || "",
        birthPlace: s1.birthPlace || "",
        patientGender: s1.patientGender || "",
        currentRelation: s1.currentRelation || "",
        patientHeight: s1.patientHeight || "",
        patientWeight: s1.patientWeight || "",
        patientRoom: s1.patientRoom ? s1.patientRoom.replace("Oda - ", "") : "",
        deviceID: s1.deviceID || "",
        education: s1.education || "",
        workStatus: s1.workStatus || "",
        insurance: s1.insurance || "",
        income: s1.income || "",
        backgroundInfo: s1.backgroundInfo || "",
        bloodType: s1.bloodType || "",

        // Section 2 - Contact Info
        contactFirstname: s2.contactFirstname || "",
        contactLastname: s2.contactLastname || "",
        contactCitizenID: s2.contactCitizenID || "",
        contactMotherName: s2.contactMotherName || "",
        contactFatherName: s2.contactFatherName || "",
        contactDateOfBirth: s2.contactDateOfBirth || "",
        contactBirthPlace: s2.contactBirthPlace || "",
        contactPatientGender: s2.contactPatientGender || "",
        contactCurrentRelationship: s2.contactCurrentRelationship || "",
        contactRelation: s2.contactRelation || "",
        contactEducation: s2.contactEducation || "",
        contactWorkStatus: s2.contactWorkStatus || "",
        contactPhone: s2.contactPhone || "",
        contactAddress: s2.contactAddress || "",
        contactWorkAddress: s2.contactWorkAddress || "",
        contactEmail: s2.contactEmail || "",
        contactApply: s2.contactApply || "",

        // Section 3 - Health & Care
        onGoingProblems: s3.onGoingProblems || [],
        oldProblems: s3.oldProblems || [],
        doctorContacts: s3.doctorContacts || [],
        oldMedicines: s3.oldMedicines || [],
        onGoingMedicines: s3.onGoingMedicines || [],
        system1: s3.system1 || "",
        system2: s3.system2 || "",
        system3: s3.system3 || "",
        system4: s3.system4 || "",
        onGoingCare: s3.onGoingCare || [],
        oldCare: s3.oldCare || [],
        medicalState: s3.medicalState || [],
        fallingStory: s3.fallingStory || "",
        balanceState: s3.balanceState || "",
        selectedDevices: s3.selectedDevices || [],
        isThereFallStory: s3.isThereFallStory || "",
        dengeYurumeBozuklugu: s3.dengeYurumeBozuklugu || "",
        needsPhysicalSupport: s3.needsPhysicalSupport || "",
        physicalSupportDetails: s3.physicalSupportDetails || "",
        nutritionType: s3.nutritionType || "",
        nutritionOther: s3.nutritionOther || "",
        specialDiet: s3.specialDiet || "",
        specialDietDetails: s3.specialDietDetails || "",
        oralEngel: s3.oralEngel || "",
        oralEngelDetails: s3.oralEngelDetails || "",
        kiloKaybi6Ay: s3.kiloKaybi6Ay || "",
        kiloKaybiDetails: s3.kiloKaybiDetails || "",
        mealsWith: s3.mealsWith || [],
        mealsWithOther: s3.mealsWithOther || "",
        mainMealsPerDay: s3.mainMealsPerDay || "",
        snacksPerDay: s3.snacksPerDay || "",
        waterLitersPerDay: s3.waterLitersPerDay || "",
        doesNotConsume: s3.doesNotConsume || "",
        allergies: s3.allergies || "",
        favoriteFoods: s3.favoriteFoods || "",

        // Section 4 - Psychological
        psychIssues: s4.psychIssues || [],
        psychEvaluation: s4.psychEvaluation || "",
        psychiatricMedUse: s4.psychiatricMedUse || "",
        psychiatricMedPrescriptionFile: s4.psychiatricMedPrescriptionFile || "",
        psychiatricMedNoReason: s4.psychiatricMedNoReason || "",
        depressionScale: s4.depressionScale || "",
        depressionScaleFile: s4.depressionScaleFile || "",
        depressionScaleNoReason: s4.depressionScaleNoReason || "",
        moca: s4.moca || "",
        mocaFile: s4.mocaFile || "",
        mocaNoReason: s4.mocaNoReason || "",
        miniCog: s4.miniCog || "",
        miniCogFile: s4.miniCogFile || "",
        miniCogNoReason: s4.miniCogNoReason || "",
        socialReport: s4.socialReport || "",
        socialReportFile: s4.socialReportFile || "",
        socialReportNoReason: s4.socialReportNoReason || "",
      });

      if (s1.image) {
        setImagePreview(`data:image/*;base64,${s1.image}`);
      }
    }
  }, [selectedPatient, isOpen]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowed.includes(file.type)) {
      setErrors(prev => ({ ...prev, image: "Sadece JPG, PNG veya WEBP yükleyiniz." }));
      return;
    }

    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, image: "Dosya boyutu 5MB'ı geçemez." }));
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.image;
      return newErrors;
    });
  };

  const handleFileDownload = (base64Data, filename) => {
    if (!base64Data || base64Data.trim() === "") {
      alert("İndirilecek dosya bulunamadı.");
      return;
    }
    try {
      // Clean and prepare base64 string
      let base64String = base64Data.trim();
      
      // Remove data URL prefix if present (e.g., "data:application/pdf;base64,")
      if (base64String.includes(",")) {
        base64String = base64String.split(",").pop();
      }
      
      // Remove any whitespace from base64 string
      base64String = base64String.replace(/\s/g, "");
      
      // Validate base64 string
      if (!base64String || base64String.length === 0) {
        alert("Geçersiz dosya verisi.");
        return;
      }
      
      // Decode base64 to binary
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      
      // Determine MIME type from filename extension
      const extension = filename.split(".").pop().toLowerCase();
      let mimeType = "application/octet-stream";
      if (extension === "pdf") {
        mimeType = "application/pdf";
      } else if (extension === "doc") {
        mimeType = "application/msword";
      } else if (extension === "docx") {
        mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      } else if (extension === "jpg" || extension === "jpeg") {
        mimeType = "image/jpeg";
      } else if (extension === "png") {
        mimeType = "image/png";
      }
      
      // Create blob and download
      const blob = new Blob([byteArray], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Dosya indirilemedi: " + error.message);
    }
  };

  const handleFileChange = (field, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, [field]: "Dosya boyutu 10MB'ı geçemez." }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.replace(/^data:.*;base64,/, "");
      handleChange(field, base64);
    };
    reader.readAsDataURL(file);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSave = async () => {
    try {
      let imageBase64 = formData.image;
      if (image) {
        const base64 = await convertToBase64(image);
        imageBase64 = base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
      }

      const patientPersonalInfo = {
        section_1: {
          image: imageBase64,
          firstname: formData.firstname,
          lastname: formData.lastname,
          citizenID: formData.citizenID,
          motherName: formData.motherName,
          fatherName: formData.fatherName,
          dateOfBirth: formData.dateOfBirth,
          birthPlace: formData.birthPlace,
          patientGender: formData.patientGender,
          currentRelation: formData.currentRelation,
          patientHeight: formData.patientHeight,
          patientWeight: formData.patientWeight,
          patientRoom: formData.patientRoom ? "Oda - " + formData.patientRoom : "",
          deviceID: formData.deviceID,
          education: formData.education,
          workStatus: formData.workStatus,
          insurance: formData.insurance,
          income: formData.income,
          backgroundInfo: formData.backgroundInfo,
          bloodType: formData.bloodType,
        },
        section_2: {
          contactFirstname: formData.contactFirstname,
          contactLastname: formData.contactLastname,
          contactCitizenID: formData.contactCitizenID,
          contactMotherName: formData.contactMotherName,
          contactFatherName: formData.contactFatherName,
          contactDateOfBirth: formData.contactDateOfBirth,
          contactBirthPlace: formData.contactBirthPlace,
          contactPatientGender: formData.contactPatientGender,
          contactCurrentRelationship: formData.contactCurrentRelationship,
          contactRelation: formData.contactRelation,
          contactEducation: formData.contactEducation,
          contactWorkStatus: formData.contactWorkStatus,
          contactPhone: formData.contactPhone,
          contactAddress: formData.contactAddress,
          contactWorkAddress: formData.contactWorkAddress,
          contactEmail: formData.contactEmail,
          contactApply: formData.contactApply,
        },
        section_3: {
          onGoingProblems: formData.onGoingProblems,
          oldProblems: formData.oldProblems,
          doctorContacts: formData.doctorContacts,
          oldMedicines: formData.oldMedicines,
          onGoingMedicines: formData.onGoingMedicines,
          system1: formData.system1,
          system2: formData.system2,
          system3: formData.system3,
          system4: formData.system4,
          onGoingCare: formData.onGoingCare,
          oldCare: formData.oldCare,
          medicalState: formData.medicalState,
          fallingStory: formData.fallingStory,
          balanceState: formData.balanceState,
          selectedDevices: formData.selectedDevices,
          isThereFallStory: formData.isThereFallStory,
          dengeYurumeBozuklugu: formData.dengeYurumeBozuklugu,
          needsPhysicalSupport: formData.needsPhysicalSupport,
          physicalSupportDetails: formData.physicalSupportDetails,
          nutritionType: formData.nutritionType,
          nutritionOther: formData.nutritionOther,
          specialDiet: formData.specialDiet,
          specialDietDetails: formData.specialDietDetails,
          oralEngel: formData.oralEngel,
          oralEngelDetails: formData.oralEngelDetails,
          kiloKaybi6Ay: formData.kiloKaybi6Ay,
          kiloKaybiDetails: formData.kiloKaybiDetails,
          mealsWith: formData.mealsWith,
          mealsWithOther: formData.mealsWithOther,
          mainMealsPerDay: formData.mainMealsPerDay,
          snacksPerDay: formData.snacksPerDay,
          waterLitersPerDay: formData.waterLitersPerDay,
          doesNotConsume: formData.doesNotConsume,
          allergies: formData.allergies,
          favoriteFoods: formData.favoriteFoods,
        },
        section_4: {
          psychIssues: formData.psychIssues,
          psychEvaluation: formData.psychEvaluation,
          psychiatricMedUse: formData.psychiatricMedUse,
          psychiatricMedPrescriptionFile: formData.psychiatricMedPrescriptionFile,
          psychiatricMedNoReason: formData.psychiatricMedNoReason,
          depressionScale: formData.depressionScale,
          depressionScaleFile: formData.depressionScaleFile,
          depressionScaleNoReason: formData.depressionScaleNoReason,
          moca: formData.moca,
          mocaFile: formData.mocaFile,
          mocaNoReason: formData.mocaNoReason,
          miniCog: formData.miniCog,
          miniCogFile: formData.miniCogFile,
          miniCogNoReason: formData.miniCogNoReason,
          socialReport: formData.socialReport,
          socialReportFile: formData.socialReportFile,
          socialReportNoReason: formData.socialReportNoReason,
        },
      };

      const response = await fetch(`${API_BASE_URL}/patients/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          type: "update_patient",
          patient_id: selectedPatient.patient_id,
          patient_personal_info: patientPersonalInfo,
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        alert("Danışan bilgileri başarıyla güncellendi.");
        onSave();
        onClose();
      } else {
        alert("Güncelleme başarısız oldu!");
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Güncelleme sırasında bir hata oluştu!");
    }
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return renderPersonalInfoPage();
      case 1:
        return renderContactInfoPage();
      case 2:
        return renderHealthPage();
      case 3:
        return renderCarePage();
      case 4:
        return renderPsychologicalPage();
      default:
        return null;
    }
  };

  const renderPersonalInfoPage = () => (
    <div className="edit-modal-page">
      <h3 className="page-title">Danışan Özlük Bilgileri</h3>
      
      <div className="information-block">
        <div className="photograph-container">
        <label htmlFor="edit-file-input" className="photograph-label" style={{ cursor: "pointer" }}>
          {imagePreview ? (
            <img src={imagePreview} alt="Patient" className="photograph" />
          ) : (
            <div>
              <p>Fotoğraf Ekleyiniz</p>
            </div>
          )}
        </label>
        <input
          id="edit-file-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        {errors.image && <div style={{ color: "#d32f2f" }}>{errors.image}</div>}
        </div>

        <h2 className="section-title">Özlük Bilgileri</h2>
        <div className="input-group">
          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Adı</InputLabel>
              <OutlinedInput
                label="Adı"
                value={formData.firstname || ""}
                disabled
                readOnly
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Soyadı</InputLabel>
              <OutlinedInput
                label="Soyadı"
                value={formData.lastname || ""}
                disabled
                readOnly
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>TC Kimlik Numarası</InputLabel>
              <OutlinedInput
                label="TC Kimlik Numarası"
                value={formData.citizenID || ""}
                disabled
                readOnly
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Anne Adı</InputLabel>
              <OutlinedInput
                label="Anne Adı"
                value={formData.motherName || ""}
                onChange={(e) => handleChange("motherName", e.target.value)}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Baba Adı</InputLabel>
              <OutlinedInput
                label="Baba Adı"
                value={formData.fatherName || ""}
                onChange={(e) => handleChange("fatherName", e.target.value)}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel shrink>Doğum Tarihi</InputLabel>
              <OutlinedInput
                type="date"
                label="Doğum Tarihi"
                value={formData.dateOfBirth || ""}
                disabled
                readOnly
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="birthPlace-label">Doğum Yeri</InputLabel>
              <Select
                labelId="birthPlace-label"
                label="Doğum Yeri"
                value={formData.birthPlace || ""}
                onChange={(e) => handleChange("birthPlace", e.target.value)}
              >
                {provinces.map((p) => (
                  <MenuItem key={p} value={p}>{p}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="patientGender-label">Cinsiyet</InputLabel>
              <Select
                labelId="patientGender-label"
                label="Cinsiyet"
                value={formData.patientGender || ""}
                onChange={(e) => handleChange("patientGender", e.target.value)}
              >
                {genders.map((g) => (
                  <MenuItem key={g} value={g}>{g}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="currentRelation-label">Medeni Durum</InputLabel>
              <Select
                labelId="currentRelation-label"
                label="Medeni Durum"
                value={formData.currentRelation || ""}
                onChange={(e) => handleChange("currentRelation", e.target.value)}
              >
                {maritalStatuses.map((m) => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Boy</InputLabel>
              <OutlinedInput
                type="number"
                label="Boy"
                value={formData.patientHeight || ""}
                onChange={(e) => handleChange("patientHeight", e.target.value)}
                endAdornment={<InputAdornment position="end">cm</InputAdornment>}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Kilo</InputLabel>
              <OutlinedInput
                type="number"
                label="Kilo"
                value={formData.patientWeight || ""}
                onChange={(e) => handleChange("patientWeight", e.target.value)}
                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="bloodType-label">Kan Grubu</InputLabel>
              <Select
                labelId="bloodType-label"
                label="Kan Grubu"
                value={formData.bloodType || ""}
                onChange={(e) => handleChange("bloodType", e.target.value)}
              >
                {bloodTypes.map((b) => (
                  <MenuItem key={b} value={b}>{b}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Oda</InputLabel>
              <OutlinedInput
                label="Oda"
                value={formData.patientRoom || ""}
                onChange={(e) => handleChange("patientRoom", e.target.value)}
                placeholder="Örn: 101"
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="education-label">Öğrenim Durumu</InputLabel>
              <Select
                labelId="education-label"
                label="Öğrenim Durumu"
                value={formData.education || ""}
                onChange={(e) => handleChange("education", e.target.value)}
              >
                {educationStatuses.map((eStatus) => (
                  <MenuItem key={eStatus} value={eStatus}>{eStatus}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="workStatus-label">Çalışma Durumu</InputLabel>
              <Select
                labelId="workStatus-label"
                label="Çalışma Durumu"
                value={formData.workStatus || ""}
                onChange={(e) => handleChange("workStatus", e.target.value)}
              >
                {workStatuses.map((w) => (
                  <MenuItem key={w} value={w}>{w}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="insurance-label">Sosyal Güvence</InputLabel>
              <Select
                labelId="insurance-label"
                label="Sosyal Güvence"
                value={formData.insurance || ""}
                onChange={(e) => handleChange("insurance", e.target.value)}
              >
                {insurances.map((i) => (
                  <MenuItem key={i} value={i}>{i}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Gelir</InputLabel>
              <OutlinedInput
                type="number"
                label="Gelir"
                value={formData.income || ""}
                onChange={(e) => handleChange("income", e.target.value)}
                endAdornment={<InputAdornment position="end">₺</InputAdornment>}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                label="Arka Plan Bilgisi"
                multiline
                minRows={3}
                value={formData.backgroundInfo || ""}
                onChange={(e) => handleChange("backgroundInfo", e.target.value)}
                placeholder=" "
                helperText=" "
              />
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactInfoPage = () => (
    <div className="edit-modal-page">
      <h3 className="page-title">Danışan Kontağının Özlük Bilgileri</h3>
      <div className="information-block">
        <h2 className="section-title">Özlük Bilgileri</h2>
        <div className="input-group">
          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Adı</InputLabel>
              <OutlinedInput
                label="Adı"
                value={formData.contactFirstname || ""}
                onChange={(e) => handleChange("contactFirstname", e.target.value)}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Soyadı</InputLabel>
              <OutlinedInput
                label="Soyadı"
                value={formData.contactLastname || ""}
                onChange={(e) => handleChange("contactLastname", e.target.value)}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>TC Kimlik Numarası</InputLabel>
              <OutlinedInput
                label="TC Kimlik Numarası"
                type="text"
                inputMode="numeric"
                value={formData.contactCitizenID || ""}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
                  handleChange("contactCitizenID", digits);
                }}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Anne Adı</InputLabel>
              <OutlinedInput
                label="Anne Adı"
                value={formData.contactMotherName || ""}
                onChange={(e) => handleChange("contactMotherName", e.target.value)}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Baba Adı</InputLabel>
              <OutlinedInput
                label="Baba Adı"
                value={formData.contactFatherName || ""}
                onChange={(e) => handleChange("contactFatherName", e.target.value)}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel shrink>Doğum Tarihi</InputLabel>
              <OutlinedInput
                type="date"
                label="Doğum Tarihi"
                value={formData.contactDateOfBirth || ""}
                onChange={(e) => handleChange("contactDateOfBirth", e.target.value)}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="contactBirthPlace-label">Doğum Yeri</InputLabel>
              <Select
                labelId="contactBirthPlace-label"
                label="Doğum Yeri"
                value={formData.contactBirthPlace || ""}
                onChange={(e) => handleChange("contactBirthPlace", e.target.value)}
              >
                {provinces.map((p) => (
                  <MenuItem key={p} value={p}>{p}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="contactPatientGender-label">Cinsiyet</InputLabel>
              <Select
                labelId="contactPatientGender-label"
                label="Cinsiyet"
                value={formData.contactPatientGender || ""}
                onChange={(e) => handleChange("contactPatientGender", e.target.value)}
              >
                {genders.map((g) => (
                  <MenuItem key={g} value={g}>{g}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="contactCurrentRelationship-label">Medeni Durum</InputLabel>
              <Select
                labelId="contactCurrentRelationship-label"
                label="Medeni Durum"
                value={formData.contactCurrentRelationship || ""}
                onChange={(e) => handleChange("contactCurrentRelationship", e.target.value)}
              >
                {maritalStatuses.map((m) => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      <div className="divider">.</div>

      <div className="information-block">
        <h2 className="section-title">İletişim Bilgileri</h2>
        <div className="input-group">
          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="contactRelation-label">Yakınlık Derecesi</InputLabel>
              <Select
                labelId="contactRelation-label"
                label="Yakınlık Derecesi"
                value={formData.contactRelation || ""}
                onChange={(e) => handleChange("contactRelation", e.target.value)}
              >
                {relationDegrees.map((r) => (
                  <MenuItem key={r} value={r}>{r}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="contactEducation-label">Öğrenim Durumu</InputLabel>
              <Select
                labelId="contactEducation-label"
                label="Öğrenim Durumu"
                value={formData.contactEducation || ""}
                onChange={(e) => handleChange("contactEducation", e.target.value)}
              >
                {educationStatuses.map((eStatus) => (
                  <MenuItem key={eStatus} value={eStatus}>{eStatus}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>İşi</InputLabel>
              <OutlinedInput
                label="İşi"
                value={formData.contactWorkStatus || ""}
                onChange={(e) => handleChange("contactWorkStatus", e.target.value)}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Telefon Numarası</InputLabel>
              <OutlinedInput
                label="Telefon Numarası"
                type="tel"
                value={formData.contactPhone || ""}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 9);
                  handleChange("contactPhone", digits);
                }}
                placeholder="9 hane"
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>İkamet Adresi</InputLabel>
              <OutlinedInput
                label="İkamet Adresi"
                value={formData.contactAddress || ""}
                onChange={(e) => handleChange("contactAddress", e.target.value)}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>İş Adresi</InputLabel>
              <OutlinedInput
                label="İş Adresi"
                value={formData.contactWorkAddress || ""}
                onChange={(e) => handleChange("contactWorkAddress", e.target.value)}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>E-Posta Adresi</InputLabel>
              <OutlinedInput
                label="E-Posta Adresi"
                type="email"
                value={formData.contactEmail || ""}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel shrink>Müracaat Tarihi</InputLabel>
              <OutlinedInput
                type="date"
                label="Müracaat Tarihi"
                value={formData.contactApply || ""}
                onChange={(e) => handleChange("contactApply", e.target.value)}
              />
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHealthPage = () => (
    <div className="edit-modal-page">
      <h3 className="page-title">Danışan Sağlık Durumu</h3>
      <div className="information-block">
        <h2 className="section-title">Hastalıklar & İlaçlar</h2>
        <div className="input-group-2">
          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.onGoingProblems || []}
                onChange={(e, newValue) => {
                  const cleaned = Array.from(
                    new Set((newValue || []).map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean))
                  ).slice(0, 30);
                  handleChange("onGoingProblems", cleaned);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} key={index} />)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Devam Eden Hastalıklar"
                    placeholder=" "
                    helperText=" "
                  />
                )}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.oldProblems || []}
                onChange={(e, newValue) => {
                  const cleaned = Array.from(
                    new Set((newValue || []).map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean))
                  ).slice(0, 30);
                  handleChange("oldProblems", cleaned);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} key={index} />)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Geçirmiş Olduğu Hastalıklar ve Operasyon Var Mı?"
                    placeholder=" "
                    helperText=" "
                  />
                )}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.doctorContacts || []}
                onChange={(e, newValue) => {
                  const cleaned = Array.from(
                    new Set((newValue || []).map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean))
                  ).slice(0, 30);
                  handleChange("doctorContacts", cleaned);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} key={index} />)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Hastayı Tanıyan/Takip Eden Hastane-Doktor Adı ve İletişim Bilgileri Var Mı?"
                    placeholder=" "
                    helperText=" "
                  />
                )}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.oldMedicines || []}
                onChange={(e, newValue) => {
                  const cleaned = Array.from(
                    new Set((newValue || []).map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean))
                  ).slice(0, 30);
                  handleChange("oldMedicines", cleaned);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} key={index} />)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Daha Önce Kullandığı İlaçlar"
                    placeholder=" "
                    helperText=" "
                  />
                )}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.onGoingMedicines || []}
                onChange={(e, newValue) => {
                  const cleaned = Array.from(
                    new Set((newValue || []).map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean))
                  ).slice(0, 30);
                  handleChange("onGoingMedicines", cleaned);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} key={index} />)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Şu Anda Kullandığı İlaçlar"
                    placeholder=" "
                    helperText=" "
                  />
                )}
              />
            </FormControl>
          </div>
        </div>
      </div>

      <div className="divider">.</div>

      <div className="information-block">
        <h2 className="section-title">Sistemler</h2>
        <div className="input-group">
          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                label="Kardiyovasküler Sistem"
                multiline
                minRows={3}
                value={formData.system1 || ""}
                onChange={(e) => handleChange("system1", e.target.value)}
                placeholder=" "
                helperText=" "
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                label="Solunum Sistemi"
                multiline
                minRows={3}
                value={formData.system2 || ""}
                onChange={(e) => handleChange("system2", e.target.value)}
                placeholder=" "
                helperText=" "
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                label="Sindirim Sistemi"
                multiline
                minRows={3}
                value={formData.system3 || ""}
                onChange={(e) => handleChange("system3", e.target.value)}
                placeholder=" "
                helperText=" "
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                label="Genitoüriner Sistem"
                multiline
                minRows={3}
                value={formData.system4 || ""}
                onChange={(e) => handleChange("system4", e.target.value)}
                placeholder=" "
                helperText=" "
              />
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCarePage = () => (
    <div className="edit-modal-page">
      <h3 className="page-title">Danışan Bakım Durumu</h3>
      
      <div className="information-block">
        <h2 className="section-title">Hastalıklar & İlaçlar</h2>
        <div className="input-group-2">
          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <Autocomplete
                multiple
                options={onGoingCareOptions}
                value={formData.onGoingCare || []}
                onChange={(e, newValue) => {
                  handleChange("onGoingCare", newValue || []);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} key={index} />)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Devam Eden Bakım Durumu"
                    placeholder=" "
                    helperText=" "
                  />
                )}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.oldCare || []}
                onChange={(e, newValue) => {
                  const cleaned = Array.from(
                    new Set((newValue || []).map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean))
                  ).slice(0, 30);
                  handleChange("oldCare", cleaned);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} key={index} />)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Daha önce uygulanan fakat şu anda kesilen bir bakım uygulaması var mı?"
                    placeholder=" "
                    helperText=" "
                  />
                )}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth sx={{ m: 1 }}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.medicalState || []}
                onChange={(e, newValue) => {
                  const cleaned = Array.from(
                    new Set((newValue || []).map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean))
                  ).slice(0, 30);
                  handleChange("medicalState", cleaned);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} key={index} />)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Kullanmakta Olduğu Medikal Durumlar"
                    placeholder=" "
                    helperText=" "
                  />
                )}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormHelperText>Kullanmakta Olduğu Medikal Cihazlar</FormHelperText>
            <FormControl component="fieldset" fullWidth sx={{ m: 2 }}>
              <FormGroup row>
                {careDevices.map((d) => (
                  <FormControlLabel
                    key={d}
                    control={
                      <Checkbox
                        checked={formData.selectedDevices?.includes(d) || false}
                        onChange={(e) => {
                          const devices = formData.selectedDevices || [];
                          if (e.target.checked) {
                            handleChange("selectedDevices", [...devices, d]);
                          } else {
                            handleChange("selectedDevices", devices.filter(device => device !== d));
                          }
                        }}
                      />
                    }
                    label={d}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormHelperText>Düşme Hikayesi Var Mı?</FormHelperText>
            <FormControl component="fieldset" fullWidth sx={{ m: 1 }}>
              <RadioGroup
                row
                value={formData.isThereFallStory || ""}
                onChange={(e) => handleChange("isThereFallStory", e.target.value)}
              >
                <FormControlLabel value="Hayır" control={<Radio />} label="Hayır" />
                <FormControlLabel value="Evet" control={<Radio />} label="Evet (detay yazınız)" />
              </RadioGroup>
              {formData.isThereFallStory === "Evet" && (
                <TextField
                  fullWidth
                  sx={{ m: 1 }}
                  label="Düşme Hikayesi"
                  placeholder=" "
                  value={formData.fallingStory || ""}
                  onChange={(e) => handleChange("fallingStory", e.target.value)}
                  multiline
                  minRows={3}
                  helperText=" "
                />
              )}
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormHelperText>Denge ve Yürüme Bozukluğu Var Mı?</FormHelperText>
            <FormControl component="fieldset" fullWidth sx={{ m: 1 }}>
              <RadioGroup
                row
                value={formData.dengeYurumeBozuklugu || ""}
                onChange={(e) => handleChange("dengeYurumeBozuklugu", e.target.value)}
              >
                <FormControlLabel value="Hayır" control={<Radio />} label="Hayır" />
                <FormControlLabel value="Evet" control={<Radio />} label="Evet (detay yazınız)" />
              </RadioGroup>
              {formData.dengeYurumeBozuklugu === "Evet" && (
                <TextField
                  fullWidth
                  sx={{ m: 1 }}
                  label="Denge ve Yürüme Bozukluğu Detayı"
                  placeholder=" "
                  value={formData.balanceState || ""}
                  onChange={(e) => handleChange("balanceState", e.target.value)}
                  multiline
                  minRows={3}
                  helperText=" "
                />
              )}
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormHelperText>Fiziksel Desteğe İhtiyacı Var Mı?</FormHelperText>
            <FormControl component="fieldset" fullWidth sx={{ m: 1 }}>
              <RadioGroup
                row
                value={formData.needsPhysicalSupport || ""}
                onChange={(e) => handleChange("needsPhysicalSupport", e.target.value)}
              >
                <FormControlLabel value="Hayır" control={<Radio />} label="Hayır" />
                <FormControlLabel value="Evet" control={<Radio />} label="Evet (detay yazınız)" />
              </RadioGroup>
              {formData.needsPhysicalSupport === "Evet" && (
                <TextField
                  sx={{ mt: 1 }}
                  fullWidth
                  label="Fiziksel Destek Detayı"
                  value={formData.physicalSupportDetails || ""}
                  onChange={(e) => handleChange("physicalSupportDetails", e.target.value)}
                  multiline
                  minRows={2}
                  helperText=" "
                />
              )}
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormHelperText>Beslenme Şekli Nedir?</FormHelperText>
            <FormControl component="fieldset" fullWidth sx={{ m: 1 }}>
              <RadioGroup row value={formData.nutritionType || ""} onChange={(e) => handleChange("nutritionType", e.target.value)}>
                <FormControlLabel value="Oral" control={<Radio />} label="Oral Beslenme" />
                <FormControlLabel value="PEG" control={<Radio />} label="PEG Beslenme" />
                <FormControlLabel value="Diğer" control={<Radio />} label="Diğer (aşağıda detaylıca anlatınız.)" />
              </RadioGroup>
              {formData.nutritionType === "Diğer" && (
                <TextField
                  sx={{ mt: 1 }}
                  fullWidth
                  label="Diğer Beslenme Detayı"
                  value={formData.nutritionOther || ""}
                  onChange={(e) => handleChange("nutritionOther", e.target.value)}
                  helperText=" "
                />
              )}
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormHelperText>Özel Bir Diyet Alması Gerekiyor Mu?</FormHelperText>
            <FormControl component="fieldset" fullWidth sx={{ m: 1 }}>
              <RadioGroup row value={formData.specialDiet || ""} onChange={(e) => handleChange("specialDiet", e.target.value)}>
                <FormControlLabel value="Hayır" control={<Radio />} label="Hayır" />
                <FormControlLabel value="Evet" control={<Radio />} label="Evet (detay yazınız)" />
              </RadioGroup>
              {formData.specialDiet === "Evet" && (
                <TextField
                  sx={{ mt: 1 }}
                  fullWidth
                  label="Özel Diyet Detayı"
                  value={formData.specialDietDetails || ""}
                  onChange={(e) => handleChange("specialDietDetails", e.target.value)}
                  helperText=" "
                />
              )}
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormHelperText>Oral Yol İle Beslenmesine Engel Var Mı?</FormHelperText>
            <FormControl component="fieldset" fullWidth sx={{ m: 1 }}>
              <RadioGroup row value={formData.oralEngel || ""} onChange={(e) => handleChange("oralEngel", e.target.value)}>
                <FormControlLabel value="Hayır" control={<Radio />} label="Hayır" />
                <FormControlLabel value="Evet" control={<Radio />} label="Evet (detay yazınız)" />
              </RadioGroup>
              {formData.oralEngel === "Evet" && (
                <TextField
                  sx={{ mt: 1 }}
                  fullWidth
                  label="Engel Detayı"
                  value={formData.oralEngelDetails || ""}
                  onChange={(e) => handleChange("oralEngelDetails", e.target.value)}
                  helperText=" "
                />
              )}
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormHelperText>Son 6 Ayda İstem Dışı Kilo Kaybı Var Mı?</FormHelperText>
            <FormControl component="fieldset" fullWidth sx={{ m: 1 }}>
              <RadioGroup row value={formData.kiloKaybi6Ay || ""} onChange={(e) => handleChange("kiloKaybi6Ay", e.target.value)}>
                <FormControlLabel value="Hayır" control={<Radio />} label="Hayır" />
                <FormControlLabel value="Evet" control={<Radio />} label="Evet (detay yazınız)" />
              </RadioGroup>
              {formData.kiloKaybi6Ay === "Evet" && (
                <TextField
                  sx={{ mt: 1 }}
                  fullWidth
                  label="Kilo Kaybı Detayı"
                  value={formData.kiloKaybiDetails || ""}
                  onChange={(e) => handleChange("kiloKaybiDetails", e.target.value)}
                  helperText=" "
                />
              )}
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormHelperText>Kiminle birlikte yaşıyordu?</FormHelperText>
            <FormControl component="fieldset" fullWidth sx={{ m: 1 }}>
              <FormGroup row>
                {mealWithOptions.map((opt) => (
                  <FormControlLabel
                    key={opt}
                    control={
                      <Checkbox
                        checked={formData.mealsWith?.includes(opt) || false}
                        onChange={(e) => {
                          const meals = formData.mealsWith || [];
                          if (e.target.checked) {
                            handleChange("mealsWith", [...meals, opt]);
                          } else {
                            handleChange("mealsWith", meals.filter(m => m !== opt));
                          }
                        }}
                      />
                    }
                    label={opt}
                  />
                ))}
              </FormGroup>
              {formData.mealsWith?.includes("Diğer") && (
                <TextField
                  sx={{ mt: 1 }}
                  fullWidth
                  label="Diğer (Detay)"
                  value={formData.mealsWithOther || ""}
                  onChange={(e) => handleChange("mealsWithOther", e.target.value)}
                  helperText=" "
                />
              )}
            </FormControl>
          </div>

          <div className="divider">.</div>

          <div className="patienceFormContainer">
            <FormControl fullWidth>
              <TextField
                fullWidth
                sx={{ m: 1 }}
                label="Genellikle Günde Kaç Öğün Yemek Yiyor (ana öğün)"
                type="number"
                inputProps={{ min: 0, max: 10, step: 1 }}
                value={formData.mainMealsPerDay || ""}
                onChange={(e) => handleChange("mainMealsPerDay", e.target.value)}
                helperText=" "
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth>
              <TextField
                fullWidth
                sx={{ m: 1 }}
                label="Genellikle Günde Kaç Öğün Yemek Yiyor (ara öğün)"
                type="number"
                inputProps={{ min: 0, max: 10, step: 1 }}
                value={formData.snacksPerDay || ""}
                onChange={(e) => handleChange("snacksPerDay", e.target.value)}
                helperText=" "
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth>
              <TextField
                fullWidth
                sx={{ m: 1 }}
                label="Genellikle Günde Kaç Litre Su İçiyor"
                type="number"
                inputProps={{ min: 0, max: 20, step: 0.1 }}
                value={formData.waterLitersPerDay || ""}
                onChange={(e) => handleChange("waterLitersPerDay", e.target.value)}
                helperText=" "
              />
            </FormControl>
          </div>

          <div className="divider">.</div>

          <div className="patienceFormContainer">
            <FormControl fullWidth>
              <TextField
                fullWidth
                sx={{ m: 1 }}
                label="Tüketmediği bir besin var mı?"
                placeholder=" "
                value={formData.doesNotConsume || ""}
                onChange={(e) => handleChange("doesNotConsume", e.target.value)}
                multiline
                minRows={2}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth>
              <TextField
                fullWidth
                sx={{ m: 1 }}
                label="Alerjisi olduğu bir besin var mı?"
                placeholder=" "
                value={formData.allergies || ""}
                onChange={(e) => handleChange("allergies", e.target.value)}
                multiline
                minRows={2}
              />
            </FormControl>
          </div>

          <div className="patienceFormContainer">
            <FormControl fullWidth>
              <TextField
                fullWidth
                sx={{ m: 1 }}
                label="Tüketmeyi Sevdiği Besinler Nelerdir?"
                placeholder=" "
                value={formData.favoriteFoods || ""}
                onChange={(e) => handleChange("favoriteFoods", e.target.value)}
                multiline
                minRows={2}
              />
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPsychologicalPage = () => (
    <div className="edit-modal-page">
      <h3 className="page-title">Danışanın Psikolojik Durumu</h3>
      <div className="input-group">
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="psychiatricMedUse-label">Psikiyatrik İlaç Kullanımı</InputLabel>
          <Select
            labelId="psychiatricMedUse-label"
            label="Psikiyatrik İlaç Kullanımı"
            value={formData.psychiatricMedUse || ""}
            onChange={(e) => handleChange("psychiatricMedUse", e.target.value)}
          >
            <MenuItem value="Yes">Evet</MenuItem>
            <MenuItem value="No">Hayır</MenuItem>
          </Select>
        </FormControl>

        {formData.psychiatricMedUse === "Yes" && (
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel shrink>Reçete Dosyası</InputLabel>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
              {formData.psychiatricMedPrescriptionFile && formData.psychiatricMedPrescriptionFile.trim() !== "" && (
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleFileDownload(formData.psychiatricMedPrescriptionFile, "psychiatric_prescription.pdf")}
                  sx={{ fontFamily: "RedHatDisplay", textTransform: "none" }}
                >
                  Mevcut Dosya
                </Button>
              )}
              <Button
                variant="outlined"
                component="label"
                sx={{ fontFamily: "RedHatDisplay", textTransform: "none" }}
              >
                {formData.psychiatricMedPrescriptionFile && formData.psychiatricMedPrescriptionFile.trim() !== "" ? "Değiştir" : "Dosya Seç"}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange("psychiatricMedPrescriptionFile", e)}
                  hidden
                />
              </Button>
            </Box>
          </FormControl>
        )}

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="depressionScale-label">Depresyon Ölçeği</InputLabel>
          <Select
            labelId="depressionScale-label"
            label="Depresyon Ölçeği"
            value={formData.depressionScale || ""}
            onChange={(e) => handleChange("depressionScale", e.target.value)}
          >
            <MenuItem value="Yes">Evet</MenuItem>
            <MenuItem value="No">Hayır</MenuItem>
          </Select>
        </FormControl>

        {formData.depressionScale === "Yes" && (
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel shrink>Depresyon Ölçeği Dosyası</InputLabel>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
              {formData.depressionScaleFile && formData.depressionScaleFile.trim() !== "" && (
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleFileDownload(formData.depressionScaleFile, "depression_scale.pdf")}
                  sx={{ fontFamily: "RedHatDisplay", textTransform: "none" }}
                >
                  Mevcut Dosya
                </Button>
              )}
              <Button
                variant="outlined"
                component="label"
                sx={{ fontFamily: "RedHatDisplay", textTransform: "none" }}
              >
                {formData.depressionScaleFile && formData.depressionScaleFile.trim() !== "" ? "Değiştir" : "Dosya Seç"}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange("depressionScaleFile", e)}
                  hidden
                />
              </Button>
            </Box>
          </FormControl>
        )}

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="moca-label">MOCA</InputLabel>
          <Select
            labelId="moca-label"
            label="MOCA"
            value={formData.moca || ""}
            onChange={(e) => handleChange("moca", e.target.value)}
          >
            <MenuItem value="Yes">Evet</MenuItem>
            <MenuItem value="No">Hayır</MenuItem>
          </Select>
        </FormControl>

        {formData.moca === "Yes" && (
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel shrink>MOCA Dosyası</InputLabel>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
              {formData.mocaFile && formData.mocaFile.trim() !== "" && (
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleFileDownload(formData.mocaFile, "moca.pdf")}
                  sx={{ fontFamily: "RedHatDisplay", textTransform: "none" }}
                >
                  Mevcut Dosya
                </Button>
              )}
              <Button
                variant="outlined"
                component="label"
                sx={{ fontFamily: "RedHatDisplay", textTransform: "none" }}
              >
                {formData.mocaFile && formData.mocaFile.trim() !== "" ? "Değiştir" : "Dosya Seç"}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange("mocaFile", e)}
                  hidden
                />
              </Button>
            </Box>
          </FormControl>
        )}

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="miniCog-label">Mini-Cog</InputLabel>
          <Select
            labelId="miniCog-label"
            label="Mini-Cog"
            value={formData.miniCog || ""}
            onChange={(e) => handleChange("miniCog", e.target.value)}
          >
            <MenuItem value="Yes">Evet</MenuItem>
            <MenuItem value="No">Hayır</MenuItem>
          </Select>
        </FormControl>

        {formData.miniCog === "Yes" && (
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel shrink>Mini-Cog Dosyası</InputLabel>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
              {formData.miniCogFile && formData.miniCogFile.trim() !== "" && (
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleFileDownload(formData.miniCogFile, "mini_cog.pdf")}
                  sx={{ fontFamily: "RedHatDisplay", textTransform: "none" }}
                >
                  Mevcut Dosya
                </Button>
              )}
              <Button
                variant="outlined"
                component="label"
                sx={{ fontFamily: "RedHatDisplay", textTransform: "none" }}
              >
                {formData.miniCogFile && formData.miniCogFile.trim() !== "" ? "Değiştir" : "Dosya Seç"}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange("miniCogFile", e)}
                  hidden
                />
              </Button>
            </Box>
          </FormControl>
        )}

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="socialReport-label">Sosyal Rapor</InputLabel>
          <Select
            labelId="socialReport-label"
            label="Sosyal Rapor"
            value={formData.socialReport || ""}
            onChange={(e) => handleChange("socialReport", e.target.value)}
          >
            <MenuItem value="Yes">Evet</MenuItem>
            <MenuItem value="No">Hayır</MenuItem>
          </Select>
        </FormControl>

        {formData.socialReport === "Yes" && (
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel shrink>Sosyal Rapor Dosyası</InputLabel>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
              {formData.socialReportFile && formData.socialReportFile.trim() !== "" && (
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleFileDownload(formData.socialReportFile, "social_report.pdf")}
                  sx={{ fontFamily: "RedHatDisplay", textTransform: "none" }}
                >
                  Mevcut Dosya
                </Button>
              )}
              <Button
                variant="outlined"
                component="label"
                sx={{ fontFamily: "RedHatDisplay", textTransform: "none" }}
              >
                {formData.socialReportFile && formData.socialReportFile.trim() !== "" ? "Değiştir" : "Dosya Seç"}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange("socialReportFile", e)}
                  hidden
                />
              </Button>
            </Box>
          </FormControl>
        )}
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "24px",
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontFamily: "RedHatDisplay", fontWeight: 700 }}>
          Danışan Bilgilerini Düzenle
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ maxHeight: "60vh", overflowY: "auto" }}>
        <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
          {[0, 1, 2, 3, 4].map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "contained" : "outlined"}
              onClick={() => setCurrentPage(page)}
              sx={{
                fontFamily: "RedHatDisplay",
                textTransform: "none",
                backgroundColor: currentPage === page ? "#A695CC" : "transparent",
                color: currentPage === page ? "#FFFFFF" : "#A695CC",
                borderColor: "#A695CC",
                "&:hover": {
                  backgroundColor: currentPage === page ? "#8B7BA8" : "rgba(166, 149, 204, 0.1)",
                },
              }}
            >
              {page === 0 && "Özlük Bilgileri"}
              {page === 1 && "İletişim Bilgileri"}
              {page === 2 && "Sağlık Durumu"}
              {page === 3 && "Bakım Durumu"}
              {page === 4 && "Psikolojik Durum"}
            </Button>
          ))}
        </Box>

        {renderPageContent()}
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: "1px solid #E0E0E0" }}>
        <Button
          onClick={onClose}
          sx={{
            fontFamily: "RedHatDisplay",
            textTransform: "none",
            color: "#343738",
          }}
        >
          İptal
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            fontFamily: "RedHatDisplay",
            textTransform: "none",
            backgroundColor: "#A695CC",
            "&:hover": {
              backgroundColor: "#8B7BA8",
            },
          }}
        >
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientEditModal;

