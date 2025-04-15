import { useReportStore } from '../store/reportStore'
import { Box, Typography, Button, TextField } from '@mui/material'
import { useState } from 'react'
import ReportCard from '../components/ReportCard'

const Dashboard = () => {
  const { reports } = useReportStore()
  const [search, setSearch] = useState('')

  const filtered = reports.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Box p={3}>
      <Typography variant="h4">AI Intelligence Dashboard</Typography>
      <Box mt={2} display="flex" gap={2}>
        <TextField
          label="Search Reports"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" color="primary">
          + New Report
        </Button>
      </Box>
      <Box mt={3} display="flex" flexDirection="column" gap={2}>
        {filtered.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </Box>
    </Box>
  )
}

export default Dashboard
