import {
  Card,
  CardContent,
  CardHeader,
  Dialog,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import styled from "styled-components";
import { LoadingOverlayDiv } from "./LoadingOverlay";

const StyledCard = styled(Card)`
  min-width: 400px;
  border-radius: 10px;
`;

const StyledCardHeader = styled(CardHeader)`
  font-size: 20px;
  font-weight: 600;
  padding: 0;
`;

const ConfirmDeleteForm = (user) => {
  return (
    <Dialog
      PaperProps={{ style: { borderRadius: "15px" } }}
      open={user.open}
      onClose={user.onClose}
    >
      <StyledCard className="p-3">
        {user.loading && <LoadingOverlayDiv />}
        <StyledCardHeader
          disableTypography
          title={`Xóa ${user.label.toLowerCase()}`}
        />
        <CardContent className="p-0 my-3">
          <Alert severity="error" className="font-weight-bold text-danger">
            {user.warning}
          </Alert>
          <small className="mt-3 d-block">{user.label}</small>
          <p className="mt-1 break-line">{user.name}</p>
        </CardContent>
        <div className="d-flex justify-content-end">
          <Button onClick={user.onClose}>Hủy</Button>
          <Button onClick={user.onSubmit} className="bg-danger text-white ml-2">
            Xóa
          </Button>
        </div>
      </StyledCard>
    </Dialog>
  );
};

export default ConfirmDeleteForm;
