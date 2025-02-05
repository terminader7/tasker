import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import { NewTask } from "../types/task";

const DueDatePicker = ({
  task,
  setTask,
}: {
  task: NewTask;
  setTask: React.Dispatch<React.SetStateAction<NewTask>>;
}) => (
  <LocalizationProvider dateAdapter={AdapterLuxon}>
    <DateTimePicker
      label="Due Date (Optional)"
      value={task.dueDate ? DateTime.fromISO(task.dueDate.toString()) : null}
      onChange={(date) =>
        setTask({ ...task, dueDate: date ? date.toJSDate() : null })
      }
      sx={{ width: "100%" }}
    />
  </LocalizationProvider>
);

export default DueDatePicker;
