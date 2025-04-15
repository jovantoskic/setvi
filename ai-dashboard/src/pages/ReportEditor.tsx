import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useReportStore } from '../store/reportStore';

const ReportEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const report = useReportStore((state) =>
    state.reports.find((r) => r.id === id)
  );

  const [title, setTitle] = useState(report?.title || '');
  const [content, setContent] = useState(report?.content || '');

  const updateReport = useReportStore((state) => state.updateReport);

  if (!report) {
    navigate('/');
    return null;
  }

  const handleSave = () => {
    if (!title.trim()) return;
    updateReport(report.id, { title, content });
    navigate('/');
  };

  return (
    <Box
      p={3}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Typography variant="h4">Edit Report</Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <TextField
        fullWidth
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant="outlined"
        margin="normal"
        multiline
        rows={6}
      />
      <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        sx={{ display: 'flex', justifyContent: 'flex-start' }}
      >
        <Button variant="outlined" onClick={() => navigate('/')} sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ReportEditor;
