import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useAppSelector } from '../../../costumeHooks/costum';
import { submitReport } from '../../../API/services/user/Services';
import toast from 'react-hot-toast';

interface ReportProps {
    isOpen: boolean;
    setReportModal: (open: boolean) => void;
    vendorId: string;
}

const Report: React.FC<ReportProps> = ({ isOpen, setReportModal,vendorId }) => {
    const [selectedReason, setSelectedReason] = useState<string>('');
    const [additionalInfo, setAdditionalInfo] = useState<string>('');
    const { name, _id } = useAppSelector((state) => state.user.userDetails);

    const reasons = [
        'Unresponsive vendor',
        'Unexpected costs',
        'Rude or unprofessional',
        'Low-quality service',
        'Misrepresented offerings',
        'Other',
    ];
    const handleSubmit = async () => {
       const submit =  await submitReport(selectedReason, selectedReason, _id+"",vendorId)
        if(submit){
            toast.success("report submitted")
        }else{
            toast.error("Failed to submit report")
        }
        setReportModal(false);
    };

    return (
        <>
            <Transition in={isOpen} timeout={400}>
                {(state: string) => (
                    <Modal
                        keepMounted
                        open={!['exited', 'exiting'].includes(state)}
                        onClose={() => setReportModal(false)}
                        slotProps={{
                            backdrop: {
                                sx: {
                                    opacity: 0,
                                    backdropFilter: 'none',
                                    transition: `opacity 400ms, backdrop-filter 400ms`,
                                    ...{
                                        entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                                        entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                                    }[state],
                                },
                            },
                        }}
                        sx={{
                            visibility: state === 'exited' ? 'hidden' : 'visible',
                        }}
                    >
                        <ModalDialog
                            sx={{
                                opacity: 0,
                                transition: `opacity 300ms`,
                                maxWidth: '750px',
                                width: '100%',
                                height: '400px',
                                ...{
                                    entering: { opacity: 1 },
                                    entered: { opacity: 1 },
                                }[state],
                            }}
                        >
                            <DialogTitle>
                                We're sorry something went wrong. How can I help you, <strong>{name}</strong>?

                            </DialogTitle>
                            <DialogContent
                                sx={{
                                    padding: '16px', // Adjust padding if needed
                                    height: '300px', // Reduce content height to fit the new modal height
                                    overflowY: 'auto', // Add scrolling if content overflows
                                }}
                            >
                                <Stack spacing={2}>
                                    <RadioGroup
                                        aria-label="report-reason"
                                        value={selectedReason}
                                        onChange={(e) => setSelectedReason(e.target.value)}
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            flexDirection: 'row', // Display checkboxes in rows
                                        }}
                                    >
                                        {reasons.map(reason => (
                                            <FormControlLabel
                                                key={reason}
                                                value={reason}
                                                control={<Radio />}
                                                label={reason}
                                                sx={{
                                                    flex: '0 1 calc(50% - 10px)' // Allow wrapping of long text
                                                }}
                                            />
                                        ))}
                                    </RadioGroup>
                                    <TextField
                                        label="Please explain the situation (not required)"
                                        multiline
                                        rows={3} // Reduced the number of rows for smaller height
                                        placeholder="Please explain the situation"
                                        value={additionalInfo}
                                        onChange={(e) => setAdditionalInfo(e.target.value)}
                                        variant="outlined"
                                        sx={{
                                            width: '100%', // Make input width responsive
                                        }}
                                    />
                                    <Stack direction="row" justifyContent="flex-end" spacing={1}>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => setReportModal(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={handleSubmit}
                                        >
                                            Send
                                        </Button>
                                    </Stack>
                                </Stack>
                            </DialogContent>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
        </>
    );
};

export default Report;
