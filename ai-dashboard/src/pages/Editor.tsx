import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { useReportStore } from '../store/reportStore'
import { v4 as uuidv4 } from 'uuid'
import { mockGenerateDraft } from '../utils/mockAI'


const ReportEditor = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const addReport = useReportStore((state) => state.addReport)
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)

const handleGenerate = async () => {
  if (!prompt.trim()) return
  setLoading(true)
  const result = await mockGenerateDraft(prompt)
  setContent(result)
  setLoading(false)
}

  const handleSave = () => {
    if (!title.trim()) return
    addReport({ id: uuidv4(), title, content })
    navigate('/')
  }

  return (
    <Box p={3} sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
      <Typography variant="h5" mb={2}>Create New Report</Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <TextField
          label="AI Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          fullWidth
        />
      <Button
        variant="outlined"
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        >
          {loading ? 'Generating...' : 'Generate Draft'}
        </Button>
      </Box>
      <Editor
        apiKey='qjff3d9p4ydmeala4q32tft6uf0yxiux31ft5zxkc373r7xc'
        value={content}
        init={{
          height: 300,
          menubar: false,
          plugins: ['link', 'lists', 'autolink'],
          toolbar: 'undo redo | bold italic | bullist numlist | link',
        }}
        
        onEditorChange={(value) => setContent(value)}
      />
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Report
        </Button>
      </Box>
    </Box>
  )
}

export default ReportEditor
