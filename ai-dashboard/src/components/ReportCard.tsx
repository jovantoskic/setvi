import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Report } from '../store/reportStore';
import { mockSummarize } from '../utils/mockAI';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  report: Report;
};

const ReportCard = ({ report }: Props) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSummarize = async (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('summarize click');

    if (loading) return;

    setLoading(true);
    try {
      const summary = await mockSummarize(report.content);
      alert(summary);
    } catch (err) {
      console.error('Summarization failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit/${report.id}`);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{report.title}</Typography>
        <Box mt={1} display="flex" gap={1}>
          <Button size="small" variant="outlined" onClick={handleEdit}>
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={handleSummarize}
            disabled={loading}
          >
            {loading ? 'Summarizing...' : 'Summarize'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
