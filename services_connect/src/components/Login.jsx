import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// Import the validation function from the specified path
import { providerRegistrationValidationRules } from '../../../backend_service_connect/middlewares/providerRegistrationValidation';

export default function Login({ open, onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user', // Adding role to match the validation function's expectation
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
    // Clear the specific field error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    // Use the imported validation function
    const validationErrors = providerRegistrationValidationRules(formData);
    return validationErrors || {};
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      // If there are validation errors, set them and prevent submission
      setErrors(validationErrors);
      return;
    }

    // If validation passes, proceed with login
    console.log('Connexion:', formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>Connexion</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Mot de passe"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          error={!!errors.password}
          helperText={errors.password}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSubmit}>Valider</Button>
      </DialogActions>
    </Dialog>
  );
}
