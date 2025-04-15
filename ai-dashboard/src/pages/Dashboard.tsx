import { useReportStore } from '../store/reportStore'
import { Box, Typography, Button, TextField } from '@mui/material'
import { useState } from 'react'
import ReportCard from '../components/ReportCard'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { reports } = useReportStore()
  const [search, setSearch] = useState('')

  const navigate = useNavigate()

  const filtered = reports.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Box p={3} sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
      <Typography variant="h4">AI Intelligence Dashboard</Typography>
      <Box mt={2} display="flex" gap={2}>
        <TextField
          label="Search Reports"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      
      <Button variant="contained" onClick={() => navigate('/new')}>
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
