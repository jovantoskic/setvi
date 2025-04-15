import { useReportStore } from '../store/reportStore';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableReportCard from '../components/SortableReportCard';

const Dashboard = () => {
  const { reports } = useReportStore();
  const [search, setSearch] = useState('');

  const navigate = useNavigate();
  const reorderReports = useReportStore((s) => s.reorderReports);

  const filtered = reports.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = reports.findIndex((r) => r.id === active.id);
    const newIndex = reports.findIndex((r) => r.id === over.id);

    const newOrder = arrayMove(reports, oldIndex, newIndex);
    reorderReports(newOrder);
  };

  return (
    <Box
      p={3}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: 800,
      }}
    >
      <Typography variant="h4">AI Intelligence Dashboard</Typography>

      <Box mt={2} display="flex" gap={2}>
        <TextField
          label="Search Reports"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />

        <Button variant="contained" onClick={() => navigate('/new')}>
          + New Report
        </Button>
      </Box>

      <Box mt={3} display="flex" flexDirection="column" gap={2}>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filtered.map((r) => r.id)}
            strategy={verticalListSortingStrategy}
          >
            {filtered.map((report) => (
              <SortableReportCard key={report.id} report={report} />
            ))}
          </SortableContext>
        </DndContext>
      </Box>
    </Box>
  );
};

export default Dashboard;
