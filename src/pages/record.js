import {
  Button,
  Container,
  Grid,
  TextField,
  ButtonGroup,
  CircularProgress,
} from "@material-ui/core";
import { useState } from "react";
import useRecorder from "../customHooks/useRecorder";
import { uploadRecording } from "../actions/product";
import { toast } from "react-toastify";

import { upload } from "../services/awsHandler";
import { Link, useHistory } from "react-router-dom";

const Record = () => {
  let [
    audioURL,
    isRecording,
    startRecording,
    stopRecording,
    blob,
    setAudioURL,
  ] = useRecorder();
  const initialState = { ms: 0, s: 0, m: 0, h: 0 };
  const [name, setName] = useState();
  const [saving, setSaving] = useState(false);
  const [time, setTime] = useState(initialState);
  const [interv, setInterv] = useState();

  const history = useHistory();
  const stopRecordingHandler = () => {
    stopRecording();
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
    reset();
  };

  const start = () => {
    run();
    setInterv(setInterval(run, 10));
  };
  let updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  const reset = () => {
    if (interv) {
      clearInterval(interv);
    }
  };

  const handleInput = (e) => {
    setName(e.target.value);
  };

  const recordWithName = () => {
    if (name) {
      startRecording();
      start();
    } else {
      toast.warn("Enter name first");
    }
  };
  const saveRecording = async () => {
    setSaving(true);
    blob.name = name;
    const url = await upload(blob);
    await uploadRecording(name, url)
      .then((response) => {
        if (response.data.success) {
          toast.success("Recording uploaded");
          setSaving(false);
        }
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
    setAudioURL("");
    history.push("/admin");
  };

  return (
    <>
      <Button>
        <Link to="/admin">Admin</Link>
      </Button>
      <Button>
        <Link to="/products">Product</Link>
      </Button>
      <Container>
        <div style={{ padding: 20 }}>
          <Grid
            container
            spacing={3}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} style={{ marginTop: 50 }}>
              <TextField
                onChange={handleInput}
                id="name"
                label="Enter your name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: 50 }}>
              <audio src={audioURL} controls />
            </Grid>
            <div>
              <span>{time.m >= 10 ? time.m : "0" + time.m}</span>&nbsp;:&nbsp;
              <span>{time.s >= 10 ? time.s : "0" + time.s}</span>&nbsp;:&nbsp;
              <span>{time.ms >= 10 ? time.ms : "0" + time.ms}</span>
            </div>
            <Grid item xs={12} style={{ marginTop: 50 }}>
              <Grid container spacing={2}>
                <ButtonGroup
                  color="primary"
                  aria-label="outlined primary button group"
                >
                  <Button onClick={recordWithName} disabled={isRecording}>
                    start recording
                  </Button>
                  <Button
                    onClick={stopRecordingHandler}
                    disabled={!isRecording}
                  >
                    stop recording
                  </Button>
                  <Button
                    onClick={saveRecording}
                    disabled={audioURL && !saving ? false : true}
                  >
                    Save recording{" "}
                    {saving ? (
                      <CircularProgress
                        color="secondary"
                        style={{ margin: "auto" }}
                        size={25}
                      />
                    ) : (
                      ""
                    )}
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Record;
