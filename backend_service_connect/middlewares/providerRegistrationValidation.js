const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // At least one uppercase, one number, one special char, 8-12 characters
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,12}$/;
  return passwordRegex.test(password);
};

const validateLettersOnly = (value) => {
  const lettersOnlyRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
  return lettersOnlyRegex.test(value);
};

const validateExperience = (experience) => {
  const exp = parseInt(experience, 10);
  return !isNaN(exp) && exp >= 1 && exp <= 30;
};

const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/; // 10 digits
  return phoneRegex.test(phone);
};

const validateAlphanumeric = (value) => {
  const alphanumericRegex = /^[a-zA-ZÀ-ÿ0-9\s]+$/;
  return alphanumericRegex.test(value);
};

export const providerRegistrationValidationRules = (formData) => {
  const errors = {};

  // Name validation (letters only)
  if (!formData.name || !formData.name.trim()) {
    errors.name = 'Nom est requis';
  } else if (!validateLettersOnly(formData.name)) {
    errors.name = 'Nom ne doit contenir que des lettres';
  }

  // Surname validation (letters only)
  if (!formData.surname || !formData.surname.trim()) {
    errors.surname = 'Prénom est requis';
  } else if (!validateLettersOnly(formData.surname)) {
    errors.surname = 'Prénom ne doit contenir que des lettres';
  }

  // Email validation (with verification hint)
  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email est requis';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Un email de vérification sera envoyé';
  }

  // Password validation
  if (!formData.password || !formData.password.trim()) {
    errors.password = 'Mot de passe est requis';
  } else if (!validatePassword(formData.password)) {
    errors.password = 'Format invalide (8-12 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial)';
  }

  // Phone validation (digits only, 10 digits)
  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = 'Téléphone est requis';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'Numéro de téléphone invalide';
  }

  // Location validation (letters and numbers)
  if (!formData.location || !formData.location.trim()) {
    errors.location = 'Zone d\'intervention est requise';
  } else if (!validateAlphanumeric(formData.location)) {
    errors.location = 'Zone d\'intervention invalide';
  }

  // Role-specific validations (when role is 'user')
  if (formData.role === 'user') {
    // Profession validation (letters only)
    if (!formData.profession || !formData.profession.trim()) {
      errors.profession = 'Profession est requise';
    } else if (!validateLettersOnly(formData.profession)) {
      errors.profession = 'Profession ne doit contenir que des lettres';
    }

    // Experience validation (1-30 years)
    if (!formData.experience || !formData.experience.trim()) {
      errors.experience = 'Expérience est requise';
    } else if (!validateExperience(formData.experience)) {
      errors.experience = 'Expérience doit être entre 1 et 30 ans';
    }

    // Specific skills validation (letters only)
    if (!formData.specific_skills || !formData.specific_skills.trim()) {
      errors.specific_skills = 'Compétences spécifiques sont requises';
    } else if (!validateLettersOnly(formData.specific_skills)) {
      errors.specific_skills = 'Compétences ne doivent contenir que des lettres';
    }

    // Description validation (letters only)
    if (!formData.description || !formData.description.trim()) {
      errors.description = 'Description est requise';
    } else if (!validateLettersOnly(formData.description)) {
      errors.description = 'Description ne doit contenir que des lettres';
    }

    // Qualities validation (letters only)
    if (!formData.qualities || !formData.qualities.trim()) {
      errors.qualities = 'Qualités sont requises';
    } else if (!validateLettersOnly(formData.qualities)) {
      errors.qualities = 'Qualités ne doivent contenir que des lettres';
    }

    // Certification validation (letters and numbers)
    if (!formData.certification || !formData.certification.trim()) {
      errors.certification = 'Certificats sont requis';
    } else if (!validateAlphanumeric(formData.certification)) {
      errors.certification = 'Certificats invalides';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};
