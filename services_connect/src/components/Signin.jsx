import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import Collapse from '@mui/material/Collapse';
import axiosConfig from '../config/axiosConfig';
import { Autocomplete } from '@mui/material';
import { styled, lighten, darken } from '@mui/system';
import { providerRegistrationValidationRules } from '../../../backend_service_connect/middlewares/providerRegistrationValidation';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.light, 0.85),
  ...theme.applyStyles('dark', {
    backgroundColor: darken(theme.palette.primary.main, 0.8),
  }),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

export default function Signin({ open, onClose }) {
  const [role, setRole] = useState('provider');
  const [services, setServices] = useState([]);
  const [verifying, setVerifying] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    role: role,
    email: '',
    phone: '',
    password: '',
    location: '',
    photo: '',
    profession: '',
    experience: '',
    specific_skills: '',
    description: '',
    qualities: '',
    certification: '',
    service: '',
  });

  useEffect(() => {
    axiosConfig
      .get('/services')
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ 
      ...prevData, 
      [name]: value 
    }));

    // Clear the specific field error when user starts typing
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleCheckboxChange = (event) => {
    const newRole = event.target.checked ? 'user' : 'provider';
    setRole(newRole);
    setFormData(prev => ({ ...prev, role: newRole }));
  };

  const handleSubmit = async () => {
    setVerifying(true);
    
    // Validate form
    const validationErrors = providerRegistrationValidationRules(formData);
    
    if (validationErrors) {
      setErrors(validationErrors);
      setVerifying(false);
      return;
    }
  
    try {
      const response = await axiosConfig.post('/auth/verify-email', formData);
      // Handle successful verification
      console.log('Signup successful', response);
      onClose(); // Close dialog on successful signup
    } catch (error) {
      console.error('Error signup user', error);
      setErrors(prev => ({
        ...prev, 
        submit: error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription'
      }));
    } finally {
      setVerifying(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Inscription</DialogTitle>
      <DialogContent>
        <TextField 
          label="Nom" 
          name="name" 
          value={formData.name} 
          onChange={handleInputChange} 
          fullWidth 
          margin="dense"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField 
          label="Prénom" 
          name="surname" 
          value={formData.surname} 
          onChange={handleInputChange} 
          fullWidth 
          margin="dense"
          error={!!errors.surname}
          helperText={errors.surname}
        />
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
          label="Téléphone" 
          name="phone" 
          value={formData.phone} 
          onChange={handleInputChange} 
          fullWidth 
          margin="dense"
          error={!!errors.phone}
          helperText={errors.phone}
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
        <TextField 
          label="Adresse" 
          name="location" 
          value={formData.location} 
          onChange={handleInputChange} 
          fullWidth 
          margin="dense"
          error={!!errors.location}
          helperText={errors.location}
        />
        <FormControlLabel
          control={<Checkbox checked={role === 'user'} onChange={handleCheckboxChange} />}
          label="Prestataire"
        />
        <Collapse in={role === 'user'} timeout="auto">
          <TextField 
            label="Photo" 
            name="photo" 
            value={formData.photo} 
            onChange={handleInputChange} 
            fullWidth 
            margin="dense"
          />
          <TextField 
            label="Profession" 
            name="profession" 
            value={formData.profession} 
            onChange={handleInputChange} 
            fullWidth 
            margin="dense"
            error={!!errors.profession}
            helperText={errors.profession}
          />
          <TextField 
            label="Expérience" 
            name="experience" 
            value={formData.experience} 
            onChange={handleInputChange} 
            fullWidth 
            margin="dense"
            error={!!errors.experience}
            helperText={errors.experience}
          />
          <TextField 
            label="Compétences spécifiques"
            name="specific_skills"
            value={formData.specific_skills}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={!!errors.specific_skills}
            helperText={errors.specific_skills}
          />
          <TextField 
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField 
            label="Qualités" 
            name="qualities" 
            value={formData.qualities} 
            onChange={handleInputChange} 
            fullWidth 
            margin="dense"
            error={!!errors.qualities}
            helperText={errors.qualities}
          />
          <TextField 
            label="Certification"
            name="certification"
            value={formData.certification}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={!!errors.certification}
            helperText={errors.certification}
          />
          <Autocomplete
            options={services}
            groupBy={(option) => option.category.name}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="With categories" />}
            renderGroup={(params) => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>{params.children}</GroupItems>
              </li>
            )}
          />
        </Collapse>
        <LoadingButton 
          variant='contained' 
          fullWidth 
          onClick={handleSubmit} 
          loading={verifying}
        >
          Valider
        </LoadingButton>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
}
