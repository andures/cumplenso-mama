import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import * as XLSX from "xlsx";
import { getAttendees, updateAttendee, deleteAttendee } from "../storage";
import type { Attendee } from "../types";

const SECRET_KEY = "abuela90";

const GoldAccent = () => (
  <svg
    viewBox="0 0 120 500"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}
    fill="none"
  >
    <path
      d="M 60 10 C 58 62 64 114 60 166 C 56 218 62 270 58 322 C 54 374 60 426 56 470"
      stroke="#c9a84c"
      strokeWidth="1.3"
      opacity="0.52"
      strokeLinecap="round"
    />
    <g
      transform="translate(60,68) rotate(52)"
      fill="none"
      stroke="#c9a84c"
      strokeWidth="1.3"
      opacity="0.56"
    >
      <path d="M 0,26 C -15,18 -17,0 0,-26 C 17,0 15,18 0,26 Z" />
      <path d="M0,26 L0,-26" />
    </g>
    <g
      transform="translate(59,152) rotate(-44)"
      fill="none"
      stroke="#c9a84c"
      strokeWidth="1.2"
      opacity="0.47"
    >
      <path d="M 0,22 C -13,15 -14,0 0,-22 C 14,0 13,15 0,22 Z" />
      <path d="M0,22 L0,-22" />
    </g>
    <g
      transform="translate(60,238) rotate(57)"
      fill="none"
      stroke="#c9a84c"
      strokeWidth="1.1"
      opacity="0.50"
    >
      <path d="M 0,20 C -12,14 -13,0 0,-20 C 13,0 12,14 0,20 Z" />
    </g>
    <g
      transform="translate(58,328) rotate(-40)"
      fill="none"
      stroke="#c9a84c"
      strokeWidth="1"
      opacity="0.43"
    >
      <path d="M 0,17 C -10,12 -11,0 0,-17 C 11,0 10,12 0,17 Z" />
    </g>
    <g
      transform="translate(59,418) rotate(46)"
      fill="none"
      stroke="#c9a84c"
      strokeWidth="0.9"
      opacity="0.36"
    >
      <path d="M 0,14 C -8,10 -9,0 0,-14 C 9,0 8,10 0,14 Z" />
    </g>
  </svg>
);

