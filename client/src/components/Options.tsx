import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SocketContext } from "../SocketContext";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";
import CopyToClipboard from "react-copy-to-clipboard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    width: "600px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid black",
  },
}));

const Options = ({ children }: { children: React.ReactNode }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idTocall, setIdToCall] = useState("");
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                계정 정보
              </Typography>
              <TextField
                label="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <div className={classes.margin}>
                <CopyToClipboard text={me}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<Assignment fontSize="large" />}
                  >
                    ID 복사하기
                  </Button>
                </CopyToClipboard>
              </div>
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                전화할 ID
              </Typography>
              <TextField
                label="ID를 입력하세요"
                value={idTocall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
              />
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PhoneDisabled fontSize="large" />}
                  fullWidth
                  onClick={leaveCall}
                  className={classes.margin}
                >
                  종료하기
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Phone fontSize="large" />}
                  fullWidth
                  onClick={() => {
                    callUser(idTocall);
                    console.log(me);
                  }}
                  className={classes.margin}
                >
                  전화하기
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Options;
