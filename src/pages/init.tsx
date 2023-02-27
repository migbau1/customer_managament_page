
import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from '@mui/icons-material/Logout';
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { mainListItems } from "../components/LIstItems";
import { Button, List, Modal, Stack, TextField, Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector, useAuth } from "../hooks";
import GridComponent from "../components/Grid";
import { customerCreatedThunk, customerDeletedThunk, customerEditedThunk, customerLoadsThunk } from "../app/actions/customer.action";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { setEdit } from "../app/slices/customer.slice";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const columns: GridColDef[] = [
  { field: "nombre", headerName: "Nombre", width: 250, editable: true },
  { field: "apellido", headerName: "Apellido", width: 150 },
  { field: "empresa", headerName: "Empresa", width: 200 },
  { field: "email", headerName: "Email", width: 150 }, {
    field: "buttons",
    headerName: "",
    width: 150,
    renderCell: (params: GridRenderCellParams<any>) => {
      const clientDispatch = useAppDispatch();
      return (
        <div>
          <Tooltip title={"Edit"}>
            <IconButton
              onClick={() => {
                clientDispatch(setEdit(params.row))
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Delete"}>
            <IconButton
              onClick={() => {
                clientDispatch(customerDeletedThunk(params.row?.id))
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>

        </div>
      );
    },
    align: "center",
    sortable: false,
    disableColumnMenu: true,
  },
];

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const customerSelector = useAppSelector((state) => state.customers);
  const clientDispatch = useAppDispatch();


  const [open, setOpen] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      nombre: {
        value: string
      },
      apellido: {
        value: string
      },
      empresa: {
        value: string
      },
      email: {
        value: string
      }
    }

    clientDispatch(customerCreatedThunk({
      nombre: target.nombre.value,
      apellido: target.apellido.value, empresa: target.empresa.value, email: target.email.value
    }));
    setOpenModal(false)
  };

  const handleSubmitEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      nombre: {
        value: string
      },
      apellido: {
        value: string
      },
      empresa: {
        value: string
      },
      email: {
        value: string
      },
    }

    clientDispatch(customerEditedThunk({
      nombre: target.nombre.value,
      apellido: target.apellido.value, empresa: target.empresa.value,
      email: target.email.value, id: customerSelector.selected.id
    }));
    clientDispatch(setEdit({}))
  };

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const auth = useAuth();
  const toggleDrawer = () => {
    setOpen(!open);
  };


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={auth.logout}>
              <Badge color="warning">
                <LogoutIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Stack direction="row" spacing={1}>
              <Button size="small" onClick={handleOpen}>
                Agregar
              </Button>
            </Stack>

            <Box sx={{ height: 400, mt: 1 }}>
              <GridComponent
                dpt={customerLoadsThunk}
                customerSelector={customerSelector}
                columns={columns}
              />
            </Box>
            <Modal
              open={openModal}
              component={"main"}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} component={"form"} onSubmit={handleSubmit} noValidate>
                <TextField
                  required
                  autoFocus
                  margin="normal"
                  label="Nombre"
                  id="nombre"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="normal"
                  label="Apellido"
                  id="apellido"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="normal"
                  label="Empresa"
                  id="empresa"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="normal"
                  label="Email Address"
                  id="email"
                  type="email"
                  fullWidth
                  variant="standard"
                />
                <Stack direction="row" >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mr: 2 }}
                  >
                    Guardar
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, height: "50px" }}
                    onClick={handleClose}>
                    Cancelar
                  </Button>
                </Stack>
              </Box>
            </Modal>
            <Modal
              open={customerSelector.edit}
              component={"main"}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} component={"form"} onSubmit={handleSubmitEdit} noValidate>
                <TextField
                  required
                  autoFocus
                  margin="normal"
                  label="Nombre"
                  id="nombre"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={customerSelector.selected.nombre}

                />
                <TextField
                  autoFocus
                  margin="normal"
                  label="Apellido"
                  id="apellido"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={customerSelector.selected.apellido}
                />
                <TextField
                  autoFocus
                  margin="normal"
                  label="Empresa"
                  id="empresa"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={customerSelector.selected.empresa}
                />
                <TextField
                  autoFocus
                  margin="normal"
                  label="Email Address"
                  id="email"
                  type="email"
                  fullWidth
                  variant="standard"
                  defaultValue={customerSelector.selected.email}
                />
                <Stack direction="row" >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mr: 2 }}
                  >
                    Guardar
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, height: "50px" }}
                    onClick={handleClose}>
                    Cancelar
                  </Button>
                </Stack>
              </Box>
            </Modal>
            <Divider />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