export default function Attendees() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const keyFromUrl = searchParams.get("key") === SECRET_KEY;
  const [authorized, setAuthorized] = useState(keyFromUrl);
  const [keyInput, setKeyInput] = useState("");
  const [keyError, setKeyError] = useState(false);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Edit dialog
  const [editTarget, setEditTarget] = useState<Attendee | null>(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editCompanions, setEditCompanions] = useState(0);
  const [saving, setSaving] = useState(false);

  // Delete dialog
  const [deleteTarget, setDeleteTarget] = useState<Attendee | null>(null);
  const [deleting, setDeleting] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const openEdit = (a: Attendee) => {
    setEditTarget(a);
    setEditName(a.name);
    setEditPhone(a.phone ?? "");
    setEditCompanions(a.companions);
  };

  const handleEditSave = async () => {
    if (!editTarget || !editName.trim()) return;
    setSaving(true);
    try {
      const updated = await updateAttendee(editTarget.id, {
        name: editName.trim(),
        phone: editPhone.trim(),
        companions: editCompanions,
      });
      setAttendees((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a)),
      );
      setEditTarget(null);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteAttendee(deleteTarget.id);
      setAttendees((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (!authorized) return;
    setLoadingData(true);
    getAttendees()
      .then((data) => setAttendees(data))
      .catch(() => {})
      .finally(() => setLoadingData(false));
  }, [authorized]);

  const totalPersonas = attendees.reduce(
    (sum, a) => sum + 1 + (a.companions ?? 0),
    0,
  );

  const handleExportExcel = () => {
    const rows = attendees.map((a, i) => ({
      "#": i + 1,
      Nombre: a.name,
      Acompañante: (a.companions ?? 0) > 0 ? "Sí" : "No",
      "Total personas": 1 + (a.companions ?? 0),
      Teléfono: a.phone ?? "",
      Fecha: new Date(a.createdAt).toLocaleDateString("es-MX", {
        day: "2-digit", month: "short", year: "numeric",
      }),
    }));

    // Summary row
    rows.push({
      "#": null as unknown as number,
      Nombre: "TOTAL CONFIRMADOS",
      Acompañante: "",
      "Total personas": totalPersonas,
      Teléfono: "",
      Fecha: "",
    });

    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = [{ wch: 4 }, { wch: 30 }, { wch: 14 }, { wch: 16 }, { wch: 18 }, { wch: 16 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Asistentes");
    XLSX.writeFile(wb, "asistentes-cumple-leticia.xlsx");
  };

  const handleUnlock = () => {
    if (keyInput === SECRET_KEY) {
      setAuthorized(true);
      setKeyError(false);
    } else {
      setKeyError(true);
    }
  };

  if (!authorized) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
          bgcolor: "#f8f3ec",
          backgroundImage:
            "linear-gradient(135deg,rgba(26,58,42,0.022) 25%,transparent 25%),linear-gradient(225deg,rgba(26,58,42,0.022) 25%,transparent 25%),linear-gradient(315deg,rgba(26,58,42,0.022) 25%,transparent 25%),linear-gradient(45deg,rgba(26,58,42,0.022) 25%,transparent 25%)",
          backgroundSize: "5px 5px",
        }}
      >
        <Box
          sx={{
            p: { xs: 4, sm: 5 },
            border: "1px solid rgba(201,168,76,0.35)",
            background: "rgba(248,243,236,0.9)",
            textAlign: "center",
            maxWidth: 360,
            width: "100%",
            animation: "fadeUp 0.7s ease both",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 3,
              mx: "auto",
              width: 160,
            }}
          >
            <Box
              sx={{ flex: 1, height: "1px", bgcolor: "#c9a84c", opacity: 0.6 }}
            />
            <Typography
              sx={{ color: "#c9a84c", fontSize: "0.85rem", lineHeight: 1 }}
            >
              ✦
            </Typography>
            <Box
              sx={{ flex: 1, height: "1px", bgcolor: "#c9a84c", opacity: 0.6 }}
            />
          </Box>
          <Typography
            sx={{
              fontFamily: '"Great Vibes", cursive',
              fontSize: "2.4rem",
              color: "#1a3a2a",
              lineHeight: 1.1,
              mb: 1,
            }}
          >
            Acceso restringido
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "1rem",
              color: "#4a6a56",
              letterSpacing: "0.06em",
              mb: 3,
            }}
          >
            Ingresa la clave para ver la lista de asistentes.
          </Typography>
          <TextField
            type="password"
            label="Clave de acceso"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
            error={keyError}
            helperText={keyError ? "Clave incorrecta." : ""}
            fullWidth
            variant="outlined"
            sx={{
              mb: 2.5,
              "& label": { fontFamily: '"Cormorant Garamond", serif' },
              "& .MuiOutlinedInput-root": {
                fontFamily: '"Cormorant Garamond", serif',
                "&.Mui-focused fieldset": { borderColor: "#1a3a2a" },
              },
              "& label.Mui-focused": { color: "#1a3a2a" },
            }}
          />
          <Button
            fullWidth
            variant="outlined"
            onClick={handleUnlock}
            sx={{
              borderColor: "#1a3a2a",
              color: "#1a3a2a",
              borderWidth: "1.5px",
              borderRadius: 0,
              py: 1.4,
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "1rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
              "&:hover": { background: "#1a3a2a", color: "#f8f3ec" },
              "&:active": { background: "#0f2418", transform: "scale(0.98)" },
            }}
          >
            Ingresar
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 4, md: 6 },
        position: "relative",
        overflow: "hidden",
        bgcolor: "#f8f3ec",
        backgroundImage:
          "linear-gradient(135deg,rgba(26,58,42,0.022) 25%,transparent 25%),linear-gradient(225deg,rgba(26,58,42,0.022) 25%,transparent 25%),linear-gradient(315deg,rgba(26,58,42,0.022) 25%,transparent 25%),linear-gradient(45deg,rgba(26,58,42,0.022) 25%,transparent 25%)",
        backgroundSize: "5px 5px",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          right: { xs: 4, sm: 16 },
          top: 40,
          width: { xs: 48, sm: 72 },
          height: 500,
          pointerEvents: "none",
          opacity: { xs: 0.4, sm: 0.6 },
          zIndex: 0,
        }}
      >
        <GoldAccent />
      </Box>

      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 860, mx: "auto" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4, flexWrap: "wrap", gap: 1 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              color: "#1a3a2a",
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "1rem",
              letterSpacing: "0.06em",
              textTransform: "none",
              "&:hover": { background: "transparent", color: "#c9a84c" },
            }}
          >
            Volver a la invitación
          </Button>

          {attendees.length > 0 && (
            <Button
              startIcon={<DownloadIcon />}
              onClick={handleExportExcel}
              variant="outlined"
              sx={{
                borderColor: "#1a3a2a",
                color: "#1a3a2a",
                borderWidth: "1.5px",
                borderRadius: 0,
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "0.9rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                px: 2,
                py: 0.8,
                "&:hover": { background: "#1a3a2a", color: "#f8f3ec" },
              }}
            >
              Exportar Excel
            </Button>
          )}
        </Box>

        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            animation: "fadeUp 0.8s ease both",
            animationDelay: "0.1s",
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Great Vibes", cursive',
              fontSize: { xs: "3rem", sm: "4rem" },
              lineHeight: 1.1,
              background:
                "linear-gradient(90deg,#a07830 0%,#c9a84c 25%,#e8cc7e 50%,#c9a84c 75%,#a07830 100%)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 4s linear infinite",
            }}
          >
            Lista de Asistentes
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: { xs: "0.95rem", sm: "1.05rem" },
              color: "#4a6a56",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              mt: 0.5,
            }}
          >
            90 Años de Leticia
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mt: 2,
              mx: "auto",
              width: { xs: 140, sm: 190 },
            }}
          >
            <Box
              sx={{ flex: 1, height: "1px", bgcolor: "#c9a84c", opacity: 0.75 }}
            />
            <Typography
              sx={{ color: "#c9a84c", fontSize: "0.9rem", lineHeight: 1 }}
            >
              ✦
            </Typography>
            <Box
              sx={{ flex: 1, height: "1px", bgcolor: "#c9a84c", opacity: 0.75 }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3.5,
            flexWrap: "wrap",
            justifyContent: "center",
            animation: "fadeUp 0.8s ease both",
            animationDelay: "0.25s",
          }}
        >
          {[
            {
              label: `${attendees.length} ${attendees.length === 1 ? "confirmación" : "confirmaciones"}`,
              gold: false,
            },
            {
              label: `${totalPersonas} ${totalPersonas === 1 ? "persona confirmada" : "personas confirmadas"} ♥`,
              gold: true,
            },
          ].map(({ label, gold }) => (
            <Box
              key={label}
              sx={{
                px: 2.5,
                py: 0.7,
                border: "1px solid",
                borderColor: gold ? "#c9a84c" : "#1a3a2a",
                color: gold ? "#c9a84c" : "#1a3a2a",
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { xs: "0.9rem", sm: "1rem" },
                letterSpacing: "0.06em",
              }}
            >
              {label}
            </Box>
          ))}
        </Box>

        {loadingData ? (
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "1.1rem",
              color: "#4a6a56",
              mt: 6,
              letterSpacing: "0.08em",
              fontStyle: "italic",
            }}
          >
            Cargando asistentes…
          </Typography>
        ) : attendees.length === 0 ? (
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "1.1rem",
              color: "#4a6a56",
              mt: 6,
              letterSpacing: "0.08em",
              fontStyle: "italic",
            }}
          >
            Aún no hay asistentes confirmados.
          </Typography>
        ) : isMobile ? (
          /* ── Mobile: card per attendee ── */
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              animation: "fadeUp 0.8s ease both",
              animationDelay: "0.4s",
            }}
          >
            {attendees.map((a: Attendee, i: number) => (
              <Box
                key={a.id}
                sx={{
                  border: "1px solid rgba(201,168,76,0.35)",
                  background: "rgba(248,243,236,0.9)",
                  px: 2.5,
                  py: 2,
                }}
              >
                {/* Row: index + name */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 1.2,
                    mb: 1.2,
                    borderBottom: "1px solid rgba(201,168,76,0.2)",
                    pb: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: "0.85rem",
                      color: "#c9a84c",
                      lineHeight: 1,
                      minWidth: 18,
                    }}
                  >
                    {i + 1}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      color: "#1a3a2a",
                      letterSpacing: "0.04em",
                      flex: 1,
                    }}
                  >
                    {a.name}
                  </Typography>
                  {(a.companions ?? 0) > 0 && (
                    <Typography
                      sx={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: "0.8rem",
                        color: "#c9a84c",
                        border: "1px solid rgba(201,168,76,0.5)",
                        px: 0.8,
                        py: 0.1,
                        letterSpacing: "0.05em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      +{a.companions} acompañante
                      {(a.companions ?? 0) > 1 ? "s" : ""}
                    </Typography>
                  )}
                </Box>

                {/* Details grid */}
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.6 }}
                >
                  {a.phone && (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography sx={labelSx}>Tel.</Typography>
                      <Typography sx={valueSx}>{a.phone}</Typography>
                    </Box>
                  )}
                  {a.message && (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography sx={labelSx}>Nota</Typography>
                      <Typography sx={{ ...valueSx, fontStyle: "italic" }}>
                        {a.message}
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography sx={labelSx}>Fecha</Typography>
                    <Typography sx={valueSx}>
                      {new Date(a.createdAt).toLocaleDateString("es-MX", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Typography>
                  </Box>
                </Box>

                {/* Actions */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: 1.5,
                    justifyContent: "flex-end",
                  }}
                >
                  <Tooltip title="Editar">
                    <IconButton
                      size="small"
                      onClick={() => openEdit(a)}
                      sx={{ color: "#1a3a2a", "&:hover": { color: "#c9a84c" } }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      size="small"
                      onClick={() => setDeleteTarget(a)}
                      sx={{ color: "#9a3a2a", "&:hover": { color: "#c0392b" } }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          /* ── Desktop: full table ── */
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              border: "1px solid rgba(201,168,76,0.35)",
              borderRadius: 0,
              background: "rgba(248,243,236,0.85)",
              animation: "fadeUp 0.8s ease both",
              animationDelay: "0.4s",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#1a3a2a" }}>
                  {["#", "Nombre", "Acomp.", "Teléfono", "Fecha", ""].map(
                    (h) => (
                      <TableCell
                        key={h}
                        sx={{
                          color: "#f8f3ec",
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: "1.05rem",
                          fontWeight: 600,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          borderBottom: "none",
                          py: 2.2,
                        }}
                      >
                        {h}
                      </TableCell>
                    ),
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {attendees.map((a: Attendee, i: number) => (
                  <TableRow
                    key={a.id}
                    sx={{
                      "&:nth-of-type(even)": {
                        background: "rgba(26,58,42,0.04)",
                      },
                      "&:hover": { background: "rgba(201,168,76,0.08)" },
                    }}
                  >
                    <TableCell sx={cellSx}>
                      <Typography
                        sx={{
                          fontFamily: '"Playfair Display", serif',
                          fontSize: "0.9rem",
                          color: "#c9a84c",
                        }}
                      >
                        {i + 1}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{ ...cellSx, fontWeight: 600, color: "#1a3a2a" }}
                    >
                      {a.name}
                    </TableCell>
                    <TableCell sx={cellSx}>
                      {(a.companions ?? 0) > 0 ? (
                        <Typography
                          sx={{
                            fontFamily: '"Cormorant Garamond", serif',
                            fontSize: "0.9rem",
                            color: "#c9a84c",
                          }}
                        >
                          +{a.companions}
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            color: "#b0bfb4",
                            fontSize: "0.88rem",
                            fontStyle: "italic",
                            fontFamily: '"Cormorant Garamond", serif',
                          }}
                        >
                          —
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={cellSx}>{a.phone || "—"}</TableCell>
                    <TableCell sx={{ ...cellSx, whiteSpace: "nowrap" }}>
                      {new Date(a.createdAt).toLocaleDateString("es-MX", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell sx={{ ...cellSx, py: 0.5 }}>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Tooltip title="Editar">
                          <IconButton
                            size="small"
                            onClick={() => openEdit(a)}
                            sx={{
                              color: "#1a3a2a",
                              "&:hover": { color: "#c9a84c" },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton
                            size="small"
                            onClick={() => setDeleteTarget(a)}
                            sx={{
                              color: "#9a3a2a",
                              "&:hover": { color: "#c0392b" },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* ── Edit Dialog ── */}
      <Dialog
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        maxWidth="xs"
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
            fontFamily: '"Great Vibes", cursive',
            fontSize: "2rem",
            color: "#1a3a2a",
            pb: 0,
          }}
        >
          Editar asistente
        </DialogTitle>
        <DialogContent
          sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField
            label="Nombre completo *"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            fullWidth
            variant="outlined"
            sx={fieldSx}
          />
          <TextField
            label="Teléfono"
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
            fullWidth
            variant="outlined"
            sx={fieldSx}
          />
          <Box>
            <Typography
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "0.9rem",
                color: "#4a6a56",
                mb: 1,
                letterSpacing: "0.06em",
              }}
            >
              Acompañante
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              {[
                { label: "Solo / Sola", value: 0 },
                { label: "Con acompañante", value: 1 },
              ].map(({ label, value }) => (
                <Box
                  key={label}
                  onClick={() => setEditCompanions(value)}
                  sx={{
                    flex: 1,
                    py: 1.4,
                    textAlign: "center",
                    cursor: "pointer",
                    border: "1.5px solid",
                    borderColor:
                      editCompanions === value ? "#1a3a2a" : "#c9d9cb",
                    background:
                      editCompanions === value ? "#1a3a2a" : "transparent",
                    color: editCompanions === value ? "#f8f3ec" : "#1a3a2a",
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "1rem",
                    letterSpacing: "0.06em",
                    transition: "all 0.2s",
                    userSelect: "none",
                  }}
                >
                  {label}
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3, gap: 2 }}>
          <Button
            onClick={() => setEditTarget(null)}
            variant="outlined"
            sx={outlinedBtnSx}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleEditSave}
            variant="contained"
            disabled={saving || !editName.trim()}
            sx={containedBtnSx}
          >
            {saving ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Delete Confirm Dialog ── */}
      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        maxWidth="xs"
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
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: "1.3rem",
            color: "#1a3a2a",
            fontWeight: 600,
          }}
        >
          ¿Eliminar asistente?
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "1.05rem",
              color: "#4a6a56",
            }}
          >
            Se eliminará a <strong>{deleteTarget?.name}</strong> de la lista.
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3, gap: 2 }}>
          <Button
            onClick={() => setDeleteTarget(null)}
            variant="outlined"
            sx={outlinedBtnSx}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            disabled={deleting}
            sx={{
              ...containedBtnSx,
              background: "#8b1a1a",
              "&:hover": { background: "#6b1313" },
            }}
          >
            {deleting ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const fieldSx = {
  "& label": { fontFamily: '"Cormorant Garamond", serif' },
  "& .MuiOutlinedInput-root": {
    fontFamily: '"Cormorant Garamond", serif',
    "&.Mui-focused fieldset": { borderColor: "#1a3a2a" },
  },
  "& label.Mui-focused": { color: "#1a3a2a" },
};

const outlinedBtnSx = {
  borderColor: "#1a3a2a",
  color: "#1a3a2a",
  borderWidth: "1.5px",
  borderRadius: 0,
  fontFamily: '"Cormorant Garamond", serif',
  fontSize: "0.95rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  px: 3,
  "&:hover": { background: "rgba(26,58,42,0.06)" },
};

const containedBtnSx = {
  background: "#1a3a2a",
  color: "#f8f3ec",
  borderRadius: 0,
  fontFamily: '"Cormorant Garamond", serif',
  fontSize: "0.95rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  px: 3,
  "&:hover": { background: "#0f2418" },
  "&:disabled": { background: "#9ab0a2", color: "#f8f3ec" },
};

const cellSx = {
  fontFamily: '"Cormorant Garamond", serif',
  fontSize: "1.05rem",
  color: "#2a4535",
  borderColor: "rgba(201,168,76,0.2)",
  py: 2,
};

const labelSx = {
  fontFamily: '"Cormorant Garamond", serif',
  fontSize: "0.78rem",
  color: "#c9a84c",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  minWidth: 36,
  pt: "2px",
};

const valueSx = {
  fontFamily: '"Cormorant Garamond", serif',
  fontSize: "0.97rem",
  color: "#2a4535",
  lineHeight: 1.5,
};
