import {
  useSortable,
  // SortableContext,
  // verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ReportCard from './ReportCard';
import { Report } from '../store/reportStore';

type Props = {
  report: Report;
};

const SortableReportCard = ({ report }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: report.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '12px',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ReportCard report={report} />
    </div>
  );
};

export default SortableReportCard;
