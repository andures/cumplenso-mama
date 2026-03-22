import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addAttendee } from "../storage";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function RSVPForm({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [withCompanion, setWithCompanion] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [snack, setSnack] = useState(false);
  const [errors, setErrors] = useState<{ name?: string }>({});

  const validate = () => {
    const e: { name?: string } = {};
    if (!name.trim()) e.name = "Por favor ingresa tu nombre.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    addAttendee({
      name: name.trim(),
      phone: phone.trim(),
      companions: withCompanion ? 1 : 0,
      message: message.trim(),
    });
    setSubmitted(true);
    setSnack(true);
  };

  const handleClose = () => {
    if (submitted) {
      setName("");
      setPhone("");
      setWithCompanion(false);
      setMessage("");
      setSubmitted(false);
      setErrors({});
    }
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            background: "#f8f3ec",
            border: "1px solid #c9d9cb",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontFamily: '"Great Vibes", cursive',
            fontSize: "2.2rem",
            color: "#1a3a2a",
            pb: 0,
          }}
        >
          Confirmar Asistencia
        </DialogTitle>

        {!submitted ? (
          <>
            <DialogContent sx={{ pt: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  color: "#9a7b6a",
                  mb: 3,
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: "1rem",
                }}
              >
                Nos alegra que puedas acompañarnos en este momento tan especial.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 3,
                  px: 2,
                  py: 1,
                  border: "1px solid rgba(201,168,76,0.35)",
                  background: "rgba(201,168,76,0.06)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.4rem",
                    lineHeight: 1,
                    letterSpacing: "0.2em",
                  }}
                >
                  🤵👗
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    color: "#1a3a2a",
                    textTransform: "uppercase",
                  }}
                >
                  Semiformal
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <TextField
                  label="Tu nombre completo *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                  fullWidth
                  variant="outlined"
                  sx={fieldSx}
                />
                <TextField
                  label="Teléfono (opcional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={fieldSx}
                />
                {/* Companion toggle */}
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                    }}
                  >
                    {[
                      { label: "Solo / Sola", value: false },
                      { label: "Con acompañante", value: true },
                    ].map(({ label, value }) => (
                      <Box
                        key={label}
                        onClick={() => setWithCompanion(value)}
                        sx={{
                          flex: 1,
                          py: 1.4,
                          textAlign: "center",
                          cursor: "pointer",
                          border: "1.5px solid",
                          borderColor:
                            withCompanion === value ? "#1a3a2a" : "#c9d9cb",
                          background:
                            withCompanion === value ? "#1a3a2a" : "transparent",
                          color:
                            withCompanion === value ? "#f8f3ec" : "#1a3a2a",
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: "1rem",
                          letterSpacing: "0.06em",
                          transition: "all 0.25s ease",
                          userSelect: "none",
                        }}
                      >
                        {label}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center", pb: 3, gap: 2 }}>
              <Button
                onClick={handleClose}
                variant="outlined"
                sx={outlinedBtnSx}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                startIcon={<FavoriteIcon />}
                sx={containedBtnSx}
              >
                Confirmo mi asistencia
              </Button>
            </DialogActions>
          </>
        ) : (
          <DialogContent sx={{ textAlign: "center", py: 5 }}>
            <FavoriteIcon sx={{ fontSize: 60, color: "#c9a84c", mb: 2 }} />
            <Typography
              sx={{
                fontFamily: '"Great Vibes", cursive',
                fontSize: "2rem",
                color: "#1a3a2a",
                mb: 1,
              }}
            >
              ¡Gracias, {name}!
            </Typography>
            <Typography
              sx={{
                color: "#9a7b6a",
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "1.1rem",
                mb: 3,
              }}
            >
              Tu asistencia ha sido registrada. ¡Te esperamos con mucho cariño!
            </Typography>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={containedBtnSx}
            >
              Cerrar
            </Button>
          </DialogContent>
        )}
      </Dialog>

      <Snackbar
        open={snack}
        autoHideDuration={4000}
        onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          onClose={() => setSnack(false)}
          sx={{ width: "100%" }}
        >
          ¡Asistencia confirmada exitosamente!
        </Alert>
      </Snackbar>
    </>
  );
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 1,
    "&.Mui-focused fieldset": { borderColor: "#1a3a2a" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#1a3a2a" },
};

const containedBtnSx = {
  background: "#1a3a2a",
  color: "#f8f3ec",
  borderRadius: 0,
  px: 4,
  fontFamily: '"Cormorant Garamond", serif',
  fontSize: "1rem",
  textTransform: "none",
  "&:hover": {
    background: "#0f2218",
  },
};

const outlinedBtnSx = {
  borderColor: "#1a3a2a",
  color: "#1a3a2a",
  borderRadius: 0,
  px: 3,
  fontFamily: '"Cormorant Garamond", serif',
  fontSize: "1rem",
  textTransform: "none",
  "&:hover": {
    background: "#1a3a2a",
    color: "#f8f3ec",
    borderColor: "#1a3a2a",
  },
};
