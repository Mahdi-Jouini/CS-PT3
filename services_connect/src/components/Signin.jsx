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
import Collapse from '@mui/material/Collapse'; // Import Collapse for animation
import axiosConfig from '../config/axiosConfig';
import { Autocomplete } from '@mui/material';
import { styled, lighten, darken } from '@mui/system';

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
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    setRole(event.target.checked ? 'user' : 'provider');
    console.log(role)
  };

  const handleSubmit = () => {
    axiosConfig
    .post('/auth/verify-email', formData )
    .then((response) => {
        setVerifying(true)
    })
    .catch((error) => {
      console.error('Error signup user', error);
    });
    
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Inscription</DialogTitle>
      <DialogContent>
        <TextField  label="Nom" name="name" value={formData.name} onChange={handleInputChange} fullWidth margin="dense" />
        <TextField  label="Prénom" name="surname" value={formData.surname} onChange={handleInputChange} fullWidth margin="dense" />
        <TextField  label="Email" name="email" value={formData.email} onChange={handleInputChange} fullWidth margin="dense" />
        <TextField  label="Téléphone" name="phone" value={formData.phone} onChange={handleInputChange} fullWidth margin="dense" />
        <TextField  label="Mot de passe" name="password" type="password" value={formData.password} onChange={handleInputChange} fullWidth margin="dense" />
        <TextField  label="Adresse" name="location" value={formData.location} onChange={handleInputChange} fullWidth margin="dense" />
        <FormControlLabel
          control={<Checkbox checked={role === 'user'} onChange={handleCheckboxChange} />}
          label="Prestataire"
        />
        <Collapse in={role === 'user'} timeout="auto">
          <TextField  label="Photo" name="photo" value={formData.photo} onChange={handleInputChange} fullWidth margin="dense" />
          <TextField  label="Profession" name="profession" value={formData.profession} onChange={handleInputChange} fullWidth margin="dense" />
          <TextField  label="Expérience" name="experience" value={formData.experience} onChange={handleInputChange} fullWidth margin="dense" />
          <TextField 
            label="Compétences spécifiques"
            name="specific_skills"
            value={formData.specific_skills}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField 
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField  label="Qualités" name="qualities" value={formData.qualities} onChange={handleInputChange} fullWidth margin="dense" />
          <TextField 
            label="Certification"
            name="certification"
            value={formData.certification}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
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
        <LoadingButton variant='contained' fullWidth onClick={handleSubmit} loading={verifying}>Valider</LoadingButton>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
}
