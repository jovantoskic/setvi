import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Report } from '../store/reportStore';
import { mockSummarize } from '../utils/mockAI';
import { useState } from 'react';

type Props = {
  report: Report;
};

const ReportCard = ({ report }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    const summary = await mockSummarize(report.content);
    alert(summary);
    setLoading(false);
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{report.title}</Typography>
        <Box mt={1} display="flex" gap={1}>
          <Button size="small" variant="outlined">
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
