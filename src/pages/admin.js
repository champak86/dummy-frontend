import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
  Container,
  CircularProgress,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { css } from "@emotion/core";
import { deleteRecording, getRecordings } from "../actions/product";
import { deleteRecoringFile } from "../services/awsHandler";
import useInfiniteScroll from "react-infinite-scroll-hook";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  noRecord: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

const Admin = () => {
  const [recordings, setRecordings] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    getRecordings(page).then((response) => {
      if (response.data.success) {
        setTotalCount(response.data.count);
        if (page > 1) {
          setRecordings([...recordings, ...response.data.data]);
        } else {
          setRecordings(response.data.data);
        }
      }
      setLoading(false);
    });
  }, [page, loadingDelete]);

  const deleteHandler = async (id, filePath) => {
    setLoadingDelete(true);
    try {
      await deleteRecoringFile(filePath);
      await deleteRecording(id).then((response) => {
        if (response.data.success) {
          toast.success("Record has been removed successfully");
        }
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoadingDelete(false);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setPage(page + 1);
  };

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage: totalCount > recordings.length,
    onLoadMore: handleLoadMore,
    window,
  });
  const handleClose = () => {
    setLoadingDelete(false);
  };
  return (
    <Container style={{ padding: "20px" }} ref={infiniteRef}>
      <Backdrop
        className={classes.backdrop}
        open={loadingDelete}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recordings.length > 0 ? (
              recordings.map((data) => {
                return (
                  <TableRow key={data._id}>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>
                      <audio src={data.file_path} controls />
                    </TableCell>
                    <TableCell>
                      <Button
                        key={data._id}
                        onClick={() => deleteHandler(data._id, data.file_path)}
                        variant="outlined"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <div className={classes.noRecord}>No record found</div>
            )}
          </TableBody>
          {loading ? (
            <TableRow>
              <ClipLoader loading={loading} css={override} size={50} />
            </TableRow>
          ) : null}
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Admin;
