import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ReasonModalProps {
    submit: (text: string) => void;
    setOpen: (open: boolean) => void;
    open: boolean;
}

const ReasonModal: React.FC<ReasonModalProps> = ({ submit, setOpen, open }) => {
    const [text, setText] = useState("");
    const [error, setError] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setError(false);
    };

    const handleReport = () => {
        if (text.trim() === "") {
            setError(true);
            return;
        }
        submit(text);
        setOpen(false);
        setError(false); 
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Report</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    If you found any illegal content from the Details of Vendor , you can report it here.
                    it will send to Vendor.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    onChange={(e) => {
                        setText(e.target.value);
                        if (e.target.value.trim() !== "") {
                            setError(false);
                        }
                    }}
                    id="reason"
                    label="Reason for report"
                    fullWidth
                    error={error}
                    helperText={error ? "Reason is required" : ""}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button 
                    onClick={handleReport} 
                    color="primary" 
                    variant="contained"
                    disabled={text.trim() === ""}
                >
                    Report
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default React.memo(ReasonModal);
