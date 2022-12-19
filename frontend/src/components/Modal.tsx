import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { RootState } from "../store/store";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  height: "auto",
  maxHeight: "100%",
};

export default function ImagesModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const images = useSelector((state: RootState) => state.breed.images);

  return (
    <div>
      {images.length > 0 && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ImageList sx={{ width: 500 }} cols={3} rowHeight={164}>
              {images.map((imageBreed: [string] | []) => {
                return imageBreed.map((image, index) => (
                  <ImageListItem key={image + index}>
                    <img
                      src={`${image}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={image}
                      loading="lazy"
                      style={{
                        height: 160,
                      }}
                    />
                  </ImageListItem>
                ));
              })}
            </ImageList>
          </Box>
        </Modal>
      )}
    </div>
  );
}
