import { Card, CardContent, Typography, Button, Box } from '@mui/material'
import { Report } from '../store/reportStore'

type Props = {
  report: Report
}

const ReportCard = ({ report }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{report.title}</Typography>
        <Box mt={1} display="flex" gap={1}>
          <Button size="small" variant="outlined">Edit</Button>
          <Button size="small" variant="outlined">Summarize</Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ReportCard
