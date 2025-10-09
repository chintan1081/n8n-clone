import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { toast } from "react-toastify";
import { Post } from "@/assets/axios";
import { useParams } from "react-router-dom";

function CronForm({ setIsCronOpen }: any) {
  const [title, setTitle] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { id: workflowId } = useParams();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const hour = selectedDate.getHours();
    const minute = selectedDate.getMinutes();
    const dayOfMonth = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;

    try {
      const response = await Post('/api/cron', {
        title,
        workflowId,
        data: {
          hour,
          minute,
          dayOfMonth,
          month
        }
      })
      toast.success(response.data.message);
      setIsCronOpen(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="py-8">
      <div className="mx-auto max-w-3xl px-8 lg:px-0">
        <h1 className="text-center text-white mb-8 text-4xl font-semibold lg:text-5xl">Cron</h1>
        <Card className="mx-auto max-w-lg p-4 shadow-md sm:p-16">
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="**:[&>label]:block space-y-6 *:space-y-3">
            <div>
              <Label htmlFor="name">Title</Label>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="title"
                required
                value={title}
              />
            </div>

            <div>
              <Label htmlFor="platform">Pick Date & Time</Label>
              <DatePicker
                className="bg-zinc-900 border p-2 rounded cursor-pointer hover:bg-zinc-950"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                minTime={new Date(new Date().getTime() + 5 * 60 * 1000)}
                maxTime={new Date().setHours(23, 59)}
              />
            </div>
            <Button className='cursor-pointer' type='submit'>Schedule</Button>
          </form>
        </Card>
      </div>
    </section>
  );
}

export default CronForm;
