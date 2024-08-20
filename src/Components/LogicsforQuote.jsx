import React, { useState } from "react";

const LogicsforQuote = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    customerType: "",
    name: "",
    address: {
      houseNumber: "",
      street: "",
      city: "",
      state: "",
      pinCode: "",
    },
    typeofRoof: {
      concrete: "",
      tinShade: "",
      others: "",
    },
    typeofOrganization: {
      schools: "",
      factories: "",
      petrolPumps: "",
      hospitals: "",
      others: "",
    },
    load: "",
    phone: "",
    email: "",
    length: "",
    breadth: "",
    sft: "",
    connectionType: "",
    subsidy: "",
    sanctionLoad: "",
    consumption: "",
    loadName: "",
    operation: "",
    capacity: "",
    equipmentName: "",
    equipments: "",
    electricityConnectivity: "",
    roofLength: "",
    roofBreadth: "",
    file: null,
    floorNumber: "",
    roofLayout: null,
    video: null,
    image: null,
    gstCertificate: null,
    identityProof: null,
    electricityBill: null,
    location: "",
  });
  // const handleBack = () => {
  //   if (step === 0) {
  //     return; // If step is already 0, do nothing
  //   }

  //   if (formData.customerType === "Commercial" && step > 1 && step <= 10) {
  //     setStep((prevStep) => Math.max(prevStep - 1, 0)); // Ensure step does not go below 0
  //   } else if (
  //     formData.customerType === "Residential" &&
  //     step > 11 &&
  //     step <= 36
  //   ) {
  //     setStep((prevStep) => (prevStep > 11 ? prevStep - 1 : 0)); // If step is greater than 11, decrement, else set to 0
  //   } else if (step > 14 && step <= 29) {
  //     setStep((prevStep) => (prevStep > 14 ? prevStep - 1 : 0)); // If step is greater than 14, decrement, else set to 0
  //   } else if (step > 29 && step <= 36) {
  //     setStep((prevStep) => (prevStep > 29 ? prevStep - 1 : 0)); // If step is greater than 29, decrement, else set to 0
  //   } else {
  //     setStep(0);
  //   }
  // };

  const handleBack = () => {
    if (step === 0) {
      return; // Do nothing if already at step 0
    }

    if (step === 19 || step === 21) {
      setStep(step - 1); // Go back to the previous step (18 or 20)
    } else if (step === 18 || step === 20) {
      setStep(17); // Go back to step 17 (Roof Rights toggle)
    } else if (step === 17) {
      setStep(16); // Go back to the step before Roof Rights
    } else {
      setStep((prevStep) => prevStep - 1); // Otherwise, go back by one step
    }
  };

  const validateStep = () => {
    switch (step) {
      case 1:
      case 11:
        return (
          formData.name.trim() !== "" &&
          formData.phone.trim() !== "" &&
          formData.email.trim() !== ""
        );
      case 2:
      case 12:
        return (
          formData.address.houseNumber.trim() !== "" &&
          formData.address.street.trim() !== "" &&
          formData.address.city.trim() !== "" &&
          formData.address.pinCode.trim() !== "" &&
          formData.address.state.trim() !== ""
        );

      case 3:
        return Object.values(formData.typeofOrganization).some(
          (value) => value.trim() !== ""
        );

      case 4:
      case 15:
      case 22:
        return (
          formData.load.trim() !== "" && formData.consumption.trim() !== ""
        );
      case 5:
      case 8:
        return (
          (formData.typeofRoof.concrete ||
            formData.typeofRoof.tinShade ||
            formData.typeofRoof.others) &&
          formData.length.trim() !== "" &&
          formData.breadth.trim() !== "" &&
          formData.sft.trim() !== ""
        );
      case 6:
      case 9:
        return (
          formData.roofLayout ||
          formData.video ||
          formData.image ||
          formData.electricityBill ||
          formData.gstCertificate ||
          formData.identityProof
        );
      case 18:
      case 20:
      case 25:
      case 27:
      case 32:
      case 35:
        return (
          formData.roofLayout ||
          formData.video ||
          formData.image ||
          formData.electricityBill ||
          formData.gstCertificate ||
          formData.identityProof
        );
      case 7:
      case 10:
      case 19:
      case 21:
      case 26:
      case 28:
      case 33:
      case 36:
        return (
          formData.capacity.trim() !== "" && formData.location.trim() !== ""
        );

      case 16:
      case 23:
      case 31:
      case 34:
        return (
          formData.length &&
          formData.length !== "" &&
          formData.breadth &&
          formData.breadth !== "" &&
          formData.sft &&
          formData.sft !== "" &&
          formData.file
        );
      case 17:
      case 24:
        return formData.floorNumber !== "";
      case 29:
        return (
          formData.equipmentName.trim() !== "" &&
          formData.capacity.trim() !== "" &&
          formData.operation.trim() !== "" &&
          formData.equipments.trim() !== ""
        );

      default:
        return true;
    }
  };

  const handleNext = ({ roofRights }) => {
    if (validateStep()) {
      setStep((prevStep) => {
        // If the current step is 17, decide the next step based on `roofRights`
        if (prevStep === 17) {
          return roofRights ? 18 : 20;
        }
        // Otherwise, increment the step as usual
        return prevStep + 1;
      });
    }
  };
  const handleOrganizationTypeChange = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      typeofOrganization: type,
    }));
  };
  const handleRoofTypeChange = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      typeofRoof: {
        ...prevData.typeofRoof,
        [type]: prevData.typeofRoof[type] === type ? "" : type,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const changeHandle = (e, fileType) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      [fileType]: file,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file: file,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setIsSubmitted(true); // Update state to show the "Thank You" page
  };

  const isLastStep = [7, 10, 19, 21, 26, 28, 33, 36].includes(step);

  return {
    step,
    formData,
    handleBack,
    handleNext,
    handleChange,
    changeHandle,
    handleSubmit,
    validateStep, // Make sure validateStep is included here
    isLastStep,
    setFormData,
    handleFileChange,
    handleOrganizationTypeChange,
    setStep,
    handleRoofTypeChange,
    isSubmitted,
  };
};

export default LogicsforQuote;
